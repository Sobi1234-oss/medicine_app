// components/CheckoutModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedLocation: any;
  manualAddress: string;
  setManualAddress: (val: string) => void;
  paymentMethod: string;
  setPaymentMethod: (val: string) => void;
  onConfirmOrder: () => void;
  onOpenLocationPicker: () => void;
}

const CheckoutModal = ({
  visible,
  onClose,
  selectedLocation,
  manualAddress,
  setManualAddress,
  paymentMethod,
  setPaymentMethod,
  onConfirmOrder,
  onOpenLocationPicker
}: Props) => {
  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.modalContent}>
          <Text style={styles.sectionTitle}>Delivery Location</Text>

          <TouchableOpacity style={styles.locationButton} onPress={onOpenLocationPicker}>
            <Ionicons name="location-outline" size={20} color="#FF6D42" />
            <Text style={styles.locationButtonText}>
              {selectedLocation ? 'Change Location' : 'Set Location'}
            </Text>
          </TouchableOpacity>

          {selectedLocation && (
            <View style={styles.selectedLocation}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.locationText}>{selectedLocation.address}</Text>
            </View>
          )}

          <Text style={styles.orText}>OR</Text>

          <TextInput
            style={styles.manualAddressInput}
            placeholder="Enter your address manually"
            value={manualAddress}
            onChangeText={setManualAddress}
            multiline
            numberOfLines={3}
            placeholderTextColor="grey"
          />

          <Text style={styles.sectionTitle}>Payment Method</Text>

          {['Cash', 'EasyPaisa'].map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.paymentMethod,
                paymentMethod === method && styles.selectedPaymentMethod
              ]}
              onPress={() => setPaymentMethod(method)}
            >
              <Ionicons
                name={paymentMethod === method ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color="#FF6D42"
              />
              <Text style={styles.paymentMethodText}>{method === 'Cash' ? 'Cash on Delivery' : method}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirmOrder}>
            <Text style={styles.confirmButtonText}>Confirm Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CheckoutModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#FF6D42',
    borderRadius: 8,
    marginBottom: 12,
  },
  locationButtonText: {
    marginLeft: 8,
    color: '#FF6D42',
    fontWeight: '500',
  },
  selectedLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  locationText: {
    marginLeft: 8,
    color: '#333',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'black',
  },
  manualAddressInput: {
    height: 70,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
    color: 'black',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  selectedPaymentMethod: {
    borderColor: '#FF6D42',
    backgroundColor: '#FFF5F2',
  },
  paymentMethodText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  confirmButton: {
    backgroundColor: '#FF6D42',
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
