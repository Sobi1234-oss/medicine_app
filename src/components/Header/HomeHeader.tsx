// components/Header/HomeHeader.tsx
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInputProps
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface HomeHeaderProps {
  navigation: any;
  onProfilePress: () => void;
}



const HomeHeader: React.FC<HomeHeaderProps> = ({ navigation,onProfilePress }) => {
  return (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <TouchableOpacity  onPress={onProfilePress}>
          <Image
            source={require('../../assets/images/profile.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationIcon}>
        <MaterialIcons name="circle-notifications" color="#000" size={60} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search food..."
          placeholderTextColor="grey"
          style={styles.searchInput}
        />
        <Ionicons name="search" size={20} color="grey" style={styles.searchIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    height: 100,
    borderBottomWidth: 0,
    elevation: 3,
    backgroundColor:'white'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    left: 10,
    elevation: 3,
  },
  notificationIcon: {
    marginLeft: 15,
    elevation: 3,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginLeft: 20,
    height: 40,
    right: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: 'grey',
    fontSize: 15,
  },
  searchIcon: {
    marginLeft: 10,
  },
});

export default HomeHeader;
