export interface OpenTDBResponse<T = any> {
  response_code: number;
  results?: T;
}

export interface OpenTDBCategoryResponse<T = any> {
  trivia_categories?: T;
}

export interface Category {
  id: string;
  name: string;
}

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}
