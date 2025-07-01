// screens/checkout/CheckOut.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { Marker, MapPressEvent, LatLng } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Type for route params
type RootStackParamList = {
  CheckOut: {
    onLocationSelected?: (location: { coordinates: LatLng }) => void;
  };
};

type CheckOutRouteProp = RouteProp<RootStackParamList, 'CheckOut'>;
type CheckOutNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CheckOut'>;

const CheckOut: React.FC = () => {
  const route = useRoute<CheckOutRouteProp>();
  const navigation = useNavigation<CheckOutNavigationProp>();

  const [location, setLocation] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Alert.alert('Permission denied', 'Location permission is required');
      setLoading(false);
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLoading(false);
      },
      (error) => {
        console.error(error);
        Alert.alert('Error', 'Could not get your location');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  };

  const handleMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  const confirmLocation = () => {
    if (!location) {
      Alert.alert('Error', 'Please select a location');
      return;
    }

    if (route.params?.onLocationSelected) {
      route.params.onLocationSelected({ coordinates: location });
    }

    navigation.goBack();
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Map or Loader */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6D42" />
          <Text style={styles.loadingText}>Getting your location...</Text>
        </View>
      ) : (
        <>
          <View style={styles.mapContainer}>
            {location && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                onPress={handleMapPress}
              >
                <Marker
                  coordinate={location}
                  title="Selected Location"
                />
              </MapView>
            )}
          </View>

          <View style={styles.addressContainer}>
            <Ionicons name="location-outline" size={20} color="#FF6D42" />
            <Text style={styles.addressText} numberOfLines={2}>
              {location
                ? `Lat: ${location.latitude.toFixed(5)}, Lon: ${location.longitude.toFixed(5)}`
                : 'Tap on map to select location'}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.currentLocationButton}
              onPress={getCurrentLocation}
            >
              <Ionicons name="locate" size={20} color="#FF6D42" />
              <Text style={styles.currentLocationText}>Use Current Location</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmLocation}
            >
              <Text style={styles.confirmButtonText}>Confirm Location</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  addressText: {
    marginLeft: 8,
    flex: 1,
    color: '#333',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#FF6D42',
    borderRadius: 8,
    marginBottom: 16,
  },
  currentLocationText: {
    marginLeft: 8,
    color: '#FF6D42',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#e75480',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckOut;
