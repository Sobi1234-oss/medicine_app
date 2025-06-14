import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';

interface Product {
  id: number;
  title: string;
}

const Dropdown = () => {
  const [opendropdown, setOpendropdown] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string>('Select Product');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const titles = data.map((item: any) => ({ id: item.id, title: item.title }));
        setProducts(titles);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSelect = (title: string) => {
    setSelected(title);
    setOpendropdown(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.selectedText} numberOfLines={1}>
          {selected}
        </Text>
        <TouchableOpacity onPress={() => setOpendropdown(!opendropdown)}>
          <Image
            source={require('../../assets/images/image.png')}
            style={styles.dropdownIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {opendropdown && (
        <View style={styles.dropdownList}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item.title)}
                style={styles.dropdownItem}
              >
                <Text numberOfLines={1} style={styles.dropdownItemText}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    width: '90%',
    height: 55,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    zIndex: 2,
  },
  selectedText: {
    fontSize: 16,
    flex: 1,
    color: '#000',
  },
  dropdownIcon: {
    width: 20,
    height: 20,
  },
  dropdownList: {
    width: '90%',
    maxHeight: 200,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    marginTop: 5,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#000',
  },
});
