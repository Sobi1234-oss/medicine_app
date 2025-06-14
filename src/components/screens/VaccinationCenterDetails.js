import React from 'react';
import { Linking, View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const VaccinationCenterDetails = ({ route }) => {
  const { center } = route.params;
  const navigation = useNavigation();

  const galleryImages = center.galleryImages || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={center.image} style={styles.detailImage} />
      </View>
     
      <View style={styles.detailContent}>
        <Text style={styles.detailName}>{center.name}</Text>
         
        <View style={styles.detailSection}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${center.address}`
              );
            }}
          >
            <Text style={styles.btntxt}>📍 See Directions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Vaccines</Text>
          <FlatList
            data={center.vaccines}
            renderItem={({ item }) => (
              <View style={styles.vaccineItem}>
                <TouchableOpacity style={styles.btns}>
                  <Text style={styles.vaccineText}>{item}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={true}
            horizontal
            
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.vaccineList}
          />
        </View>

        {galleryImages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Facilit</Text>
            <FlatList
              data={galleryImages}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.galleryItem}>
                  <Image source={item} style={styles.galleryImage} />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              scrollEnabled={false}
              columnWrapperStyle={styles.galleryRow}
            />
          </View>
        )}
        <TouchableOpacity 
          onPress={() => navigation.navigate('VaccinationSchedule')} 
          style={styles.scheduleButton}
          
        >
         <Text style={styles.vaccineTex}>Schedule Vaccination</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    width: '100%',
    height: 255,borderBottomEndRadius:20,
  },
  detailImage: {
    width: '95%',
    height: 250,
    resizeMode: 'cover',
    top: 10,left:10,borderBottomEndRadius:20,borderRadius:20,
  },
  detailContent: {
    padding: 20,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black', left:75,fontFamily:'Quicksand-Bold'
  },
  detailSection: {
    marginBottom: 20,
  },
  btn: { 
    backgroundColor: '#6495ed',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',elevation:5
  },
   scheduleButton: { 
    backgroundColor: '#FF6D42',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',elevation:5,width:300,height:55,left:10,
  
  },
    btns: { 
    backgroundColor: '#FF6D42',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    gap: 10,
  },
  btntxt: {
    color: '#fff',
    fontWeight: 'bold',fontSize:17
  },
  backButton: {
    padding: 5,
    color: 'black',
    position: 'absolute',
    zIndex: 1,
    top: 25,
    left: 20,
    backgroundColor: 'rgba(4, 36, 91, 0.7)',
    borderRadius: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3E3E70',
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
  },
   vaccineList: {
    paddingHorizontal: 10,  
    gap: 12,                
  
  },
  vaccineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',gap:8,elevation:0
  },
  vaccineText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white',fontWeight:'bold'
  },
  vaccineTex: {
    fontSize: 18,
    marginLeft: 10,
    color: 'white',fontWeight:'bold',padding:0
  },
  galleryRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  galleryItem: {
    width: '32%',
    aspectRatio: 1,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
});

export default VaccinationCenterDetails;