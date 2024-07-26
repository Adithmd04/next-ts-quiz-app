// "use client";
// import React, { useEffect, useState } from "react";
// import questions from "./quizdata";
// import Result from "./result";
// import { BTN_SUBMIT, TRUE } from "./constants";
// import { useReactiveVar } from "@apollo/client";
// import {
//   buttonTextVar,
//   currentQuestionVar,
//   makeSubmitVar,
//   timeLeftVar,
// } from "../utils/localState";

// export default function Quizdatapassing() {
//   const currentQus = useReactiveVar(currentQuestionVar);
//   const nextBtnText = useReactiveVar(buttonTextVar);
//   const isSubmit = useReactiveVar(makeSubmitVar);
//   const timmerValue = useReactiveVar(timeLeftVar);

//   const [selectedOptions, setSelectedOptions] = useState<string[]>(
//     Array(questions.length).fill("")
//   );

//   useEffect(() => {
//     if (timmerValue === 0) {
//       handleNextQuestion();
//     }
//     const timer = setInterval(() => {
//       timeLeftVar(timmerValue > 0 ? timmerValue - 1 : 0);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [timmerValue]);

//   useEffect(() => {
//     timeLeftVar(7);
//   }, [currentQus]);

//   const handleNextQuestion = () => {
//     if (currentQus < questions.length - 1) {
//       currentQuestionVar(currentQus + 1);

//       if (currentQus === questions.length - 2) {
//         buttonTextVar(BTN_SUBMIT);
//       }
//     } else {
//       handleSubmit();
//     }
//   };

//   // update the state with the user input from radio btn selection
//   const handleSelectedOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedValue = e.target.value;
//     setSelectedOptions((previousOptions) => {
//       const updatedOptions = [...previousOptions];
//       updatedOptions[currentQus] = selectedValue;
//       return updatedOptions;
//     });
//   };

//   const handleSubmit = () => {
//     makeSubmitVar(TRUE);
//   };

//   const questionIndex = questions[currentQus];
//   const allAnswers = [...questionIndex.incorrect_answers];

//   return (
//     <div>
//       <div className="m-8 w-full flex justify-center">
//         <div className="p-5 w-96 h-96 bg-white rounded-lg shadow-md">
//           <div className="text-center font-bold text-[40px]">QUIZ APP</div>
//           <div className="h-full">
//             {isSubmit ? (
//               <Result selectedOptions={selectedOptions} />
//             ) : (
//               <>
//                 <div className="h-24 overflow-hidden text-lg font-semibold">
//                   {currentQus + 1}.{questionIndex.qus}
//                 </div>
//                 <div className="mt-1">
//                   {allAnswers.map((answer, index) => (
//                     <label key={index} className="block cursor-pointer">
//                       <input
//                         type="radio"
//                         id={`answer${index}`}
//                         name="answer"
//                         value={answer}
//                         checked={selectedOptions[currentQus] === answer}
//                         onChange={handleSelectedOptions}
//                         className="mr-2"
//                       />
//                       {answer}
//                     </label>
//                   ))}
//                 </div>
//                 <div className="flex justify-between items-center mt-4">
//                   <div
//                     className={`text-center text-lg font-semibold ${
//                       timmerValue > 5 ? "text-black" : "text-red-500"
//                     }`}
//                   >
//                     Time Remaining: {timmerValue}s
//                   </div>
//                   <button
//                     className={`bg-[#ff0f0f] text-white py-2 px-4 rounded ${
//                       selectedOptions[currentQus] === ""
//                         ? "cursor-not-allowed"
//                         : "cursor-pointer"
//                     }`}
//                     onClick={handleNextQuestion}
//                     disabled={selectedOptions[currentQus] === ""}
//                   >
//                     {nextBtnText}
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
