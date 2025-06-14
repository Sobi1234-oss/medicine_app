
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTextInput from './Textinput/Textinput';

const Components = () => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
        keyboardType="default"
        maxLength={50}
        disabled={false}
      />
    </View>
  );
};

export default Components;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
