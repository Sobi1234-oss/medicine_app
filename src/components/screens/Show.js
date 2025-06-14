import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList, Image, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {db} from './db';

const Show = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM products ORDER BY id DESC',
        [],
        (_, resultSet) => {
          const items = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            items.push(resultSet.rows.item(i));
          }
          setProducts(items);
          setLoading(false);
          setRefreshing(false);
        },
        (txObj, error) => {
          console.error('Error fetching products:', error);
          setLoading(false);
          setRefreshing(false);
          Alert.alert('Error', 'Failed to load products. Please try again.');
          return true;
        }
      );
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
      return () => {}; 
    }, [fetchProducts])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const renderProduct = ({item}) => (
    <TouchableOpacity 
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetail', {productId: item.id})}
      activeOpacity={0.8}
    >
      {item.imageUri ? (
        <Image 
          source={{uri: item.imageUri}} 
          style={styles.productImage} 
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.productImage, styles.emptyImage]}>
          <Text style={styles.emptyImageText}>No Image</Text>
        </View>
      )}
      
      <View style={styles.productDetails}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>${parseFloat(item.price).toFixed(2)}</Text>
        {item.description && (
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        {item.fileUri && (
          <Text style={styles.fileInfo} numberOfLines={1}>
            PDF: {item.fileUri.split('/').pop()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('Add')}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>Add New Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 70, // Space for the add button
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 10,
  },
  emptyImage: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImageText: {
    color: '#999',
    fontSize: 16,
  },
  productDetails: {
    paddingHorizontal: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  fileInfo: {
    fontSize: 12,
    color: '#3498db',
    fontStyle: 'italic',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Show;