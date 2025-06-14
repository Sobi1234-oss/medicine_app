import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Dark Purple Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      {/* Profile Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Circular Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
          />
        </View>

        {/* User Details */}
        <View style={styles.detailsContainer}>
          <DetailItem label="Name" value="Fajar Khan" />
          <DetailItem label="Phone" value="+92 300 1234567" />
          <DetailItem label="Address" value="123 Street, City, Country" />
          <DetailItem label="ID Number" value="EMP-12345" />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable component for detail items
const DetailItem = ({ label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#4B0082', // Dark purple
    height: 120,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 30,
  },
  imageContainer: {
    marginTop: -70, // Pulls image up into header
    marginBottom: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'white',
  },
  detailsContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  detailItem: {
    marginBottom: 15,
  },
  detailLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 3,
  },
  detailValue: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    width: '90%',
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;