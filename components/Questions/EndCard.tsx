import React, { Fragment, ReactElement, useMemo } from "react";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";

import { AnsweredQuestion } from "../../types/AnsweredQuestion";
import useStyles from "../../assets/jss/components/layout";
import Markdown from "../Markdown";

interface EndCardProps {
  answers: AnsweredQuestion[];
}

function EndCard({ answers }: EndCardProps): ReactElement {
  const classes = useStyles();

  const correctAnswers = useMemo(
    () =>
      answers.filter((a: AnsweredQuestion) => a.answer === a.correct_answer),
    [answers]
  );

  const incorrectAnswers = useMemo(
    () =>
      answers.filter((a: AnsweredQuestion) => a.answer !== a.correct_answer),
    [answers]
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          End Card
        </Typography>
        <Typography className={classes.splitter} variant="h4" gutterBottom>
          Correct Answers: {correctAnswers.length}/{answers.length}
        </Typography>
        <Divider className={classes.splitter} />
        <Typography variant="h4" gutterBottom>
          Incorrect:
        </Typography>
        {incorrectAnswers.map((a: AnsweredQuestion, index: number) => (
          <Fragment key={index}>
            <Typography variant="h5">
              <Markdown source={a.question} escapeHtml={true} />
            </Typography>
            <Typography variant="body1">
              <Markdown source={`You answered: ${a.answer}`} escapeHtml />
              <Markdown
                source={`Correct answer: ${a.correct_answer}`}
                escapeHtml
              />
            </Typography>
            {index === incorrectAnswers.length - 1 ? "" : <Divider light />}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}

export default EndCard;
