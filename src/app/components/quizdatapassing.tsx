"use client";
import React, { useEffect, useState } from "react";
import questions from "./quizdata";
import Result from "./result";
import { BTN_NEXT, BTN_SUBMIT, FALSE, TRUE } from "./constants";

export default function Quizdatapassing() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [buttonText, setButtonText] = useState<string>(BTN_NEXT);
  const [isSubmit, setIsSubmit] = useState(FALSE);
  const [timeLeft, setTimeLeft] = useState(7); 

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(7);
  }, [currentQuestion]);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);

      if (currentQuestion === questions.length - 2) {
        setButtonText(BTN_SUBMIT);
      }
    } else {
      handleSubmit();
    }
  };

  // update the state with the user input from radio btn selection
  const handleSelectedOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setSelectedOptions((previousOptions) => {
      const updatedOptions = [...previousOptions];
      updatedOptions[currentQuestion] = selectedValue;
      return updatedOptions;
    });
  };

  const handleSubmit = () => {
    setIsSubmit(TRUE);
  };

  // const handleAlert = () => {
  //   alert("Please Choose an Option!");
  // };

  const questionIndex = questions[currentQuestion];
  const allAnswers = [...questionIndex.incorrect_answers];

  return (
    <div>
      <div className="m-8 w-full flex justify-center">
        <div className="p-5 w-96 h-96 bg-white rounded-lg shadow-md">
          <div className="text-center font-bold text-[40px]">QUIZ APP</div>
          <div className="h-full">
            {isSubmit ? (
              <Result selectedOptions={selectedOptions} />
            ) : (
              <>
                <div className="h-24 overflow-hidden text-lg font-semibold">
                  {currentQuestion + 1}.{questionIndex.qus}
                </div>
                <div className="mt-1">
                  {allAnswers.map((answer, index) => (
                    <label key={index} className="block cursor-pointer">
                      <input
                        type="radio"
                        id={`answer${index}`}
                        name="answer"
                        value={answer}
                        checked={selectedOptions[currentQuestion] === answer}
                        onChange={handleSelectedOptions}
                        className="mr-2"
                      />
                      {answer}
                    </label>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div
                    className={`text-center text-lg font-semibold ${
                      timeLeft > 5 ? "text-black" : "text-red-500"
                    }`}
                  >
                    Time Remaining: {timeLeft}s
                  </div>
                  <button
                    className={`bg-[#ff0f0f] text-white py-2 px-4 rounded ${
                      selectedOptions[currentQuestion] === ""
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={handleNextQuestion}
                    disabled={selectedOptions[currentQuestion] === ""}
                  >
                    {buttonText}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
