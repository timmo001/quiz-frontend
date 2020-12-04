import axios, { AxiosResponse } from "axios";

import { OpenTDBResponse, Question } from "../types/OpenTriviaDB";

const baseURL = "https://opentdb.com";

export async function getQuestions(
  amount?: number,
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
  throw new Error(JSON.stringify(response.data));
}
