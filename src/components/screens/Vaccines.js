import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const vaccinesData = [
  {
    id: '1',
    title: 'Polio',
    price: 'Free',
    image: require('../../assets/images/polio.png'),
    manufacturer: 'Various (WHO-approved)',
    description:
      'Polio vaccine protects against poliomyelitis, a viral disease that can cause paralysis. It is usually given in multiple doses starting from infancy.',
    effectiveness: '99%',
    availableCountries: ['Pakistan', 'India', 'Nigeria', 'Afghanistan'],
  },
  {
    id: '2',
    title: 'BCG',
    price: 'Free',
    image: require('../../assets/images/bcg.jpg'),
    manufacturer: 'Various (WHO-approved)',
    description:
      'BCG (Bacillus Calmette–Guérin) vaccine is used primarily against tuberculosis (TB). It is usually given at birth or in early childhood.',
    effectiveness: '70%-80%',
    availableCountries: ['India', 'Pakistan', 'Bangladesh', 'Africa'],
  },
  {
    id: '3',
    title: 'Hepatitis B',
    price: '$15',
    image: require('../../assets/images/hepatitis.png'),
    manufacturer: 'GlaxoSmithKline, Merck',
    description:
      'The Hepatitis B vaccine protects against the hepatitis B virus, which can cause chronic liver disease and liver cancer. Given in a series of shots.',
    effectiveness: '95%',
    availableCountries: ['USA', 'India', 'China', 'Pakistan'],
  },
  {
    id: '4',
    title: 'DTP',
    price: '$10',
    image: require('../../assets/images/dtp.jpg'),
    manufacturer: 'Sanofi, GSK',
    description:
      'DTP vaccine protects against three diseases: Diphtheria, Tetanus, and Pertussis (whooping cough). Usually administered in early childhood.',
    effectiveness: '85%-90%',
    availableCountries: ['USA', 'India', 'UK', 'Pakistan'],
  },
  {
    id: '5',
    title: 'MMR',
    price: '$18',
    image: require('../../assets/images/mmr.jpg'),
    manufacturer: 'Merck',
    description:
      'MMR vaccine protects against Measles, Mumps, and Rubella. It is typically given in two doses during childhood.',
    effectiveness: '97%',
    availableCountries: ['USA', 'UK', 'India', 'Pakistan'],
  },
  {
    id: '6',
    title: 'COVID-19',
    price: 'Varies',
    image: require('../../assets/images/v1.jpg'),
    manufacturer: 'Multiple (Pfizer, Moderna, etc.)',
    description:
      'COVID-19 vaccines help protect against the coronavirus that causes COVID-19. Multiple types exist and are administered in one or more doses.',
    effectiveness: 'Varies by type',
    availableCountries: ['Worldwide'],
  },
  {
    id: '7',
    title: 'CovidShield',
    price: '$20',
    image: require('../../assets/images/v1.jpg'),
    manufacturer: 'Serum Institute of India',
    description:
      'CovidShield is a widely used vaccine developed to combat the COVID-19 virus. It helps your body build immunity against severe infections. Administered in two doses, it has shown strong effectiveness. It is safe, reliable, and recommended by health experts worldwide. Minor side effects like fever or soreness may occur.',
    effectiveness: '90%',
    availableCountries: ['India', 'UK', 'Canada', 'Australia'],
  },
  {
    id: '8',
    title: 'Pfizer',
    price: '$25',
    image: require('../../assets/images/v2.jpg'),
    manufacturer: 'Pfizer Inc.',
    description:
      'Pfizer is an mRNA-based vaccine known for its high efficacy rate against COVID-19. It is approved for use in many countries and is recommended for adults and teens. The vaccine is administered in two doses, 3 weeks apart. It may cause temporary side effects like fatigue or chills. Regular boosters are also available.',
    effectiveness: '95%',
    availableCountries: ['USA', 'Canada', 'Germany', 'UK'],
  },
  {
    id: '9',
    title: 'Moderna',
    price: '$22',
    image: require('../../assets/images/v2.jpg'),
    manufacturer: 'Moderna Inc.',
    description:
      'Moderna is a trusted mRNA COVID-19 vaccine that offers strong protection. It is commonly used for both initial vaccination and booster shots. Given in two doses, it prepares your immune system to fight the virus. Side effects are typically mild and temporary. Moderna is FDA-approved and globally recognized.',
    effectiveness: '94.5%',
    availableCountries: ['USA', 'UK', 'Australia', 'Israel'],
  },
];


const Vaccines = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <TouchableOpacity 
        style={styles.detailsBtn}
        onPress={() => navigation.navigate('Details', {
          item: {
            name: item.title,
            price: item.price,
            description: item.description,
            image: item.image,
            manufacturer: item.manufacturer,
            effectiveness: item.effectiveness,
            availableCountries: item.availableCountries,
          },
        })}
      >
        <Text style={styles.detailsText}>Details</Text>
      </TouchableOpacity>
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
        <Text style={styles.vac}>Vaccines</Text>
      </View>

      <FlatList
        data={vaccinesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatList}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
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
    marginLeft: 90,
  },
  button: {
    padding: 5,
  },
  flatList: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 15,
    padding: 15,
    alignItems: 'center',
    width: width * 0.45, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 120,
    marginBottom: 10,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'black',
  },
  price: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 10,
  },
  detailsBtn: {
    marginTop: 5,
    backgroundColor: '#FF6D42',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  detailsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Vaccines;