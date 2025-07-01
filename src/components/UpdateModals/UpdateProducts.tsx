import React, { useState, useEffect } from 'react';
import { View, Text, Modal,TextInput,TouchableOpacity,StyleSheet,Image,ActivityIndicator,Platform,KeyboardAvoidingView, ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
// Types for Category & Product
interface Category {
  id: number;
  name: string;
}
interface Product {
  id: number;
  title: string;
  price: number;
  category_id: number;
  description: string;
  image_url?: string;
}
interface Props {
  visible: boolean;
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onUpdate: (
    productId: number,
    formData: {
      title: string;
      price: string;
      category_id: string;
      description: string;
      image: any;
    },
    imageFile: any
  ) => Promise<void>;
  selectImage: (
    setImageUri: (uri: string | null) => void,
    setFormData: React.Dispatch<React.SetStateAction<any>>
  ) => Promise<void>;
}
const UpdateProducts: React.FC<Props> = ({
  visible,
  product,
  categories,
  onClose,
  onUpdate,
  selectImage,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category_id: '',
    description: '',
    image: null as any,
  });
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price?.toString() || '',
        category_id: product.category_id?.toString() || '',
        description: product.description || '',
        image: null,
      });
      setImageUri(product.image_url || null);
    }
  }, [product]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectImage = async () => {
    await selectImage(setImageUri, setFormData);
  };

  const handleSubmit = async () => {
    if (!product) return;
    setIsLoading(true);
    try {
      await onUpdate(product.id, formData, imageUri ? formData.image : null);
      onClose();
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoiding}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <Icon name="close" size={28} color="#333" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Update Product</Text>

              <Text style={styles.label}>Product Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Product Title"
                placeholderTextColor="#999"
                value={formData.title}
                onChangeText={(text) => handleChange('title', text)}
              />

              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                placeholder="Price"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={formData.price}
                onChangeText={(text) => handleChange('price', text)}
              />

              <Text style={styles.label}>Category</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.category_id}
                  onValueChange={(value) => handleChange('category_id', value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Category" value="" />
                  {categories?.map((category) => (
                    <Picker.Item
                      key={category.id}
                      label={category.name}
                      value={category.id.toString()}
                    />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(text) => handleChange('description', text)}
              />

              {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              )}

              <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
                <Text style={styles.imageButtonText}>
                  {imageUri ? 'Change Image' : 'Select Image'}
                </Text>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.buttonText}>Update</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoiding: {
    width: '100%',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxHeight: '90%',
    position: 'relative',
    elevation: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#483d8b',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    color: 'black',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'black',
  },
  imagePreview: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 15,
    borderRadius: 8,
  },
  imageButton: {
    backgroundColor: '#4169e1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#e75480',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default UpdateProducts;
