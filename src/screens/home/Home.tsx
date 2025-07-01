// screens/Home/Home.tsx (TSX version)

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  Dimensions, ScrollView, ActivityIndicator, SafeAreaView, FlatList
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories, updateProduct } from '../../apis/api';
import HomeHeader from '../../components/Header/HomeHeader';
import { launchImageLibrary } from 'react-native-image-picker';
import UpdateProductModal from '../../components/UpdateModals/UpdateProducts';
import ProductList from '../../components/swipelists/ProductsList'; //Custom reusable component
import { DrawerActions } from '@react-navigation/native';
export interface ProductType {
  id: number;
  name: string;
  price: number;
  image_url?: string;
}

export interface CategoryType {
  id: number;
  name: string;
}

const Home = ({ navigation }: { navigation : any }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { data: products = [], isLoading, error, refetch } = useQuery<ProductType[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const { data: categories = [] } = useQuery<CategoryType[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6D42" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load data.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
     const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
 <HomeHeader navigation={navigation} onProfilePress={openDrawer} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello Soban</Text>
          <Text style={styles.subtitle}>Order your favorite food</Text>
        </View>

        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        />

        <View style={styles.productsHeader}>
          <Text style={styles.sectionTitle}>Products</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/*  Reused ProductList component */}
        <ProductList
          products={products}
          navigation={navigation}
          onOptionsPress={(product) => {
            setSelectedProduct(product);
            setShowUpdateModal(true);
          }}
        />
      </ScrollView>

      <UpdateProductModal
        visible={showUpdateModal}
        product={selectedProduct}
        categories={categories}
        onClose={() => setShowUpdateModal(false)}
        onUpdate={handleUpdateProduct}
        selectImage={selectImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (same styles as before)
  container: { flex: 1, backgroundColor: '#e6e6fa' },
  content: { padding: 16, paddingBottom: 30 },
  header: { marginBottom: 20 },
  greeting: {
    fontSize: 24, fontWeight: 'bold', color: '#000080', fontFamily: 'Quicksand-Medium',
  },
  subtitle: {
    fontSize: 16, color: 'black', fontFamily: 'Quicksand-Medium', marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15,
  },
  categoryItem: {
    backgroundColor: '#dc143c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    elevation: 8
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Quicksand-Medium',
  },
  categories: {
    paddingBottom: 15,
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  seeAll: {
    color: '#FF6D42',
    fontWeight: '500',
    fontFamily: 'Quicksand-Medium',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF6D42',
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Home;
