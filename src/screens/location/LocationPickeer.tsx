// LocationPicker.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  TextInput,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MessageModal from '../../components/MesageModals/MessageModal'; // adjust path if needed

const LocationPicker = ({ visible, onClose, onLocationSelected, onError }) => {
  const [loading, setLoading] = useState(false);
  const [locationAddress, setLocationAddress] = useState('');
  const [manualAddress, setManualAddress] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('error');
  const [modalMessage, setModalMessage] = useState('');

  const showError = (message: string) => {
    setModalType('error');
    setModalMessage(message);
    setModalVisible(true);
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const getLocation = async () => {
    setLoading(true);
    const granted = await requestPermission();

    if (!granted) {
      showError('Permission denied. Location access is required.');
      setLoading(false);
      onError('Permission denied. Please enter location manually.');
      return;
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data?.display_name || 'Unknown address';

          setLocationAddress(address);

          onLocationSelected({
            latitude,
            longitude,
            address,
          });

          setLoading(false);
          onClose();
        } catch (error) {
          showError('Failed to reverse geocode.');
          setLoading(false);
          onError('Could not fetch address from coordinates.');
        }
      },
      (error) => {
        showError(`Location Error: ${error.message}`);
        setLoading(false);
        onError('Location error. Please enter manually.');
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      }
    );
  };

  useEffect(() => {
    if (visible) {
      getLocation();
    }
  }, [visible]);

  const handleManualSubmit = () => {
    if (!manualAddress.trim()) {
      showError('Please enter an address');
      return;
    }

    onLocationSelected({
      latitude: null,
      longitude: null,
      address: manualAddress.trim(),
    });

    setManualAddress('');
    setModalVisible(false);
    onClose();
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            {loading ? (
              <>
                <ActivityIndicator size="large" color="#FF6D42" />
                <Text style={styles.text}>Fetching your location...</Text>
              </>
            ) : (
              <>
                <Text style={styles.text}>Fetched Address:</Text>
                <Text style={styles.address}>
                  {locationAddress || 'No automatic address found.'}
                </Text>

                <Text style={[styles.text, { marginTop: 20 }]}>
                  Or enter your address manually:
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your address"
                  value={manualAddress}
                  onChangeText={setManualAddress}
                  multiline
                />

                <TouchableOpacity style={styles.useManualBtn} onPress={handleManualSubmit}>
                  <Text style={styles.useManualText}>Use Manual Address</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <MessageModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    width: '85%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  address: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  input: {
    marginTop: 12,
    width: '100%',
    height: 70,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
  useManualBtn: {
    marginTop: 10,
    backgroundColor: '#FF6D42',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  useManualText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeBtn: {
    marginTop: 12,
  },
  closeText: {
    color: '#FF6D42',
    fontWeight: 'bold',
  },
});

export default LocationPicker;
