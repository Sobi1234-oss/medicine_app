import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../screens/UserContext/UserContext';

const ProfileDrawer = (props) => {
    const { user, logout } = useUser();

    if (!user) {
        return (
            <DrawerContentScrollView {...props}>
                <Text style={styles.notLoggedIn}>Please login to view profile</Text>
                <DrawerItem
                    label="Login"
                    onPress={() => props.navigation.navigate('Login')}
                    icon={({ color }) => <Ionicons name="log-in-outline" size={24} color={color} />}
                />
            </DrawerContentScrollView>
        );
    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollArea}>
                <View style={styles.profileHeader}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <Text style={styles.userRole}>{user.role.toUpperCase()}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailsSection}>
                    <DetailItem icon="person-circle-outline" text={`ID: ${user.id}`} />
                </View>

                <View style={styles.divider} />

                <DrawerItem
                    label="Home"
                    onPress={() => props.navigation.navigate('')}
                    icon={({ color }) => <Ionicons name="home-outline" size={24} color={color} />}
                    labelStyle={styles.menuLabel}
                />
                <DrawerItem
                    label="Settings"
                    onPress={() => props.navigation.navigate('Settings')}
                    icon={({ color }) => <Ionicons name="settings-outline" size={24} color={color} />}
                    labelStyle={styles.menuLabel}
                />
                <DrawerItem
                    label="Products"
                    onPress={() => props.navigation.navigate('Products')}
                    icon={({ color }) => <Ionicons name="pricetags-outline" size={24} color={color} />}
                    labelStyle={styles.menuLabel}
                />
                <DrawerItem
                    label="Cart"
                    onPress={() => props.navigation.navigate('CartScreen')}
                    icon={({ color }) => <Ionicons name="cart-outline" size={24} color={color} />}
                    labelStyle={styles.menuLabel}
                />
                <DrawerItem
                    label="Order Details"
                    onPress={() => props.navigation.navigate('CartScreen')}
                    icon={({ color }) => <Ionicons name="clipboard-outline" size={24} color={color} />}
                    labelStyle={styles.menuLabel}
                />
            </DrawerContentScrollView>

            {/* 🎯 Fixed Footer with Logout */}
            <View style={styles.footer}>
                <DrawerItem
                    label="Logout"
                    onPress={logout}
                    icon={({ color }) => <Ionicons name="log-out-outline" size={24} color={color} />}
                    labelStyle={[styles.menuLabel, styles.logoutLabel]}
                />
            </View>
        </View>
    );
};

const DetailItem = ({ icon, text }) => (
    <View style={styles.detailItem}>
        <Ionicons name={icon} size={20} color="#666" />
        <Text style={styles.detailText}>{text || 'Not specified'}</Text>
    </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileHeader: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#e75480',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 15,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: '#f0f0f0',
        marginBottom: 5,
    },
    userRole: {
        fontSize: 12,
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 15,
    },
    detailsSection: {
        paddingHorizontal: 20,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    detailText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
    },
    menuLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 0,justifyContent:'space-between'
    },
    logoutLabel: {
        color: '#e75480',
    },
    notLoggedIn: {
        textAlign: 'center',
        margin: 20,
        color: '#666',
    },
    container: {
    flex: 1,
    backgroundColor: '#fff',
},
scrollArea: {
    paddingBottom: 20,
},
footer: {
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
},
});

export default ProfileDrawer;