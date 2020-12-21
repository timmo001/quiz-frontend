import React, { Fragment, ReactElement, useEffect, useState } from "react";

import { getQuestions } from "../../lib/api";
import { AnsweredQuestion } from "../../types/AnsweredQuestion";
import { Question } from "../../types/OpenTriviaDB";
import Countdown from "../Countdown";
import Loading from "../Loading";
import Q from "./Question";

interface QuestionsProps {
  amount: number;
  category?: string;
  difficulty?: string;
  type?: string;
}

function Questions({
  amount,
  category,
  difficulty,
  type,
}: QuestionsProps): ReactElement {
  const [answeredQuestions, setAnsweredQuestions] = useState<
    AnsweredQuestion[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>();

  async function fetchQuestions(): Promise<void> {
    setQuestions(await getQuestions(amount, category, difficulty, type));
    setAnsweredQuestions([]);
    setCurrentQuestionIndex(0);
  }

  function handleAnswered(answeredQuestion: AnsweredQuestion) {
    answeredQuestions.push(answeredQuestion);
    // setAnsweredQuestions(aq);
    setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 5000);
  }

  useEffect(() => {
    if (!questions) fetchQuestions();
  }, [questions, getQuestions]);

  return (
    <Fragment>
      {!questions ? (
        <Loading text="Loading Questions.." />
      ) : (
        <Q
          question={questions[currentQuestionIndex]}
          handleAnswered={handleAnswered}
        />
      )}
    </Fragment>
  );
}

export default Questions;
