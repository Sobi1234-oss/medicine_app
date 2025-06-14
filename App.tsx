import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import 'react-native-gesture-handler';
import 'react-native-reanimated';

// Screens
import Splash from './src/components/screens/Splash';
import Quiz from './src/components/screens/quiz';
import Result from './src/components/screens/Results';
import Products from './src/components/screens/Products'; // Optional additional screen
import ProductsItems from './src/components/screens/ProductItems'; 
import selection from './src/components/screens/selection';
import Dropdown from './src/components/Dropdown/Dropdown';
import React_reanimated from './src/components/screens/React_reanimated';
import React_reanimated2 from './src/components/screens/React_reanimated2';
import FoodApp from './src/components/screens/FoodApp';
import SearchBar from './src/components/screens/SearchBar';
import CheckInternet from"./src/components/screens/CheckInternet";
import Upload from './src/components/screens/Upload';
import add from './src/components/screens/Add';
import show from './src/components/screens/Show';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for MainApp
const MainApp = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelPosition: 'below-icon',
      tabBarShowLabel: true,
      tabBarActiveTintColor: 'purple',
      tabBarInactiveTintColor: 'grey',
    }}
  >
    <Tab.Screen
      name="Quiz"
      component={Quiz}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
      }}
    />
       <Tab.Screen
      name="Products"
      component={Products}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="menu" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="selection"
      component={selection}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="list" size={size} color={color} />
        ),
      }}
    />
        <Tab.Screen
      name="Dropdown"
      component={Dropdown}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="chevron-down" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

// Main App
const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainApp" component={MainApp} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="React_reanimated" component={React_reanimated}/>
      <Stack.Screen name="React_reanimated2" component={React_reanimated2}/>
        <Stack.Screen name="SearchBar" component={SearchBar}/>
         <Stack.Screen name="FoodApp" component={FoodApp}/>
        <Stack.Screen name="CheckInternet" component={CheckInternet}/>
         <Stack.Screen name="Upload" component={Upload}/>
          <Stack.Screen name="Add" component={add}/>
           <Stack.Screen name="Show" component={show}/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
