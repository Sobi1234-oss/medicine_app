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
import { loginUser } from '../../apis/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../screens/UserContext/UserContext'; // Import your user context
import { AuthContext } from '../../screens/Authentications/AuthContext';
const Login = ({ navigation }: { navigation: any }) => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [modalStatus, setModalStatus] = useState<'success' | 'error' | null>(null);
    const [modalMessage, setModalMessage] = useState('');
    const { setUser } = useUser();
    const { setUser: setAuthUser } = React.useContext(AuthContext);

    // Add this function to handle input changes
    const handleInputChange = (field: string, value: string) => {
        setForm({
            ...form,
            [field]: value
        });
        // Clear error when user types
        if (errors[field as keyof typeof errors]) {
            setErrors({
                ...errors,
                [field]: ''
            });
        }
    };

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            const userData = {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                phone: data.user.phone || '+1 234 567 890',
                gender: data.user.gender || 'Male',
                avatar: data.user.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
                role: data.user.role || 'user'
            };

            setUser(userData);       // sets UserContext
            setAuthUser(userData);   // sets AuthContext ✅ triggers navigation

            setModalStatus('success');
            setModalMessage('Login successful!');
            setShowModal(true);
            setForm({ email: '', password: '' });
            Keyboard.dismiss();

            // No need for manual navigation!
            setTimeout(() => {
                setShowModal(false);
            }, 1000);
        },
        onError: (error) => {
            console.error('Detailed login error:', {
                message: error.message,
                response: error.response?.data,
                stack: error.stack,
            });
            const errorMessage = error?.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Login failed. Please try again.';
            setModalStatus('error');
            setModalMessage(errorMessage);
            setShowModal(true);
        },
    });

    const handleSubmit = () => {
        // Reset errors
        setErrors({
            email: '',
            password: ''
        });

        // Validate form
        let isValid = true;
        const newErrors = {
            email: '',
            password: ''
        };

        if (!form.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!form.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            setModalStatus('error');
            setModalMessage('Please fix the errors in the form');
            setShowModal(true);
            return;
        }

        mutation.mutate(form);
    };

    const isFormValid = form.email && form.password;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.innerContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.heading}>Login</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        value={form.email}
                        placeholder="Email address"
                        keyboardType="email-address"
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
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => handleInputChange('password', text)}
                    />
                    {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                </View>

                <TouchableOpacity
                    style={[styles.button, (!isFormValid || mutation.isLoading) && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={!isFormValid || mutation.isLoading}
                    activeOpacity={0.7}
                >
                    {mutation.isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.signupLink}
                >
                    <Text style={styles.footerText}>
                        Don't have an account?{' '}
                        <Text style={styles.signupText}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>

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
                                <Text style={[styles.modalText, styles.successText]}>{modalMessage}</Text>
                            </>
                        ) : (
                            <>
                                <Ionicons name="close-circle" size={60} color="#F44336" />
                                <Text style={[styles.modalText, styles.errorText]}>{modalMessage}</Text>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => setShowModal(false)}
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

export default Login;

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
    footerText: {
        color: '#666',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
    },
    signupText: {
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