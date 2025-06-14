import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VaccinationSchedule = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vaccination Schedule</Text>
      </View>
      
      <View style={styles.circlesContainer}>
        <View style={styles.circleWithLabel}>
          <View style={styles.circle}>
            <Text style={styles.circletxt}>1</Text>
          </View>
          <Text style={styles.circleLabel}>Data Diri</Text>
        </View>
        
        <View style={styles.circleWithLabel}>
          <View style={[styles.circle, styles.inactiveCircle]}>
            <Text style={styles.circletxt}>2</Text>
          </View>
          <Text style={[styles.circleLabel, styles.inactiveLabel]}>Data Vaksin</Text>
        </View>
        
        <View style={styles.circleWithLabel}>
          <View style={[styles.circle, styles.inactiveCircle]}>
            <Text style={styles.circletxt}>3</Text>
          </View>
          <Text style={[styles.circleLabel, styles.inactiveLabel]}>QR Scan</Text>
        </View>
      </View>
      
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}> Personal Data </Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama lengkap"
              placeholderTextColor="#999"
              value="Fajar Firmansyah"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>id</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan NIK"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value="0038101920012"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>city / date</Text>
            <View style={styles.rowInput}>
              <TextInput
                style={[styles.input, {flex: 1, marginRight: 10}]}
                placeholder="Tempat lahir"
                placeholderTextColor="#999"
                value="Bogor"
              />
              <TextInput
                style={[styles.input, {flex: 1}]}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#999"
                value="01 Juli 2003"
              />
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Adress</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Masukkan alamat lengkap"
              placeholderTextColor="#999"
              multiline
              value="Kp. Cijabe RT 01 / RW 02"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>phone </Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nomor handphone"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value="08888500045"
            />
          </View>
          
         
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#3E3E70',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  circlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  circleWithLabel: {
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: '#FF6D42',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  inactiveCircle: {
    backgroundColor: '#CCCCCC',
  },
  circletxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  circleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6D42',
    textAlign: 'center',
  },
  inactiveLabel: {
    color: '#999999',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  rowInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextButton: {
    backgroundColor: '#3E3E70',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VaccinationSchedule;