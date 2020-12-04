export interface OpenTDBResponse<T = any> {
  response_code: number;
  results?: T;
}

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}
