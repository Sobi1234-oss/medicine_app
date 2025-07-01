import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  onSearch?: (text: string) => void;
};

type RootStackParamList = {
  Products: undefined;
  // Add other screens as needed
};

const Header: React.FC<HeaderProps> = ({ 
  title = 'Products', 
  showBack = false, 
  onSearch 
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText, onSearch]);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchText('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Section - Back Button */}
      {showBack && (
        <TouchableOpacity 
          onPress={navigation.goBack}
          style={styles.backButton}
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      )}

      {/* Center Section - Title or Search */}
      <View style={styles.centerSection}>
        {showSearch ? (
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
            autoCorrect={false}
            clearButtonMode="while-editing"
            testID="search-input"
          />
        ) : (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      {/* Right Section - Search Toggle */}
      <TouchableOpacity 
        onPress={toggleSearch}
        style={styles.searchButton}
        testID="search-toggle"
      >
        <Ionicons 
          name={showSearch ? 'close' : 'search'} 
          size={24} 
          color="#000" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Add this to center the content
    marginHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center', // Ensure text is centered
    width: '100%', // Take full width of parent
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 16,
    padding: 8,
  },
});

export default Header;