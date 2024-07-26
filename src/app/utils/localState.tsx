import { makeVar } from "@apollo/client";
import { BTN_NEXT, FALSE, TIME } from "../components/constants";
import { QuizItem } from "./types";

export const makeSubmitVar = makeVar(FALSE);
export const timeLeftVar = makeVar<number>(TIME);
export const buttonTextVar = makeVar<string>(BTN_NEXT);
export const currentQuestionVar = makeVar(0);

export const quizApiDataVar = makeVar<QuizItem[]>([]);