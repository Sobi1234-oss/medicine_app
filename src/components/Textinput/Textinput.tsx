

import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

type InputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  maxLength?: number;
  disabled?: boolean;
};

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength = 100,
  disabled = false,
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={!disabled}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
