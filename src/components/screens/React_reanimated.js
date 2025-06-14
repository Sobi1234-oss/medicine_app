import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Touchable,Image } from 'react-native';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckInternet from './CheckInternet';
import NetInfo from '@react-native-community/netinfo';
const React_reanimated = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [click, setClick] = useState(false);
  const animation = useSharedValue(100);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Animation style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animation.value }]
  }));

  // Toggle animation function
  const toggleAnimation = () => {
    animation.value = withTiming(click ? 100 : -100, { duration: 1000 });
    setClick(!click);
  };

  return (
    <View style={styles.container}>
      {!isConnected && (
        <CheckInternet isConnected={isConnected} setIsConnected={setIsConnected} />
      )}
      
      {/* Animated box */}
      <Animated.View style={[styles.animatedBox, animatedStyle]} />
        <View style={styles.imageContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/bell.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Animation button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={toggleAnimation}
      >
        <Text style={styles.buttonText}>
          {click ? 'Reset Animation' : 'Start Animation'}
        </Text>
      </TouchableOpacity>

      {/* Navigation buttons */}
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('React_reanimated2')}
      >
        <Text style={styles.buttonText}>Animation Interpolate</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('SearchBar')}
      >
        <Text style={styles.buttonText}>Search Bar Animation</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('FoodApp')}
      >
        <Text style={styles.buttonText}>UseRef Examples</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('CheckInternet')}
      >
        <Text style={styles.buttonText}>check internet</Text>
      </TouchableOpacity>
       <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('Upload')}
      >
        <Text style={styles.buttonText}>upload files</Text>
      </TouchableOpacity>
       <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('Add')}
      >
        <Text style={styles.buttonText}>Add products</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
   imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'grey',
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  offlineContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'red',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  offlineText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold'
  },
  animatedBox: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    marginBottom: 30
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#007bff',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3
  },
  navButton: {
    width: 200,
    height: 50,
    backgroundColor: '#343a40',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default React_reanimated;