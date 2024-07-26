export type QuizItem = {
  question: string;
  answers: { [key: string]: string };
  correct_answers: { [key: string]: string };
};
