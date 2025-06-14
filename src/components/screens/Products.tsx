import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ProductItems from '../screens/ProductItems';
import CustomTextInput from '../Textinput/Textinput';
import axios from '../../apis/api'; // make sure path is correct

interface productstate {
  id: number;
  name: string;
  price: number;
}

const Products = () => {
  const [products, setProducts] = useState<productstate[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data); // assuming backend returns array of products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItems item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <CustomTextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
        keyboardType="default"
        maxLength={50}
        disabled={false}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listContent: {
    padding: 10,
    paddingBottom: 20,
  },
});
