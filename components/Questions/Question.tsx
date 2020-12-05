import React, { ReactElement, useMemo, useState } from "react";
import clsx from "clsx";
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";

import { Question } from "../../types/OpenTriviaDB";
import Markdown from "../Markdown";
import useStyles from "../../assets/jss/components/layout";

interface QuestionProps {
  question: Question;
}

function Questions(props: QuestionProps): ReactElement {
  const [answer, setAnswer] = useState<string>();

  const {
    category,
    correct_answer,
    difficulty,
    incorrect_answers,
    question,
    type,
  }: Question = props.question;

  const answers: string[] = useMemo(() => {
    const array = [...incorrect_answers, correct_answer];
    var currentIndex = array.length,
      temporaryValue: string,
      randomIndex: number;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }, [correct_answer, incorrect_answers]);

  const handleAnswered = (answer: string) => () => {
    setAnswer(answer);
  };

  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography variant="h3">
          <Markdown source={question} escapeHtml={true} />
        </Typography>
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <Typography variant="subtitle1">{category}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{difficulty}</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={2}>
          {answers.map((a: string, index: number) => (
            <Grid key={index} item>
              <Button
                className={clsx(
                  answer
                    ? a === correct_answer
                      ? classes.success
                      : incorrect_answers.includes(a) && answer === a
                      ? classes.error
                      : classes.primary
                    : classes.primary
                )}
                color="primary"
                disabled={answer ? true : false}
                variant="contained"
                onClick={handleAnswered(a)}>
                {a}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Questions;
