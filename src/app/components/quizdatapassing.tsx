"use client";
import React, { useState } from "react";
import questions from "./quizdata";
import Result from "./result";

export default function Quizdatapassing() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [buttonText, setButtonText] = useState<string>("Next");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);

      if (currentQuestion === questions.length - 2) {
        setButtonText("Submit");
      }
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
    if (currentQuestion === questions.length - 1) {
      setButtonText("Next");
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
    setIsSubmit(true);
  };

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
                <div className="h-24 overflow-hidden">
                  &#10070; {questionIndex.qus}
                </div>
                <div className="mt-1">
                  {allAnswers.map((answer, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        id={`answer${index}`}
                        name="answer"
                        value={answer}
                        checked={selectedOptions[currentQuestion] === answer}
                        onChange={handleSelectedOptions}
                      />
                      <label htmlFor={`answer-${index}`}>{answer}</label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-[#ff0f0f] text-white py-2 px-4 rounded"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-[#ff0f0f] text-white py-2 px-4 rounded"
                    onClick={handleNextQuestion}
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
