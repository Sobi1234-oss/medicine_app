// screens/Add products/AddProduct.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { storeProduct, fetchCategories } from '../../apis/api';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import Header from '../../components/Header/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MessageModal from '../../components/MesageModals/MessageModal'; // ✅ adjust path if needed

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

interface Category {
  id: number;
  name: string;
}

interface FormState {
  name: string;
  price: string;
  categoryId: number | null;
  description: string;
  image: string | null;
}

const AddProduct: React.FC<Props> = ({ navigation }) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    price: '',
    categoryId: null,
    description: '',
    image: null,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  const [modalVisible, setModalVisible] = useState(false);
const [modalType, setModalType] = useState<'success' | 'error'>('success');
const [modalMessage, setModalMessage] = useState('');
const mutation = useMutation({
  mutationFn: (formData: FormData) => storeProduct(formData),
  onSuccess: () => {
    setModalType('success');
    setModalMessage('Product created successfully');
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.goBack();
    }, 2000);
  },
  onError: (error: any) => {
    setModalType('error');
    setModalMessage(error?.response?.data?.message || 'Failed to create product');
    setModalVisible(true);
  },
});

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: Platform.OS === 'android',
      },
      (response) => {
        if (!response.didCancel && !response.errorCode && response.assets?.[0]?.uri) {
          const selected: Asset = response.assets[0];
          setForm((prev) => ({ ...prev, image: selected.uri || null }));
        }
      }
    );
  };

  const handleSubmit = () => {
    if (mutation.isLoading) return;

    const { name, price, categoryId, description, image } = form;

   if (!name || !price || categoryId === null || !image) {
  setModalType('error');
  setModalMessage('Please fill all required fields');
  setModalVisible(true);
  return;
}

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category_id', categoryId.toString());
    formData.append('description', description || '');
    formData.append('img_path', {
      uri: image,
      type: 'image/jpeg',
      name: `product_${Date.now()}.jpg`,
    } as any); // Image object for RN

    mutation.mutate(formData);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Add Product" showBack={true} navigation={navigation} />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={styles.label}>Product Title *</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Price *</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={form.price}
            onChangeText={(text) => setForm((prev) => ({ ...prev, price: text }))}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Category *</Text>
          {categories.length > 0 && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={form.categoryId}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, categoryId: value }))
                }
                style={styles.picker}
                dropdownIconColor="#333"
                mode="dropdown"
              >
                <Picker.Item label="Select a category" value={null} />
                {categories.map((category) => (
                  <Picker.Item
                    key={category.id}
                    label={category.name}
                    value={category.id}
                  />
                ))}
              </Picker>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={form.description}
            onChangeText={(text) => setForm((prev) => ({ ...prev, description: text }))}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Product Image *</Text>
          <TouchableOpacity
            style={[styles.imageButton, styles.imageButtonContent]}
            onPress={selectImage}
            activeOpacity={0.7}
          >
            <Ionicons name="image-outline" size={20} color="#FFF" style={styles.icon} />
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity>

          {form.image && (
            <Image
              source={{ uri: form.image }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            mutation.isLoading && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={mutation.isLoading}
          activeOpacity={0.7}
        >
          {mutation.isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Add Product</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <MessageModal
  visible={modalVisible}
  type={modalType}
  message={modalMessage}
  onClose={() => setModalVisible(false)}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#333',
  },
  imageButton: {
    backgroundColor: '#e75480',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#e75480',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddProduct;
