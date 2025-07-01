
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { storeCategory } from '../../apis/api';
import Header from '../../components/Header/Header';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import MessageModal from '../../components/MesageModals/MessageModal';

// Optional: Type for navigation (you can define RootStackParamList globally)
interface AddCategoriesProps {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}

const AddCategories: React.FC<AddCategoriesProps> = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
const [modalType, setModalType] = useState<'success' | 'error'>('success');
const [modalMessage, setModalMessage] = useState('');
 const mutation = useMutation({
  mutationFn: storeCategory,
  onMutate: () => {
    setIsSubmitting(true);
    Keyboard.dismiss();
  },
  onSuccess: () => {
    setIsSubmitting(false);
    setModalType('success');
    setModalMessage('Category created successfully');
    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      navigation.goBack();
    }, 2000);
  },
  onError: (error: any) => {
    setIsSubmitting(false);
    setModalType('error');
    setModalMessage(error?.response?.data?.message || 'Failed to create category');
    setModalVisible(true);
  },
});

  const handleSubmit = () => {
    if (isSubmitting) return;

   if (!form.name.trim()) {
  setModalType('error');
  setModalMessage('Name is required');
  setModalVisible(true);
  return;
}

    mutation.mutate(form);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Header title="Add Category" showBack={true} navigation={navigation} />
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              placeholder="Enter category name"
              style={styles.input}
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Enter description"
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.7}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Create Category</Text>
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
    </TouchableWithoutFeedback>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  submitButton: {
    backgroundColor: '#e75480',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#e75480aa',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddCategories;
