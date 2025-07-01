import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface MessageModalProps {
  visible: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ visible, type, message, onClose }) => {
  const isSuccess = type === 'success';

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <MaterialIcons name="close" size={24} color={isSuccess ? '#4CAF50' : '#f44336'} />
          </TouchableOpacity>

          <MaterialIcons
            name={isSuccess ? 'check-circle-outline' : 'error-outline'}
            size={60}
            color={isSuccess ? '#4CAF50' : '#f44336'}
            style={{ marginBottom: 10 }}
          />

          <Text style={[styles.message, { color: isSuccess ? '#4CAF50' : '#f44336' }]}>
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default MessageModal;
