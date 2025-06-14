import axios from 'axios';

export type Question = {
  category: string;
  incorrect_answers: string[];
  correct_answer: string;
  difficulty: string;
  question: string;
  type: string;
  answers: string[];
};

export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const getquestions = async (): Promise<Question[]> => {
  const endpoint = 'https://opentdb.com/api.php?amount=10&category=9';
  const res = await axios.get(endpoint);
  return res.data.results.map((question: any) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
  }));
};
