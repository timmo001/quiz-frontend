import { Question } from "./OpenTriviaDB";

export interface AnsweredQuestion extends Question {
  answer: string;
}
