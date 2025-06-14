import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';

interface Props {
  answer: string;
  onpress: () => void;
  correct: boolean;
  disabled: boolean;
}

const Buttons: FC<Props> = ({ answer, onpress, correct, disabled }) => (
  <SafeAreaView>
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? 'silver' : 'skyblue' }]}
      onPress={onpress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: correct ? 'brown' : 'black' }]}>{answer}</Text>
    </TouchableOpacity>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  button: {
    width: '80%',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 38,
    marginTop: 10,
  },
  text: {
    fontSize: 17,
    marginLeft: 8,
  },
});

export default Buttons;
