import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { fetchOrders } from '../../apis/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Failed to load orders', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) =>
        order?.product?.title?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  };

  const renderItem = ({ item }) => {
    const product = item.product;

    return (
      <View style={styles.orderItem}>
        <Image
          source={{ uri: product?.image_url || 'https://via.placeholder.com/150' }}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{product?.name || 'Unnamed Product'}</Text>
          <Text style={styles.text}>Location:</Text> 
          <Text style={styles.loctext}> {item.location}</Text>
          <Text style={styles.text}>Total:</Text>
         <Text style={styles.tottext} >Rs:{item.total_amount}</Text>
          <Text style={styles.text}>Quantity: {item.quantity ?? 1}</Text>
          <Text style={styles.dateText}>
            Ordered at: {new Date(item.created_at).toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 🔻 Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Orders</Text>

        <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
          <MaterialIcons name="search" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      {/* 🔍 Search Bar */}
      {showSearch && (
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#555" style={{ marginHorizontal: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search orders..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      )}

      {/* 📦 Orders List */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FF6D42" />
        </View>
      ) : filteredOrders.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="clipboard-outline" size={60} color="#ccc" />
          <Text style={{ color: '#999', marginTop: 10 }}>No orders found</Text>
        </View>
      ) : (
        <FlatList
  data={filteredOrders}
  renderItem={renderItem}
  keyExtractor={(item) => item.id.toString()}
  contentContainerStyle={[styles.list, { paddingBottom: 80 }]} // 👈 Add bottom padding here
/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
  },
  list: {
    padding: 16,
    backgroundColor: '#e6e6fa',
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 120,
    borderRadius: 8,
    marginRight: 15,
    marginTop: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: 'black',
  },
  text: {
    fontSize: 14,
    color: '#555',
    fontWeight:'bold'
  },
   tottext: {
    fontSize: 14,
    color: 'red',
  },
  loctext: {
    fontSize: 14,
    color: 'blue',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrdersScreen;
