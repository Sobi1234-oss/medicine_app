import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider, useUser } from './src/screens/UserContext/UserContext';
import Splash from './src/screens/splash/Splash';
import Login from './src/screens/Authentications/Login';
import Signup from './src/screens/Authentications/Signup';
import ProductsDetail from './src/screens/products/ProductsDetail';
import CartScreen from './src/screens/CartScreen';
import CheckOut from './src/screens/CheckOut/CheckOut';
import AddCategory from './src/screens/Add products/Addcategories';
import AddProducts from './src/screens/Add products/AddProducts';
import DrawerNavigator from './src/components/navigations/DrawerNavigation';
import TabNavigation from './src/components/navigations/TabNavigation';
import Products from './src/screens/products/Products';
import Home from './src/screens/home/Home';
import Geolocation from '@react-native-community/geolocation';
import  { useEffect } from 'react';
import {
  requestUserPermission,
  getFCMToken,
  setupNotificationListeners,
} from './src/services/Notification';

import { ActivityIndicator, View } from 'react-native';
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
});
const Stack = createStackNavigator();
const queryClient = new QueryClient();
navigator.geolocation = Geolocation;
const RootNavigator = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#e75480" />
      </View>
    );
  }
 useEffect(() => {
    const initializeNotifications = async () => {
      await requestUserPermission();
      await getFCMToken();
      setupNotificationListeners();
    };

    initializeNotifications();
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainApp" component={DrawerNavigator} />
        </>
      )}

      {/* Other screens (can be accessed after login) */}
      <Stack.Screen name="ProductsDetail" component={ProductsDetail} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="Addcategories" component={AddCategory} />
      <Stack.Screen name="AddProducts" component={AddProducts} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="TabNavigation" component={TabNavigation} />
       
    </Stack.Navigator>
  );
};


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
