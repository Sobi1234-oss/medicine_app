import React, {useState, useEffect} from 'react';
import {View, TextInput, Alert, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'react-native-blob-util';
import {db, initializeDB} from './db';
import FilePickerManager from 'react-native-file-picker';
const Add = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUri: null,
    fileUri: null
  });
  const [isLoading, setIsLoading] = useState(false);
 

 
  useEffect(() => {
    initializeDB();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Error', 'Failed to select image');
      } else if (response.assets?.[0]?.uri) {
        handleInputChange('imageUri', response.assets[0].uri);
      }
    });
  };

 
const selectFile = () => {
  FilePickerManager.showFilePicker(
    { 
      title: 'Select PDF File',
      mimeType: 'application/pdf',
    
      android: {
        enableChooser: true,
        chooserTitle: 'Select PDF File',
  
        localOnly: true,
        showLocalOnly: true
      }
    },
    (response) => {
      if (!response) {
        console.log('No response received');
        return;
      }
      
      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error || response.customException) {
        const errorMsg = response.error || response.customException;
        console.error('File picker error:', errorMsg);
        Alert.alert('Error', 'Failed to select file: ' + errorMsg);
      } else {
        try {
          const fileUri = response.uri || response.path;
          if (fileUri) {
            handleInputChange('fileUri', fileUri);
          } else {
            throw new Error('No file path in response');
          }
        } catch (e) {
          console.error('File processing error:', e);
          Alert.alert('Error', 'Invalid file selection');
        }
      }
    }
  );
};
  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Product name is required');
      return false;
    }
    if (!formData.price.trim() || isNaN(parseFloat(formData.price))) {
      Alert.alert('Error', 'Please enter a valid price');
      return false;
    }
    return true;
  };

  const addProduct = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve, reject) => {
        db.transaction(
          tx => {
            tx.executeSql(
              'INSERT INTO products (name, price, description, imageUri, fileUri) VALUES (?, ?, ?, ?, ?)',
              [
                formData.name.trim(),
                parseFloat(formData.price),
                formData.description.trim(),
                formData.imageUri,
                formData.fileUri
              ],
              (_, results) => {
                if (results.rowsAffected > 0) {
                  resolve();
                } else {
                  reject(new Error('No rows affected'));
                }
              },
              (_, error) => {
                reject(error);
              }
            );
          },
          error => {
            reject(error);
          }
        );
      });

      Alert.alert('Success', 'Product added successfully');
      resetForm();
    } catch (error) {
      console.error('Database Error:', error);
      Alert.alert('Error', 'Failed to add product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      imageUri: null,
      fileUri: null
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product Name"
        placeholderTextColor="#666"
        value={formData.name}
        onChangeText={text => handleInputChange('name', text)}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Price"
        placeholderTextColor="#666"
        value={formData.price}
        onChangeText={text => handleInputChange('price', text)}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Description"
        placeholderTextColor="#666"
        value={formData.description}
        onChangeText={text => handleInputChange('description', text)}
        multiline
        style={[styles.input, styles.descriptionInput]}
      />

      <TouchableOpacity style={styles.fileButton} onPress={selectFile}>
        <Text style={styles.buttonText}>
          {formData.fileUri ? 'Change PDF File' : 'Select PDF File'}
        </Text>
      </TouchableOpacity>

      {formData.fileUri && (
        <Text style={styles.fileInfo}>
          Selected: {formData.fileUri.split('/').pop()}
        </Text>
      )}
      
      <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
        <Text style={styles.buttonText}>
          {formData.imageUri ? 'Change Product Image' : 'Select Product Image'}
        </Text>
      </TouchableOpacity>
      
      {formData.imageUri && (
        <Image source={{uri: formData.imageUri}} style={styles.imagePreview} />
      )}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={addProduct}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Add Product</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => navigation.navigate('Show')}
        >
          <Text style={styles.buttonText}>View Products</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    fontSize: 16,
    color: '#333',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    alignItems: 'center',
  },
  fileButton: {
    backgroundColor: '#e67e22',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  fileInfo: {
    marginBottom: 15,
    color: '#333',
    fontStyle: 'italic',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    padding: 14,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  viewButton: {
    backgroundColor: '#9b59b6',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Add;