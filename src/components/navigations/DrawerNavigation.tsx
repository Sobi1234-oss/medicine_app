import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileDrawer from '../../components/navigations/Drawer';
import TabNavigation from './TabNavigation';
import SettingsScreen from '../../screens/home/SettingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../screens/UserContext/UserContext'; // 🐾 Get user from context

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    const { user } = useUser(); // 👈 Grab current user
    const userRole = user?.role || 'user'; // 👈 Default fallback

    return (
        <Drawer.Navigator
            drawerContent={(props) => <ProfileDrawer {...props} />}
            screenOptions={{
                drawerStyle: { width: 300 },
                drawerType: 'slide',
                headerShown: false,
                overlayColor: 'rgba(0,0,0,0.3)',
                drawerActiveTintColor: '#e75480',
                drawerInactiveTintColor: '#333',
            }}
        >
            <Drawer.Screen 
                name="TabNavigation" 
                component={TabNavigation}
                initialParams={{ userRole }} // ✅ Pass user role
                options={{
                    title: 'Home',
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen 
                name="Settings" 
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    drawerIcon: ({ color }) => (
                        <Ionicons name="settings-outline" size={24} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
