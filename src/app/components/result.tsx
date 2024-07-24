import React from "react";
import questions from "./quizdata";

export default function Result({ ...props }) {
  let count = 0;
  function checkAnswers() {
    for (let i = 0; i < props.selectedOptions.length; i++) {
      if (props.selectedOptions[i] === questions[i].correct_answer) {
        count++;
      }
    }
  }
  checkAnswers();

  function getDecoration() {
    if (count >= 3) {
      return "GOOD JOB!";
    }
    return "Keep Trying!";
  }

  const message = getDecoration();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">
        Result
      </h1>
      <p className="text-xl text-gray-700 text-center">You Corrected</p>
      <p className="text-xl text-gray-700 text-center font-bold">
        {count}/{questions.length}
      </p>
      <p className="text-xl text-gray-700 text-center font-bold">{message}</p>
    </div>
  );
}
