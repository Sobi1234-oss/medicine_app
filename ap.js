import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-reanimated';

import 'react-native-gesture-handler';
import Splash from './src/screens/splash/Welcome';

import Home from './src/screens/Home';
import Vaccines from './src/screens/Vaccines';
import VaccineTypes from './src/screens/VaccineTypes';
import profile from './src/screens/profile';
import Details from './src/screens/Details';
import VaccinationCenterDetails from './src/screens/VaccinationCenterDetails';
import VaccinationSchedule from './src/screens/VaccinationSchedule';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



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
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Vaccines"
      component={Vaccines}
      options={{
          headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="list" size={size} color={color} />
        ),
      }}
    />
   <Tab.Screen
  name="Vaccination center"
  component={VaccineTypes}
  options={{
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="medical" size={size} color={color} />
    ),
  }}
/>
    <Tab.Screen
      name="Profile"
      component={profile}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
        ),
      }}
    />
  
    
  </Tab.Navigator>
);









const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
     <Stack.Screen name="Details" component={Details} />
     <Stack.Screen name="VaccinationCenterDetails" component={VaccinationCenterDetails} />
      <Stack.Screen name="VaccinationSchedule" component={VaccinationSchedule} />
   <Stack.Screen name="MainApp" component={MainApp} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
