import React from 'react';
import {
  View, Text,StyleSheet,Image,TouchableOpacity,TextInput,FlatList,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const vaccineData = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
    title: 'Moderna',
    price: '$22',
    image: require('../../assets/images/v2.jpg'), // Ensure this path is correct
    manufacturer: 'Moderna Inc.',
    description:
      'Moderna is a trusted mRNA COVID-19 vaccine that offers strong protection. It is commonly used for both initial vaccination and booster shots. Given in two doses, it prepares your immune system to fight the virus. Side effects are typically mild and temporary. Moderna is FDA-approved and globally recognized.',
    effectiveness: '94.5%',
    availableCountries: ['USA', 'UK', 'Australia', 'Israel'],
  },
];

const Home = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.circleBackground}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={styles.text}>
            <Text style={styles.hii}>hii{'\n'}</Text>
            <Text style={styles.name}>fajar khan</Text>
          </Text>

          <TouchableOpacity style={styles.circleBackund}>
            <Image
              source={require('../../assets/images/bell.png')}
              style={styles.bellimage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons
            name="location-sharp"
            size={20}
            color="orange"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.locationText}>Bogor, Jawa Barat</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>

        <TouchableOpacity style={styles.filterContainer}>
          <Ionicons name="filter" size={20} color="white" />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.textInfo}>
            Dapatkan vaksin anda{'\n'} secara gratis
          </Text>

          <TouchableOpacity style={styles.circleBackgroun}>
            <Image
              source={require('../../assets/images/image.png')}
              style={styles.cartoonimg}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.btntxt}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Vaccines</Text>
           <TouchableOpacity onPress={() => navigation.navigate('Vaccines')}>
         <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
        </View>

        <FlatList
          data={vaccineData}
          horizontal
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
         renderItem={({ item }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      navigation.navigate('Details', {
        item: {
          name: item.title,
          price: item.price,
          description: item.description,
          image: item.image,
          manufacturer: item.manufacturer,
          effectiveness: item.effectiveness,
          availableCountries: item.availableCountries,
        },
      })
    }
  >
    <Image source={item.image} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{item.title}</Text>
    <Text style={styles.cardPrice}>{item.price}</Text>
    <TouchableOpacity 
      style={styles.details}
      onPress={() =>
        navigation.navigate('Details', {
          item: {
            name: item.title,
            price: item.price,
            description: item.description,
            image: item.image,
            manufacturer: item.manufacturer,
            effectiveness: item.effectiveness,
            availableCountries: item.availableCountries,
          },
        })
      }
    >
      <Text style={styles.detailstxt}>Details</Text>
    </TouchableOpacity>
  </TouchableOpacity>
          )}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Vaccines</Text>
         <TouchableOpacity onPress={() => navigation.navigate('Vaccines')}>
         <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
        </View>

        <FlatList
          data={vaccineData}
          horizontal
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      navigation.navigate('Details', {
        item: {
          name: item.title,
          price: item.price,
          description: item.description,
          image: item.image,
          manufacturer: item.manufacturer,
          effectiveness: item.effectiveness,
          availableCountries: item.availableCountries,
        },
      })
    }
  >
    <Image source={item.image} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{item.title}</Text>
    <Text style={styles.cardPrice}>{item.price}</Text>
    <TouchableOpacity 
      style={styles.details}
      onPress={() =>
        navigation.navigate('Details', {
          item: {
            name: item.title,
            price: item.price,
            description: item.description,
            image: item.image,
            manufacturer: item.manufacturer,
            effectiveness: item.effectiveness,
            availableCountries: item.availableCountries,
          },
        })
      }
    >
      <Text style={styles.detailstxt}>Details</Text>
    </TouchableOpacity>
  </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    padding: 5,
  },
  header: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    elevation: 5,
  },
  circleBackground: {
    width: 60,
    height: 60,
    backgroundColor: 'silver',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  bellimage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  hii: {
    fontSize: 16,
    color: '#333',
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
  },
  locationText: {
    color: 'orange',
    fontSize: 18,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '75%',
    height: 55,
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    elevation: 5,
    right: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'gray',
  },
  filterContainer: {
    position: 'absolute',
    right: 15,
    top: 150,
    width: 55,
    height: 56,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  textContainer: {
    marginTop: 40,
    backgroundColor: '#3E3E70',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    elevation: 5,
  },
  textInfo: {
    fontSize: 24,
    color: 'white',
    top: 30,
    right: 40,
  },
  cartoonimg: {
    width: 120,
    height: 120,
    marginLeft: 150,
    top: -5,
  },
  btn: {
    backgroundColor: '#FF6D42',
    width: 125,
    height: 50,
    right: 90,
    justifyContent: 'center',
    alignItems: 'center',
    top: -30,
    borderRadius: 10,elevation:5
  },
  btntxt: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  
 sectionHeader: {
    marginTop: 30,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end', 
    paddingBottom: 1, 
    borderBottomWidth: 1, 
    borderBottomColor: '#778899',
    marginBottom: 15,
},
sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 8, 
   
   
},
seeAll: {
    fontSize: 14,
    color: 'orange',
    fontWeight: '600', // Slightly bolder
    paddingBottom: 8, // Align with title
},
  flatListContainer: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    width: 150,
    marginRight: 15,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
    top: 5,
  
  },
  cardImage: {
    width: 130,
    height: 130,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
    color: 'black',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: 'green',
    marginBottom: 8,
  },
  details: {
    backgroundColor: '#FF6D42',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,width:100,textAlign:'center',elevation:3
  },
  detailstxt: {
    color: 'white',
    fontWeight: '600',textAlign:'center'
  },
});

export default Home;
