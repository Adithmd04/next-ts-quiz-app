"use client";
import { useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  buttonTextVar,
  makeSubmitVar,
  quizApiDataVar,
  timeLeftVar,
} from "../utils/localState";
import { TIME, URL } from "./constants";
import Result from "./result";

export default function QuizApiFetching() {
  const apiData = useReactiveVar(quizApiDataVar);
  const nextBtnText = useReactiveVar(buttonTextVar);
  const isSubmit = useReactiveVar(makeSubmitVar);
  const timmerValue = useReactiveVar(timeLeftVar);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(apiData.length).fill("")
  );
  const [result, setResult] = useState<number | null>(null);

  async function fetchQuizData() {
    try {
      const responseData = await fetch(URL);
      const data = await responseData.json();
      quizApiDataVar(data);
    } catch (error) {
      console.error("Failed to fetch quiz data:", error);
    }
  }

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (timmerValue === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      timeLeftVar(timmerValue > 0 ? timmerValue - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, [timmerValue]);

  useEffect(() => {
    timeLeftVar(TIME);
  }, [currentIndex]);

  function handleNextQuestion() {
    if (currentIndex < apiData.length - 1) {
      setCurrentIndex(currentIndex + 1);

      if (currentIndex === apiData.length - 2) {
        buttonTextVar("submit");
      }
    } else {
      handleSubmit();
    }
  }

  function handleSubmit() {
    const calculatedResult = calculateResult();
    setResult(calculatedResult);
    makeSubmitVar(true);
  }

  function handleAnswerChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedValue = e.target.value;
    setSelectedOptions((previousOptions) => {
      const updatedOptions = [...previousOptions];
      updatedOptions[currentIndex] = selectedValue;
      return updatedOptions;
    });
  }

  //-----to get the final result-----
  function calculateResult() {
    let calculatedResult = 0;
    for (const element in selectedOptions) {
      if (
        selectedOptions[element] ===
        getCorrectAnswer(
          apiData[element].answers,
          apiData[element].correct_answers
        )
      ) {
        calculatedResult++;
      }
    }
    return calculatedResult;
  }

  function getCorrectAnswer(answers: any, correct_answers: any) {
    for (const key in correct_answers) {
      if (correct_answers[key] === "true") {
        const answerKey = key.replace("_correct", "");
        return answers[answerKey];
      }
    }
    return null;
  }
  //-------------------------------------------------------------

  const answersArray = Object.values(
    apiData[currentIndex]?.answers ?? {}
  ).filter(Boolean);

  return (
    <div>
      <div className="m-8 w-full flex justify-center">
        <div className="p-5 w-96 h-auto bg-white rounded-lg shadow-md">
          <div className="text-center font-bold text-[40px] mb-4">QUIZ APP</div>
          <div className="text-lg font-semibold mb-4">
            {isSubmit ? (
              <Result result={result} />
            ) : (
              apiData.length > 0 && (
                <>
                  <p>
                    {currentIndex + 1}.{apiData[currentIndex].question}
                  </p>
                  <div className="mt-1">
                    {answersArray.map((answer) => (
                      <label key={answer} className="block cursor-pointer">
                        <input
                          type="radio"
                          name="answer"
                          checked={selectedOptions[currentIndex] === answer}
                          value={answer}
                          className="mr-2"
                          onChange={handleAnswerChange}
                        />
                        {answer}
                      </label>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div
                      className={`text-center text-lg font-semibold ${
                        timmerValue > 5 ? "text-black" : "text-red-500"
                      }`}
                    >
                      Time Remaining: {timmerValue}s
                    </div>
                    <button
                      className={`bg-[#ff0f0f] text-white py-2 px-4 rounded ${
                        selectedOptions[currentIndex] === ""
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      onClick={handleNextQuestion}
                      disabled={selectedOptions[currentIndex] === ""}
                    >
                      {nextBtnText}
                    </button>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
