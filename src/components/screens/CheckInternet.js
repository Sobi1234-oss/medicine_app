import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const CheckInternet = ({}) => {
    const [isConnected,setIsConnected]=useState(false);
  useEffect(() => {
   
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={[styles.container]}>
         <View style={{position:'absolute',justifyContent:'center',alignItems:'center'
            ,bottom:2,height:50,width:'100%',backgroundColor:isConnected?'green':'red',
         }}> 
         <Text style={styles.title}>{isConnected ?'back online':'no internet connection'}</Text>
         </View>
     
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   padding:5,left:3
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 0,
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckInternet;