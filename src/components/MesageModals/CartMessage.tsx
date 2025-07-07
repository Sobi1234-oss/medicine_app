import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface MessageModalProps {
  visible: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  onViewCart: () => void;
}

const CartMessage: React.FC<MessageModalProps> = ({
  visible,
  type,
  message,
  onClose,
  onViewCart,
}) => {
  const isSuccess = type === 'success';

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <MaterialIcons name="close" size={22} color={isSuccess ? '#4CAF50' : '#f44336'} />
          </TouchableOpacity>

          <MaterialIcons
            name={isSuccess ? 'check-circle-outline' : 'error-outline'}
            size={60}
            color={isSuccess ? '#4CAF50' : '#f44336'}
            style={{ marginBottom: 10 }}
          />

          <Text style={styles.message}>{message}</Text>

          {/* ✅ Replaced with Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
              <Text style={styles.buttonText}>Continue Shopping</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={onViewCart}>
              <Text style={styles.buttonText}>Go to Cart</Text>
            </TouchableOpacity>
          </View>
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
    color: '#333',
    marginVertical: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: 'green',
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: 'center',height:30
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#dc143c',
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',height:30,padding:5
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default CartMessage;
