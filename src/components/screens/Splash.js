import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Splash = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/splash.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <Text style={styles.title}>
          Vaksin
          <Text style={styles.idText}>.id</Text>
        </Text>
        <Text style={styles.subtitle}>
         "Sign up for the vaccine now, take care of your health and those around you."
        </Text>

       
      </View>
       <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('React_reanimated')} 
        >
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E3E70',
    padding: 20,
  },

  image: {
    width: 270,
    height: 270,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: 300,
    marginTop: -20,
    height:200
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    fontFamily:'Quicksand-Bold'
  },

  idText: {
    color: '#f24e4e',
      fontFamily:'Quicksand-Bold'
  },

  subtitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 15,
    fontFamily:'Quicksand-Medium'
  },

  button: {
    backgroundColor: '#f24e4e',
    width: 75,
    height: 75,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
    borderWidth:10,borderColor:'#3E3E70',
    elevation:0
  },
});

export default Splash;
