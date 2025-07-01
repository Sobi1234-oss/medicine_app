// CartScreen.tsx
import React, { useState } from 'react';
import { View, Text,TextInput, FlatList, TouchableOpacity, Image, StyleSheet, Modal, Alert, ScrollView } from 'react-native';
import { useCartStore } from '../components/store/useCartStore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocationPicker from '../screens/location/LocationPickeer';
import { createOrder } from '../apis/api';
import { useUser } from '../screens/UserContext/UserContext';
import MessageModal from '../components/MesageModals/MessageModal';
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CartScreen = ({ navigation }) => {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [modalMessage, setModalMessage] = useState('');
  const [manualAddress, setManualAddress] = useState('');

  const { user } = useUser();
  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/150' }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
          style={styles.quantityButton}
        >
          <Ionicons name="remove" size={18} color="#333" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
          style={styles.quantityButton}
        >
          <Ionicons name="add" size={18} color="#333" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => removeFromCart(item.id)}
        style={styles.removeButton}
      >
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  const handleProceedToCheckout = () => {
    setShowCheckoutModal(true);
  };
  const handleLocationError = (errorMessage: string) => {
    setShowLocationPicker(false); // Don't reopen automatically
    setShowCheckoutModal(false); // Close checkout if needed
    setModalType('error');
    setModalMessage(errorMessage);
    setModalVisible(true);
  };
  const handleLocationSelect = (location) => {
    console.log('Selected Location:', location);
    setSelectedLocation(location);
    setShowLocationPicker(false);
    setShowCheckoutModal(true);
  };
const handleConfirmOrder = async () => {
  // Use manual address if no location selected
  const deliveryAddress = selectedLocation?.address || manualAddress;
  
  if (!deliveryAddress) {
    setModalType('error');
    setModalMessage('Please select or enter a delivery address');
    setModalVisible(true);
    return;
  }

  // Rest of your existing validation and order logic
  if (!paymentMethod) {
    setModalType('error');
    setModalMessage('Please select a payment method');
    setModalVisible(true);
    return;
  }

  try {
    const orderPromises = items.map((item) => {
      return createOrder({
        product_id: item.id,
        location: deliveryAddress, // Use either selected or manual address
        quantity: item.quantity,
        total_amount: item.price * item.quantity,
        user_id: user?.id,
        payment_method: paymentMethod,
      });
    });

      await Promise.all(orderPromises);

      setModalType('success');
      setModalMessage('Order placed successfully!');
      setModalVisible(true);

      clearCart();
      setShowCheckoutModal(false);

      // Optional: Navigate after a short delay
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Home');
      }, 2000);
    } catch (error) {
      console.error('Order failed:', error);
      setModalType('error');
      setModalMessage('Could not place order. Please try again.');
      setModalVisible(true);
    }
  };
  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />

          <View style={styles.summaryContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Shipping:</Text>
              <Text style={styles.totalAmount}>$0.00</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.grandTotal}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleProceedToCheckout}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Checkout Modal */}
      <Modal
        visible={showCheckoutModal}
        animationType="slide"
        onRequestClose={() => setShowCheckoutModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCheckoutModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Checkout</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Location</Text>

              <TouchableOpacity
                style={styles.locationButton}
                onPress={() => {
                  setShowCheckoutModal(false);
                  setShowLocationPicker(true);
                }}
              >
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
            </View>
            <Text style={styles.orText}>OR</Text>

            <TextInput
              style={styles.manualAddressInput}
              placeholder="Enter your address manually"
              value={manualAddress}
              onChangeText={setManualAddress}
              multiline
              numberOfLines={3}
              placeholderTextColor='grey'
            />
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment Method</Text>

              <TouchableOpacity
                style={[
                  styles.paymentMethod,
                  paymentMethod === 'Cash' && styles.selectedPaymentMethod
                ]}
                onPress={() => setPaymentMethod('Cash')}
              >
                <Ionicons
                  name={paymentMethod === 'Cash' ? "radio-button-on" : "radio-button-off"}
                  size={20}
                  color="#FF6D42"
                />
                <Text style={styles.paymentMethodText}>Cash on Delivery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentMethod,
                  paymentMethod === 'EasyPaisa' && styles.selectedPaymentMethod
                ]}
                onPress={() => setPaymentMethod('EasyPaisa')}
              >
                <Ionicons
                  name={paymentMethod === 'EasyPaisa' ? "radio-button-on" : "radio-button-off"}
                  size={20}
                  color="#FF6D42"
                />
                <Text style={styles.paymentMethodText}>EasyPaisa</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmOrder}
            >
              <Text style={styles.confirmButtonText}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </View>
        <MessageModal
          visible={modalVisible}
          type={modalType}
          message={modalMessage}
          onClose={() => setModalVisible(false)}
        />
      </Modal>

      {/* Location Picker Modal */}
      <LocationPicker
        visible={showLocationPicker}
        onClose={() => {
          setShowLocationPicker(false);
          // 🧠 Do NOT reopen checkout modal here
        }}
        onLocationSelected={(location) => {
          setSelectedLocation(location);
          setShowLocationPicker(false);
          setShowCheckoutModal(true); // ✅ only show if success
        }}
        onError={handleLocationError}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 65
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
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
    color:'black'
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 16,
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16, color: 'black'
  },
  removeButton: {
    padding: 8,
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  grandTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6D42',
  },
  checkoutButton: {
    backgroundColor: '#FF6D42',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',top:10
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
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,top:10
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

export default CartScreen;