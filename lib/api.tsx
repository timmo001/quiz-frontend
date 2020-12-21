import axios, { AxiosResponse } from "axios";

import {
  Category,
  OpenTDBCategoryResponse,
  OpenTDBResponse,
  Question,
} from "../types/OpenTriviaDB";

const baseURL = "https://opentdb.com";

export async function getCategories(): Promise<Category[]> {
  const response: AxiosResponse<
    OpenTDBCategoryResponse<Category[]>
  > = await axios.get("/api_category.php", {
    baseURL,
  });
  if (
    response.status === 200 &&
    response.data &&
    response.data.trivia_categories
  ) {
    if (process.env.NODE_ENV === "development")
      console.log("response:", response.data);
    return response.data.trivia_categories;
  }
  throw new Error(
    response.status === 200 ? "No data" : response.status.toString()
  );
}

export async function getQuestions(
  amount: number,
  category?: string,
  difficulty?: string,
  type?: string
): Promise<Question[]> {
  const response: AxiosResponse<OpenTDBResponse<Question[]>> = await axios.get(
    "/api.php",
    {
      baseURL,
      params: { amount, category, difficulty, type },
    }
  );
  if (response.status === 200 && response.data && response.data.results) {
    if (process.env.NODE_ENV === "development")
      console.log("response:", response.data);
    return response.data.results;
  }
  throw new Error(
    response.status === 200 ? "No data" : response.status.toString()
  );
}
