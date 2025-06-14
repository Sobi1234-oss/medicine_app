
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Details = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vaccine Details</Text>
      </View>

      <View style={styles.content}>
      
        <View style={styles.imageContainer}>
          <Image 
            source={item.image} 
            style={styles.image} 
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manufacturer</Text>
          <Text style={styles.sectionContent}>{item.manufacturer}</Text>
        </View>

       
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Effectiveness</Text>
          <View style={styles.effectivenessContainer}>
            <Text style={styles.effectivenessText}>{item.effectiveness}</Text>
          </View>
        </View>

       
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionContent}>{item.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Countries</Text>
          <View style={styles.countriesContainer}>
            {item.availableCountries.map((country, index) => (
              <View key={index} style={styles.countryItem}>
                <Ionicons name="location" size={16} color="#6a1b9a" />
                <Text style={styles.countryText}>{country}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 3,
  },
  backButton: {
    padding: 5,color:'black'
  },
  headerTitle: {
    fontSize: 22,
    left:40,
    color: 'black',
    marginLeft: 20,
    fontFamily: 'Quicksand-Bold',
  },
  content: {
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 25,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#483d8b',
    fontFamily: 'Quicksand-Bold',
    flex: 1,
  },
  price: {
    fontSize: 24,
    color: '#4caf50',
    fontWeight: '700',
    fontFamily: 'Quicksand-Bold',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#483d8b',
    marginBottom: 15,
    fontFamily: 'Quicksand-Bold',
    borderBottomWidth: 2,
    borderBottomColor: '#f3e5f5',
    paddingBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    fontFamily: 'Quicksand-Regular',
  },
  effectivenessContainer: {
  
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  effectivenessText: {
    fontSize: 18,
    color: '#2e7d32',
    fontWeight: 'bold',
    fontFamily: 'Quicksand-Bold',
  },
  countriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e5f5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  countryText: {
    fontSize: 14,
    color: '#6a1b9a',
    marginLeft: 5,
    fontFamily: 'Quicksand-Medium',
  },
});

export default Details;