// screens/Products/Products.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  ActivityIndicator, SafeAreaView, TouchableOpacity, FlatList,Image
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from '../../apis/api';
import Header from '../../components/Header/Header';
import ProductList from '../../components/swipelists/ProductsList';
import UpdateProductModal from '../../components/UpdateModals/UpdateProducts';
import { launchImageLibrary } from 'react-native-image-picker';
export interface ProductType {
  id: number;
  title: string; 
  price: number;
  image_url?: string;
}

export interface CategoryType {
  id: number;
  name: string;
}
const Products = ({ navigation }: { navigation: any }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
    refetch
  } = useQuery<ProductType[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('/products');
      return response.data;
    }
  });

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError
  } = useQuery<CategoryType[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get('/categories');
      return response.data;
    }
  });
  const filteredProducts = products.filter(product =>
    typeof product.title === 'string' &&
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (productsLoading || categoriesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6D42" />
      </View>
    );
  }

  if (productsError || categoriesError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {productsError?.message || categoriesError?.message || 'Failed to load data'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
    const selectImage = async (
      setImageUri: (uri: string) => void,
      setFormData: (updater: (prev: any) => any) => void
    ) => {
      const options = {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8,
      };
  
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets[0].uri) {
          const source = response.assets[0];
          setImageUri(source.uri);
          setFormData(prev => ({ ...prev, image: source }));
        }
      });
    };
  
    
 const handleUpdateProduct = async (
    productId: number,
    formData: any,
    imageFile: any
  ) => {
    try {
      await updateProduct(productId, formData, imageFile);
      refetch();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Products" onSearch={setSearchQuery} showBack={true} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        />

        <View style={styles.productsHeader}>
          <Text style={styles.sectionTitle}>All Products</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>

        {/* 👇 Ye component banaya hai sirf product list ke liye */}
        <ProductList
          products={products}
          navigation={navigation}
          onOptionsPress={(product) => {
            setSelectedProduct(product);
            setShowUpdateModal(true);
          }}
        />
         <UpdateProductModal
        visible={showUpdateModal}
        product={selectedProduct}
        categories={categories}
        onClose={() => setShowUpdateModal(false)}
        onUpdate={handleUpdateProduct}
        selectImage={selectImage}
      />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6e6fa' },
  content: { padding: 16, paddingBottom: 30 },
  sectionTitle: {
    fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15,
  },
  productsHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  seeAll: { color: '#FF6D42' },
  categoryItem: {
    backgroundColor: '#dc143c', paddingHorizontal: 20,
    paddingVertical: 10, borderRadius: 10, marginRight: 10,
  },
  categoryText: { color: 'white', fontWeight: 'bold' },
  categories: { paddingBottom: 15 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: 'red', fontSize: 16, marginBottom: 20 },
  retryButton: { backgroundColor: '#FF6D42', padding: 10, borderRadius: 5 },
  retryText: { color: '#FFF', fontWeight: 'bold' },
});

export default Products;
