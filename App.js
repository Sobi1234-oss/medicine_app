// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider, useUser } from './src/screens/UserContext/UserContext';
import Welcome from './src/screens/splash/Welcome';
import Login from './src/screens/Authentications/Login';
import Signup from './src/screens/Authentications/Signup';
import ProductsDetail from './src/screens/products/ProductsDetail';
import CartScreen from './src/screens/CartScreens/CartScreen';
import CheckOut from './src/screens/CartScreens/CheckOut';
import AddCategory from './src/screens/Add products/Addcategories';
import AddProducts from './src/screens/Add products/AddProducts';
import DrawerNavigator from './src/components/navigations/DrawerNavigation';
import TabNavigation from './src/components/navigations/TabNavigation';
import Products from './src/screens/products/Products';
import Home from './src/screens/home/Home';
import Geolocation from '@react-native-community/geolocation';
import SplashScreen from 'react-native-splash-screen';
import { AuthContext, AuthProvider } from './src/screens/Authentications/AuthContext';
import {
  requestUserPermission,
  getFCMToken,
  setupNotificationListeners,
} from './src/services/Notification';
import { ActivityIndicator, SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';

// Configure geolocation
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
});

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const queryClient = new QueryClient();
navigator.geolocation = Geolocation;

const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Welcome" component={Welcome} />
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
  </AuthStack.Navigator>
);

const MainStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainApp" component={DrawerNavigator} />
    {/* Common screens accessible from anywhere */}
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

const RootNavigator = () => {
  const { user: userContextUser, loading: userLoading } = useUser();
  const { user: authUser, loading: authLoading } = React.useContext(AuthContext);

  useEffect(() => {
    const initializeNotifications = async () => {
      await requestUserPermission();
      await getFCMToken();
      setupNotificationListeners();
    };

    initializeNotifications();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (userLoading || authLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e75480" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        {authUser ? <MainStackScreen /> : <AuthStackScreen />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <RootNavigator />
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;