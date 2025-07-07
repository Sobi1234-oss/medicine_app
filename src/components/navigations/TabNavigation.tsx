import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet, Platform } from 'react-native';

// Import Screens
import Home from '../../screens/home/Home';
import Products from '../../screens/products/Products';
import Dropdown from '../Dropdown/Dropdown';
import Main from '../../screens/Add products/main';
import CartScreen from '../../screens/CartScreens/CartScreen';
import OrdersScreen from '../../screens/Orders/Orders';
import { useUser } from '../../screens/UserContext/UserContext';
const Tab = createBottomTabNavigator();

const TabNavigation = ({  }) => {
    const { user } = useUser(); // Default to 'user' if no role provided

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#e75480',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      {/* Home Tab - Visible to all */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                size={24} 
                color={color} 
              />
            </View>
          ),
          tabBarLabel: 'Home',
        }}
      />

      {/* Products Tab - Visible to all */}
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
              <Ionicons 
                name={focused ? 'list' : 'list-outline'} 
                size={24} 
                color={color} 
              />
            </View>
          ),
          tabBarLabel: 'Products',
        }}
      />

      {/* Add Tab - Only visible to admin */}
      {user?.role  === 'admin' && (
        <Tab.Screen
          name="Add"
          component={Main}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.addButton, focused && styles.addButtonFocused]}>
                <Ionicons name="add" size={30} color="white" />
              </View>
            ),
            tabBarLabel: '',
          }}
        />
      )}

      {/* Cart Tab - Visible to all */}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
              <Ionicons 
                name={focused ? 'cart' : 'cart-outline'} 
                size={24} 
                color={color} 
              />
            </View>
          ),
          tabBarLabel: 'Cart',
        }}
      />

      {/* More Tab - Visible to all */}
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
              <Ionicons 
                name={focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline'} 
                size={24} 
                color={color} 
              />
            </View>
          ),
          tabBarLabel: 'Orders',
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBarStyle: {
    height: Platform.OS === 'ios' ? 85 : 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    shadowColor: 'pink',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 15,
    elevation: 15,
    borderTopWidth: 0,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
  },
  iconContainer: {
    padding: 5,
    borderRadius: 15,
  },
  iconContainerFocused: {
    padding: 0,
    borderRadius: 15,
    backgroundColor: 'rgba(231, 84, 128, 0.15)',
  },
  addButton: {
    backgroundColor: '#e75480',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    shadowColor: '#e75480',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  addButtonFocused: {
    transform: [{ scale: 1.2 }],
    shadowColor: '#e75480',
    shadowOpacity: 0.8,
  },
});

export default TabNavigation;