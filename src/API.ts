import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[]; // Corrected typo
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",  
  HARD = "hard",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionState[] | undefined> => {
  try {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(endpoint);   
    const data = await response.json();
    console.log(28, data);

    if (data.results && data.results.length > 0) {
      return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }));
    } else {
      throw new Error("No results found in the response data.");
    }
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return undefined;
  }
};

