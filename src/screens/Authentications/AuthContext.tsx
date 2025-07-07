// AuthContext.tsx
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  // other user properties
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuthToken: () => Promise<string>;
  setUser: (user: User | null) => void; // ✅ add this
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: 'http://192.168.43.126:8000/api',
    });
    return instance;
  }, []);

  // Enhanced loadAuthData with error handling
  const loadAuthData = useCallback(async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem('authToken'),
        AsyncStorage.getItem('user')
      ]);
      
      if (storedToken && storedUser) {
        console.log('Loaded auth data from storage');
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      } else {
        console.log('No auth data found in storage');
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
      // Clear potentially corrupted data
      await AsyncStorage.multiRemove(['authToken', 'user']);
    } finally {
      setLoading(false);
    }
  }, []);

  // Enhanced login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/login', { email, password });
      
      if (!response.data.token || !response.data.user) {
        throw new Error('Invalid response from server');
      }

      console.log('Login successful, storing tokens...');
      await AsyncStorage.multiSet([
        ['authToken', response.data.token],
        ['user', JSON.stringify(response.data.user)]
      ]);
      
      setToken(response.data.token);
      setUser(response.data.user);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      // Clear any partial auth data
      await AsyncStorage.multiRemove(['authToken', 'user']);
      setToken(null);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Enhanced logout function
  const logout = async () => {
    try {
      console.log('Logging out...');
      await AsyncStorage.multiRemove(['authToken', 'user']);
      setToken(null);
      setUser(null);
      delete axiosInstance.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Implement refresh token function
  const refreshAuthToken = async () => {
    try {
      const response = await axiosInstance.post('/refresh');
      const newToken = response.data.token;
      await AsyncStorage.setItem('authToken', newToken);
      setToken(newToken);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      await logout();
      throw error;
    }
  };

  useEffect(() => {
    console.log('AuthProvider mounting, loading auth data...');
    loadAuthData();
  }, [loadAuthData]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        register: async () => {}, // implement register
        refreshAuthToken,
        setUser, // ✅ expose this
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };