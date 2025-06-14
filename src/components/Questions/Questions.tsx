import React, { FC } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';

interface Props {
  QuestionNo: number;
  Question: string;
}

const Questions: FC<Props> = ({ QuestionNo, Question }) => (
  <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.questionText}>
        {QuestionNo}. <Text style={styles.question}>{Question}</Text>
      </Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  questionText: {
    padding: 15,
    fontSize: 16,
    color: 'blue',
  },
  question: {
    color: 'black',
  },
});

export default Questions;
