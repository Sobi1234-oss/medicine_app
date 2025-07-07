// CheckOut.tsx
import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCartStore } from '../../components/store/useCartStore';
import { AuthContext } from '../Authentications/AuthContext';
import { createOrder, storeFCMToken } from '../../apis/api';
import { getFCMToken } from '../../services/Notification';
import MessageModal from '../../components/MesageModals/MessageModal';
import LocationPicker from '../location/LocationPickeer';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../components/navigations/RootNavigator';

type CheckOutNavigationProp = StackNavigationProp<RootStackParamList, 'CheckOut'>;

interface Props {
  navigation: CheckOutNavigationProp;
}

interface Location {
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CheckOut: React.FC<Props> = ({ navigation }) => {
  const { items: cartItems, total, clearCart } = useCartStore();
  const { user, token, loading: authLoading, refreshAuthToken } = useContext(AuthContext);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [manualAddress, setManualAddress] = useState<string>('');
  const [showLocationPicker, setShowLocationPicker] = useState<boolean>(false);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  // Debugging effect to log auth state changes
  useEffect(() => {
    console.log('Auth state changed:', { user, token, authLoading });
    if (!authLoading) {
      setAuthChecked(true);
    }
  }, [user, token, authLoading]);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setShowLocationPicker(false);
  };

  const handleLocationError = (error: string) => {
    setShowLocationPicker(false);
    setModalType('error');
    setModalMessage(error);
    setModalVisible(true);
  };

  const validateAuth = async () => {
    if (!user || !token) {
      console.log('No user or token found, redirecting to login');
      setModalType('error');
      setModalMessage('Please login to place an order');
      setModalVisible(true);
     navigation.navigate('AuthStack', { screen: 'Login' });
      return false;
    }
    return true;
  };

  const handleConfirmOrder = async () => {
    console.log('Starting order process...');
    
    // First validate authentication
    const isAuthenticated = await validateAuth();
    if (!isAuthenticated) return;

    // Validate required fields
    const validations = [
      { condition: !selectedLocation && !manualAddress, message: 'Please select or enter a delivery address' },
      { condition: !paymentMethod, message: 'Please select a payment method' },
      { condition: cartItems.length === 0, message: 'Your cart is empty' }
    ];

    for (const validation of validations) {
      if (validation.condition) {
        setModalType('error');
        setModalMessage(validation.message);
        setModalVisible(true);
        return;
      }
    }

    setOrderLoading(true);
    console.log('Order validation passed, creating order...');

    try {
      const orderData = {
        user_id: user.id.toString(),
        items: cartItems.map((item: CartItem) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price.toString()).toFixed(2)
        })),
        total_amount: total.toFixed(2),
        delivery_address: selectedLocation?.address || manualAddress,
        payment_method: paymentMethod,
        coordinates: selectedLocation?.coordinates || null
      };

      console.log('Order data prepared:', orderData);

      let response;
      try {
        console.log('Attempting to create order with current token...');
        response = await createOrder(orderData, token);
      } catch (error: any) {
        console.log('Order creation failed:', error);
        if (error.response?.status === 401) {
          console.log('Token expired, attempting to refresh...');
          try {
            const newToken = await refreshAuthToken();
            console.log('Token refreshed, retrying order creation...');
            response = await createOrder(orderData, newToken);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            throw refreshError;
          }
        } else {
          throw error;
        }
      }
      
      console.log('Order created successfully:', response?.data);

      // Handle FCM token in background
      getFCMToken()
        .then((fcmToken: string | null) => {
          if (fcmToken && user.id) {
            console.log('Storing FCM token...');
            storeFCMToken(user.id, fcmToken).catch(console.error);
          }
        })
        .catch(console.error);

      // Success handling
      setModalType('success');
      setModalMessage('Order placed successfully!');
      setModalVisible(true);
      clearCart();

      // Navigate to order confirmation screen
      setTimeout(() => {
        navigation.replace('OrderConfirmation', { 
          orderId: response?.data.id,
          orderTotal: total.toFixed(2),
          deliveryAddress: orderData.delivery_address
        });
      }, 2000);

    } catch (error: any) {
      console.error('Final order error:', {
        message: error.message,
        response: error.response?.data,
        code: error.code,
        stack: error.stack
      });
      
      const errorMap: Record<number, string> = {
        401: 'Session expired. Please login again',
        403: 'Please verify your account first',
        422: 'Invalid order data. Please check your items',
        500: 'Server error. Please try again later'
      };

      const message = error.response 
        ? errorMap[error.response.status] || error.response.data?.message || 'Order failed'
        : error.message || 'Network error';

      if (error.response?.status === 401) {
        navigation.navigate('Login');
      }

      setModalType('error');
      setModalMessage(message);
      setModalVisible(true);
    } finally {
      setOrderLoading(false);
    }
  };

  if (authLoading && !authChecked) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6D42" />
        <Text style={styles.loadingText}>Checking authentication...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {!user ? (
          <View style={styles.authWarning}>
            <Ionicons name="warning" size={24} color="#FF6D42" />
            <Text style={styles.authWarningText}>You need to login to place an order</Text>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Login Now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Delivery Location Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Location</Text>
              <TouchableOpacity
                style={styles.locationButton}
                onPress={() => setShowLocationPicker(true)}
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
              placeholderTextColor="#999"
            />

            {/* Payment Method Section */}
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

            {/* Order Summary Section */}
            <View style={styles.orderSummary}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              
              {cartItems.map((item: CartItem) => (
                <View key={item.id} style={styles.orderItem}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    {item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                  </Text>
                </View>
              ))}

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal:</Text>
                <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping:</Text>
                <Text style={styles.summaryValue}>$0.00</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total:</Text>
                <Text style={styles.grandTotal}>${total.toFixed(2)}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Footer with Confirm Button */}
      {user && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmOrder}
            disabled={orderLoading}
          >
            {orderLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.confirmButtonText}>Confirm Order</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Location Picker Modal */}
      <LocationPicker
        visible={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onLocationSelected={handleLocationSelect}
        onError={handleLocationError}
      />

      {/* Message Modal */}
      <MessageModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  authWarning: {
    backgroundColor: '#FFF5F2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  authWarningText: {
    marginVertical: 8,
    color: '#FF6D42',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#FF6D42',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
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
    color: '#666',
  },
  manualAddressInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
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
  orderSummary: {
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  grandTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6D42',
  },
  footer: {
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

export default CheckOut;