import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { useCartStore } from '../../components/store/useCartStore';
import CartMessage from '../../components/MesageModals/CartMessage';

const { width } = Dimensions.get('window');

// Navigation types
type RootStackParamList = {
  MainTabs: { screen: string };
  ProductsDetail: {
    product: {
      id: number;
      title: string;
      price: number;
      image_url?: string;
      description?: string;
      rating?: number;
    };
  };
};

type RouteProps = RouteProp<RootStackParamList, 'ProductsDetail'>;
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'ProductsDetail'>;

const ProductsDetail = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();
  const { product } = route.params;

  const addToCart = useCartStore((state) => state.addToCart);
  const rating = product.rating ?? 4.5;
  const reviews = 128;

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

const handleAddToCart = () => {
  const cartItems = useCartStore.getState().items; 
  const isAlreadyAdded = cartItems.some(item => item.id === product.id.toString());

  if (isAlreadyAdded) {
    setModalMessage(`${product?.title ?? 'Item'} is already in your cart`);
    setModalType('error');
    setModalVisible(true);
    return;
  }

  addToCart({
    id: product.id.toString(),
    name: product.title,
    price: product.price,
    image: product.image_url,
  });

  setModalMessage(`${product?.title ?? 'Item'} has been added to your cart`);
  setModalType('success');
  setModalVisible(true);
};
  const handleContinueShopping = () => {
    setModalVisible(false);
  };

  const handleViewCart = () => {
    setModalVisible(false);
    navigation.navigate('TabNavigation', { screen: 'Cart' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="heart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Product Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <LinearGradient
            colors={['#f8f8f8', '#e0e0e0', '#d0d0d0']}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Image
              source={{ uri: product.image_url || 'https://via.placeholder.com/300' }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </LinearGradient>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.titlePriceRow}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>Rs: {product.price}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons
                  key={i}
                  name={i <= Math.floor(rating) ? 'star' : 'star-outline'}
                  size={22}
                  color={i <= rating ? '#FFD700' : '#ccc'}
                />
              ))}
              <Text style={styles.ratingText}>
                {rating.toFixed(1)} ({reviews} reviews)
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {product.description ||
                'No description available. This is a premium quality product with excellent features.'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            {[
              'Premium quality materials',
              'Long-lasting durability',
              'Easy to use and maintain',
              'Eco-friendly packaging',
              '1-year manufacturer warranty',
            ].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.infoText}>Delivery within 2–3 business days</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={styles.infoText}>Free shipping nationwide</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Message Modal */}
      <CartMessage
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={handleContinueShopping}
        onViewCart={handleViewCart}
      />

      {/* Add to Cart Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  iconButton: { padding: 5 },
  scrollContainer: { paddingBottom: 100 },
  imageContainer: { paddingHorizontal: 20, marginTop: 10 },
  gradientBackground: {
    width: '100%',
    height: width * 0.7,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  productImage: { width: '80%', height: '80%' },
  infoContainer: { padding: 20 },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  productTitle: { fontSize: 22, fontWeight: '600', color: '#333', flex: 1 },
  productPrice: { fontSize: 24, fontWeight: '700', color: '#FF6D42' },
  ratingContainer: { marginBottom: 20 },
  starContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 10, fontSize: 15, color: '#666' },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 12 },
  descriptionText: { fontSize: 15, color: '#555', lineHeight: 22 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  featureText: { marginLeft: 10, fontSize: 15, color: '#444' },
  infoBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoText: { marginLeft: 10, fontSize: 14, color: '#666' },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 5,
  },
  cartButton: {
    flex: 1,
    backgroundColor: '#FF6D42',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },
});

export default ProductsDetail;
