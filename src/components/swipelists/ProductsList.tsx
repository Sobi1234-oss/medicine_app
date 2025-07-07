import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProductType } from '../../screens/Home/Home';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 10;
const PRODUCT_CARD_WIDTH = (width - (CARD_MARGIN * 3)) / 2; // Calculate width with margins

interface ProductListProps {
  products: ProductType[];
  navigation: any;
  onOptionsPress: (product: ProductType) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, navigation, onOptionsPress }) => {
  const scaleValue = new Animated.Value(0.95);

  const animateCard = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }: { item: ProductType }) => {
    animateCard();
    
    return (
      <Animated.View
        style={[
          styles.cardContainer, 
          { 
            width: PRODUCT_CARD_WIDTH,
            marginHorizontal: CARD_MARGIN / 2,
            transform: [{ scale: scaleValue }],
            opacity: scaleValue
          }
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ProductsDetail', { product: item })}
        >
          <View style={styles.card}>
            <Image
              source={{ uri: item.image_url || 'https://via.placeholder.com/300' }}
              style={styles.image}
              resizeMode="contain"
            />
            
            <View style={styles.badge}>
              <Text style={styles.badgeText}>New</Text>
            </View>
            
            <TouchableOpacity
              style={styles.optionsBtn}
              onPress={() => onOptionsPress(item)}
            >
              <Ionicons name="ellipsis-vertical" size={20} color="#555" />
            </TouchableOpacity>
            
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>RS: {item.price}</Text>
                {item.originalPrice && (
                  <Text style={styles.originalPrice}>RS: {item.originalPrice}</Text>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={renderItem}
      scrollEnabled={false}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.columnWrapper}
      ListFooterComponent={<View style={{ height: 10 }} />}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10, // Add horizontal padding to contain all items
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: CARD_MARGIN,
  },
  cardContainer: {
    marginBottom: CARD_MARGIN,
    width: PRODUCT_CARD_WIDTH, // Explicit width
    marginHorizontal: 0, // Remove individual card margins
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    height: 280,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    width: '95%',marginLeft:-20 // Make card fill its container
  },
  image: {
    width: '100%',
    height: 210,
    backgroundColor: '#f5f5f5',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF6D42',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6D42',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  optionsBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default ProductList;