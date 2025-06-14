import React, { FC } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';

interface Header {
  title: string;
}

const HeaderClass: FC<Header> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="red" barStyle="light-content" />
      <Text style={styles.textstyle}>{props.title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    padding: 10,
  },
  textstyle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black', // 👈 This makes text black
  },
});

export default HeaderClass;
