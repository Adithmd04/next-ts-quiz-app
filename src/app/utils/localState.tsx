import { makeVar } from "@apollo/client";
import { BTN_NEXT, FALSE } from "../components/constants";

export const makeSubmitVar = makeVar(FALSE);
export const timeLeftVar = makeVar<number>(7);
export const buttonTextVar = makeVar<string>(BTN_NEXT);
export const currentQuestionVar = makeVar(0);

export const statusVar = makeVar(FALSE);
