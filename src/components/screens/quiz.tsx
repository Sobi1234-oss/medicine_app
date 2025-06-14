import React, { FC, useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator,
} from 'react-native';
import { getquestions, Question } from '../../utils/api';
import Questions from '../../components/Questions/Questions';
import Answers from '../../components/Answers/Answer';
import CustomTextInput from '../Textinput/Textinput';
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctanswer: string;
};

const quiz: FC = () => {
  const [loader, setLoader] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const setCorrectAnswer = useRef<string | null>(null);
const [cityname,setcityname]=useState('')
  useEffect(() => {
    const fetchQuestions = async () => {
      const newQuestions = await getquestions();
      setQuestions(newQuestions);
      setLoader(false);
    };
    fetchQuestions();
  }, []);

  const checkAnswer = () => {
    if (!gameOver && setCorrectAnswer.current) {
      const selectedAnswer = setCorrectAnswer.current;
      const correct = questions[number].correct_answer === selectedAnswer;

      if (correct) setScore(prev => prev + 1);

      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer: selectedAnswer,
        correct,
        correctanswer: questions[number].correct_answer,
      };

      setUserAnswers(prev => [...prev, answerObject]);
      setTimeout(() => nextQuestion(), 1000);
    }
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === questions.length) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!loader ? (
        <View>
          <View style={styles.container}>
            <Text style={styles.text}>Questions</Text>
            <Text style={styles.text}>
              {number + 1}/{questions.length}
            </Text>
          </View>

          <Text style={[styles.text, { marginLeft: 20 }]}>Score: {score}</Text>

          {questions.length > 0 && !gameOver && (
            <>
              <Questions QuestionNo={number + 1} Question={questions[number].question} />
              <Answers
                Answers={questions[number].answers}
                setcorrectanser={setCorrectAnswer}
                checkanswer={checkAnswer}
                useranser={userAnswers ? userAnswers[number] : undefined}
              />
            </>
          )}

          {gameOver && (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={styles.text}>Game Over! Final Score: {score}</Text>
            </View>
          )}
        </View>
      ) : (
        <ActivityIndicator style={{ marginTop: 100 }} size="large" color="black" />
      )}
       <View>
        <CustomTextInput
          placeholder="Enter your name"
          value={cityname}
          onChangeText={(text) => setcityname(text)}
          keyboardType="default"
          maxLength={50}
          disabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',color:'black'
  },
});

export default quiz;
