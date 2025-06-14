import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { View, TextInput, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import{ Animated }  from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import image from '../screens/SearchBar'
const Slideritem = () => {
 

  return (
    <View style={{width:'90%',height:400}}>
      <Image source={image} style={{width:'88%',height:398}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    overflow: 'hidden',justifyContent:'center'
  },
 
});

export default Slideritem;