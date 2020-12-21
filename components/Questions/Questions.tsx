import { Card, CardContent, Typography } from "@material-ui/core";
import React, { Fragment, ReactElement, useEffect, useState } from "react";

import { getQuestions } from "../../lib/api";
import { AnsweredQuestion } from "../../types/AnsweredQuestion";
import { Question } from "../../types/OpenTriviaDB";
import Loading from "../Loading";
import Q from "./Question";

export interface QuestionsProps {
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
    setTimeout(
      () =>
        setCurrentQuestionIndex(
          currentQuestionIndex >= questions.length - 1
            ? -1
            : currentQuestionIndex + 1
        ),
      4000
    );
  }

  useEffect(() => {
    if (!questions) fetchQuestions();
  }, [questions, getQuestions]);

  return (
    <Fragment>
      {!questions ? (
        <Loading text="Loading Questions.." />
      ) : questions.length < 1 ? (
        <Card>
          <CardContent>
            <Typography variant="h4">No Questions Found</Typography>
          </CardContent>
        </Card>
      ) : currentQuestionIndex === -1 ? (
        <Card>
          <CardContent>
            <Typography variant="h4">End card</Typography>
          </CardContent>
        </Card>
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
