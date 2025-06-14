import { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet } from "react-native";

const FoodApp = ({ navigation }) => {
  // Refs for different features
  const searchInputRef = useRef(null);       // Search auto-focus
  const phoneInputRef = useRef(null);       // Phone number input
  const scrollViewRef = useRef(null);       // Infinite scroll tracking
  const starsRef = useRef([]);              // Star rating

  // State
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [phoneError, setPhoneError] = useState("");

  // 1. Auto-focus search on load
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // 2. Infinite scroll
  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    
    if (isCloseToBottom) {
      loadMoreFoods();
    }
  };

  const loadMoreFoods = async () => {
    // Simulate API call
    const newFoods = Array(5).fill().map((_, i) => ({
      id: foods.length + i + 1,
      name: `Food Item ${foods.length + i + 1}`
    }));
    
    setFoods([...foods, ...newFoods]);
    setPage(page + 1);
  };

  // 3. Validate phone number
  const validatePhone = () => {
    if (!phoneInputRef.current?.value?.match(/^\d{10}$/)) {
      setPhoneError("10 digits required");
      phoneInputRef.current?.focus();
      return false;
    }
    setPhoneError("");
    return true;
  };

  // 4. Star rating
  const handleRating = (index) => {
    setRating(index + 1);
  };

  return (
    <View style={styles.container}>
      {/* 1. Search Bar */}
      <TextInput
        ref={searchInputRef}
        style={styles.searchInput}
        placeholder="Search food..."
      />

      {/* 2. Food List with Infinite Scroll */}
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        {foods.map((food) => (
          <View key={food.id} style={styles.foodItem}>
            <Text style={styles.foodName}>{food.name}</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setIsCartOpen(true)}
            >
              <Text>Add to Cart</Text>
            </TouchableOpacity>
            
            {/* 5. Star Rating */}
            <View style={styles.ratingContainer}>
              {[0, 1, 2, 3, 4].map((i) => (
                <TouchableOpacity
                  key={i}
                  ref={el => starsRef.current[i] = el}
                  onPress={() => handleRating(i)}
                >
                  <Text style={[styles.star, { color: i < rating ? "gold" : "gray" }]}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <Text style={styles.loadingText}>Loading more...</Text>
      </ScrollView>

      {/* 3. Checkout Form */}
      <View style={styles.formContainer}>
        <TextInput
          ref={phoneInputRef}
          style={styles.phoneInput}
          placeholder="Phone (03XX1234567)"
          keyboardType="phone-pad"
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
        <TouchableOpacity 
          style={styles.orderButton}
          onPress={validatePhone}
        >
          <Text>Place Order</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Cart Modal */}
      <Modal visible={isCartOpen} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Your Cart</Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setIsCartOpen(false)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  foodItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#ddd',
    padding: 8,
    marginTop: 5,
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    fontSize: 24,
    marginRight: 5,
  },
  formContainer: {
    marginTop: 10,
  },
  phoneInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
  },
  orderButton: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    padding: 10,
  },
});

export default FoodApp;