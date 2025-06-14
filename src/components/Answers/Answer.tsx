import React, { FC } from 'react';
import Buttons from '../Buttons/Buttons';

interface Props {
  Answers: string[];
  setcorrectanser: React.MutableRefObject<string | null>;
  checkanswer: () => void;
  useranser?: {
  answer: string;
  correct: boolean;
  };
}

const Answer: FC<Props> = ({ Answers, setcorrectanser, checkanswer, useranser }) => {
  const handlePress = (ans: string) => {
    setcorrectanser.current = ans;
    checkanswer();
  };

  return (
    <>
      {Answers.map((ans, index) => (
        <Buttons
          key={index}
          answer={ans}
          correct={useranser?.answer === ans && useranser?.correct}
          onpress={() => handlePress(ans)}
          disabled={!!useranser}
        />
      ))}
    </>
  );
};

export default Answer;
