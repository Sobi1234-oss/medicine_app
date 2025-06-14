import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const data = [
  { id: '1', name: 'Frontend Engineer' },
  { id: '2', name: 'Backend Engineer' },
  { id: '3', name: 'DevOps Engineer' },
  { id: '4', name: 'ML Engineer' },
  { id: '5', name: 'Mobile Engineer' },
  { id: '6', name: 'QA Engineer' },
  { id: '7', name: 'Fullstack Engineer' },
  { id: '8', name: 'Data Engineer' },
  { id: '9', name: 'System Engineer' },
  { id: '10', name: 'Cloud Engineer' },
];

const Selection = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);

  const handleSelect = (id: string) => {
    if (isMultiSelect) {
      setSelectedItems(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else {
      setSelectedItems([id]);
    }
  };

  const renderItem = ({ item }: { item: { id: string; name: string } }) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => handleSelect(item.id)}
      >
        <Text style={[styles.text, isSelected && styles.selectedText]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toggle}
        onPress={() => setIsMultiSelect(!isMultiSelect)}
      >
        <Text style={styles.toggleText}>
          {isMultiSelect ? 'Switch to Single Select' : 'Switch to Multi Select'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
  },
  toggle: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    marginHorizontal: 5,
  },
  toggleText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  row: {
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#cce5ff',
    borderColor: '#3399ff',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#0077cc',
  },
});
