// LocationStore.ts
import { create } from 'zustand';
import { 
  checkLocationPermission, 
  checkAndEnableLocation, 
  getCurrentLocation 
} from '../../screens/location/Location';

interface LocationStore {
  location: { latitude: number; longitude: number } | null;
  error: string | null;
  isLoading: boolean;
  requestLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  error: null,
  isLoading: false,

  requestLocation: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // 1. Check and request permission
      const hasPermission = await checkLocationPermission();
      if (!hasPermission) {
        throw new Error('Location permission denied. Please enable in app settings.');
      }

      // 2. Check and enable location services (Android)
      const locationEnabled = await checkAndEnableLocation();
      if (!locationEnabled) {
        throw new Error('Location services disabled. Please enable GPS.');
      }

      // 3. Get current location
      const coordinates = await getCurrentLocation();
      set({ 
        location: coordinates,
        error: null 
      });
      console.log('Location fetched:', coordinates);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to get location';
      set({ error: errorMessage });
      console.error('Location error:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));