import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({ navigation }) => {
  // Dummy state for settings toggles
  const [settings, setSettings] = React.useState({
    notifications: true,
    darkMode: false,
    wifiOnly: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#e75480" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
     
<View style={{ width: 24 }} />
      </View>

      {/* Account Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <SettingItem 
          icon="person-outline" 
          title="Edit Profile" 
          onPress={() => console.log('Edit Profile')} 
        />
        <SettingItem 
          icon="lock-closed-outline" 
          title="Change Password" 
          onPress={() => console.log('Change Password')} 
        />
        <SettingItem 
          icon="mail-outline" 
          title="Email Preferences" 
          onPress={() => console.log('Email Preferences')} 
        />
      </View>

      {/* App Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <SettingToggle 
          icon="notifications-outline" 
          title="Notifications" 
          value={settings.notifications} 
          onToggle={() => toggleSetting('notifications')} 
        />
        <SettingToggle 
          icon="moon-outline" 
          title="Dark Mode" 
          value={settings.darkMode} 
          onToggle={() => toggleSetting('darkMode')} 
        />
        <SettingToggle 
          icon="wifi-outline" 
          title="Wi-Fi Only Downloads" 
          value={settings.wifiOnly} 
          onToggle={() => toggleSetting('wifiOnly')} 
        />
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <SettingItem 
          icon="help-circle-outline" 
          title="Help Center" 
          onPress={() => console.log('Help Center')} 
        />
        <SettingItem 
          icon="document-text-outline" 
          title="Terms & Conditions" 
          onPress={() => console.log('Terms')} 
        />
        <SettingItem 
          icon="shield-checkmark-outline" 
          title="Privacy Policy" 
          onPress={() => console.log('Privacy')} 
        />
      </View>

      {/* Print Button */}
      <TouchableOpacity 
        style={styles.printButton}
        onPress={() => console.log('Print settings')}
      >
        <Text style={styles.printButtonText}>Print Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const SettingItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#e75480" style={styles.settingIcon} />
    <Text style={styles.settingText}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

const SettingToggle = ({ icon, title, value, onToggle }) => (
  <View style={styles.settingItem}>
    <Ionicons name={icon} size={22} color="#e75480" style={styles.settingIcon} />
    <Text style={styles.settingText}>{title}</Text>
    <Switch
      trackColor={{ false: "#767577", true: "#e75480" }}
      thumbColor={value ? "#fff" : "#f4f3f4"}
      onValueChange={onToggle}
      value={value}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  settingIcon: {
    marginRight: 15,
    width: 24,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  printButton: {
    backgroundColor: '#e75480',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  printButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen;