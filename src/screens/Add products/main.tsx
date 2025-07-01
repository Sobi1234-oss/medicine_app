// screens/Add products/Main.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const Main: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Items</Text>
      </View>

      {/* Square Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={styles.squareTab}
          onPress={() => navigation.navigate('AddProducts')}
        >
         <MaterialIcons name="add-to-photos" color="white" size={50} />
          <Text style={styles.tabLabel}>Add Product</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.squareTab}
          onPress={() => navigation.navigate('Addcategories')}
        >
          <MaterialIcons name="how-to-vote" color="white" size={50} />
          <Text style={styles.tabLabel}>Add Category</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    color: 'black',
    flex: 1,
    textAlign: 'center',
    marginRight: 28, // to balance back icon
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  squareTab: {
    width: 140,
    height: 140,
    backgroundColor: '#e75480',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  tabLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});
