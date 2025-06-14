import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,SafeAreaView,TextInput,FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const VaccineTypes = ({ navigation }) => {
  
   const [searchText, setSearchText] = React.useState('');
   const vaccinationCenters = [
  {
    id: '1',
    name: 'City Health Center',
    image: require('../../assets/images/city.jpg'),
    address: '123 Main St, Cityville',
    hours: '8:00 AM - 6:00 PM',
    vaccines: ['COVID-19', 'Flu', 'HPV', 'Hepatitis B'],
    contact: '(555) 123-4567'
  },
  {
    id: '2',
    name: 'Community Medical',
 image: require('../../assets/images/community.jpg'),
    address: '456 Oak Ave, Townsville',
    hours: '7:30 AM - 7:00 PM',
    vaccines: ['COVID-19', 'MMR', 'Polio', 'Tetanus'],
    contact: '(555) 987-6543'
  },
  {
    id: '3',
    name: 'Regional Hospital',
     image: require('../../assets/images/reginol.jpg'),
    address: '789 Pine Rd, Metropolis',
    hours: '24/7 Emergency Services',
    vaccines: ['All available vaccines'],
    contact: '(555) 456-7890'
  },
];
 const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <TouchableOpacity style={styles.detailsButton}
              onPress={() => navigation.navigate('VaccinationCenterDetails', {
  center: { 
    name: item.name,
    image: item.image,
    address: item.address,
    hours: item.hours,       
    vaccines: item.vaccines, 
    contact: item.contact    ,
      galleryImages: [
      require('../../assets/images/facility1.png'),
     require('../../assets/images/facility2.png'),
     require('../../assets/images/facility3.png'),
      
    ]
  },
})}
              >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );

  return (
   <View style={styles.container}>
         <View style={styles.header}>
           <TouchableOpacity
             style={styles.button}
             onPress={() => navigation.navigate('Home')}
           >
             <Ionicons name="chevron-back" size={24} color="#fff" />
           </TouchableOpacity>
           <Text style={styles.vac}>Vaccination Center</Text>
         </View>
    <View style={styles.searchContainer}>
      <Ionicons 
        name="location-sharp" 
        size={20} 
        color="#666" 
        style={styles.searchIcon} 
      />
      <TextInput
        style={styles.input}
        placeholder="Search location"
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
      />
      {searchText.length > 0 && (
        <TouchableOpacity 
          onPress={() => setSearchText('')}
          style={styles.clearButton}
        >
          <Ionicons name="close-circle" size={20} color="#999" />
        </TouchableOpacity>
      )}
    </View>
    <FlatList
        data={vaccinationCenters}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    width: '100%',
    height: 70,
    backgroundColor: '#3E3E70',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  vac: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Quicksand-Bold',
    color: '#fff',
    marginLeft: 70,
  },
  button: {
    padding: 0,
  },
searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 5,
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#FF6D42',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VaccineTypes;
