import React, { Fragment, ReactElement, useEffect, useState } from "react";

import { getQuestions } from "../../lib/api";
import { Question } from "../../types/OpenTriviaDB";
import Loading from "../Loading";
import Q from "./Question";

function Questions(): ReactElement {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>();

  async function fetchQuestions(): Promise<void> {
    setQuestions(await getQuestions(10));
  }

  useEffect(() => {
    if (!questions) fetchQuestions();
  }, [questions, getQuestions]);

  return (
    <Fragment>
      {!questions ? (
        <Loading text="Loading Questions.." />
      ) : (
        <Q question={questions[currentQuestionIndex]} />
      )}
    </Fragment>
  );
}

export default Questions;
