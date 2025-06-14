import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { isSharedValue, useAnimatedStyle, useSharedValue, withSpring, withTiming, interpolate, interpolateColor } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';

const React_reanimated2 = ({ navigation, route }) => {
  const [click, setclick] = useState(false);
  const animation = useSharedValue(100);
  const animation2 = useSharedValue(0); // New shared value for interpolation
  const [count,setcount]=useState(0);
  const previouscount=useRef(0);
  const inputref=useRef(null);
    const inputref1=useRef(null);
  useEffect(()=>{
  previouscount.current=count;
  },[count])
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${animation.value}deg` }
      ]
    }
  });
  
  const animatedStyle2 = useAnimatedStyle(() => {
    const scale = interpolate(animation2.value, [0, 1], [1, 1.5]);
    const opacity = interpolate(animation2.value, [0, 1], [1, 0.5]);
     const borderradius = interpolate(animation2.value, [1, 0], [0, 100]);
    const bgcolor=interpolateColor(animation2.value,[1,0],['orange','red'])
    return {
      transform: [
        { scale: scale }
      ],
      opacity: opacity,
      width: 100,
      height: 100,
      backgroundColor: bgcolor,top:40,
      borderRadius:borderradius
    }
  });

  return (
    <ScrollView>
    <View style={styles.container}>
      <Animated.View style={[{ width: 100, height: 100, backgroundColor: 'red' }, animatedStyle]}></Animated.View>
      
      <TouchableOpacity 
        style={{ width: 200, height: 50, backgroundColor: 'black', top: 20, marginVertical: 20 }}
        onPress={() => {
          if (click) {
            animation.value = withTiming(100, { duration: 1000 });
            animation2.value = withTiming(0, { duration: 1000 });
          } else {
            animation.value = withTiming(-100, { duration: 1000 });
            animation2.value = withTiming(1, { duration: 1000 });
          }
          setclick(!click);
        }}>
        <Text style={{ fontSize: 15, color: "white", textAlign: 'center', padding: 15 }}>Start animation</Text>
      </TouchableOpacity>
      
      <Animated.View style={[animatedStyle2]}></Animated.View>
      
      <TouchableOpacity 
        style={{ width: 200, height: 50, backgroundColor: 'green', top: 40, marginVertical: 20 }}
        onPress={() => {
          animation2.value = withTiming(animation2.value === 0 ? 1 : 0, { duration: 1000 });
        }}>
        <Text style={{ fontSize: 15, color: "white", textAlign: 'center', padding: 15 }}>Interpolate animation</Text>
      </TouchableOpacity>
      
        <Text style={{fontSize:18,fontWeight:'bold',color:'blue',top:20}}>current count  {count}</Text>
         <Text style={{fontSize:18,fontWeight:'bold',color:'red',top:20}}>previous count  {previouscount.current}</Text>
        <Text style={{fontSize:18,fontWeight:'bold',color:'black',top:20,backgroundColor:'skyblue'}} onPress={()=>{
          setcount(count+1);
        }}>Increase count</Text>
        <TextInput  ref={inputref}style={{width:'70%',height:50,marginTop:40,borderWidth:1}}/>
         <TextInput  ref={inputref1}style={{width:'70%',height:50,marginTop:20,borderWidth:1}}/>
        <Button onPress={()=>inputref1.current.focus} title='focus input'></Button>
      </View>
   
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',padding:20,
  },
  // ... (keep your existing styles)
});

export default React_reanimated2;