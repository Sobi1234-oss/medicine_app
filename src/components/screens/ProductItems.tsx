import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface dataprop {
  item: {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: {
      rate: number;
      count: number;
    };
    title: string;
  };
}

const ProductItems = ({ item }: dataprop) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>Category: {item.category}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
        <Text style={styles.rating}>Rating: {item.rating?.rate} ({item.rating?.count} reviews)</Text>
      </View>
    </View>
  );
};

export default ProductItems;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    margin: 10,
  },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 12,
    color: '#555',
  },
  price: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007bff',
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  rating: {
    fontSize: 12,
    color: '#28a745',
  },
});
