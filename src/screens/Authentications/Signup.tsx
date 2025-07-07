import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Modal,
  Keyboard,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { storeUser } from '../../apis/api';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignUp = ({ navigation }: { navigation: any }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<'success' | 'error' | null>(null);
  const [modalMessage, setModalMessage] = useState('');

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
    };

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const mutation = useMutation({
    mutationFn: storeUser,
    onSuccess: () => {
      setModalStatus('success');
      setModalMessage('Account created successfully!');
      setShowModal(true);
      setForm({ name: '', email: '', password: '', role: 'user' });
      Keyboard.dismiss();
      
      setTimeout(() => {
        setShowModal(false);
          navigation.replace('Login');
      }, 2000);
    },
    onError: (error: any) => {
      let errorMessage = 'Registration failed. Please try again.';
      
      // Handle validation errors from server
      if (error?.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        errorMessage = Object.values(serverErrors).flat().join('\n');
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setModalStatus('error');
      setModalMessage(errorMessage);
      setShowModal(true);
    },
  });

  const handleInputChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      setModalStatus('error');
      setModalMessage('Please fix the errors in the form');
      setShowModal(true);
      return;
    }

    if (!mutation.isLoading) {
      mutation.mutate(form);
    }
  };

  const isFormValid = form.name && form.email && form.password && !mutation.isLoading;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.innerContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Create Account</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={form.name}
            placeholder="Your name"
            placeholderTextColor="#999"
            onChangeText={(text) => handleInputChange('name', text)}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={form.email}
            placeholder="Email address"
            keyboardType="email-address"
            placeholderTextColor="#999"
            autoCapitalize="none"
            onChangeText={(text) => handleInputChange('email', text)}
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            value={form.password}
            placeholder="Password (min 6 characters)"
            secureTextEntry
            placeholderTextColor="#999"
            onChangeText={(text) => handleInputChange('password', text)}
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        </View>

        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!isFormValid}
          activeOpacity={0.8}
        >
          {mutation.isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.loginText}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Status Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {modalStatus === 'success' ? (
              <>
                <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
                <Text style={[styles.modalText, styles.successText]}>
                  {modalMessage}
                </Text>
              </>
            ) : (
              <>
                <Ionicons name="close-circle" size={60} color="#F44336" />
                <Text style={[styles.modalText, styles.errorText]}>
                  {modalMessage}
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setShowModal(false)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#e75480',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#F44336',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#F44336',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#e75480',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    alignSelf: 'center',
    marginTop: 10,
  },
  footerText: {
    color: '#666',
    fontSize: 15,
  },
  loginText: {
    color: '#e75480',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 24,
  },
  successText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  errorText: {
    color: '#F44336',
    fontWeight: '500',
  },
  modalButton: {
    backgroundColor: '#e75480',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignUp;