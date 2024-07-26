import React from "react";
import { GOOD_EMOTE, TRY_EMOTE } from "./constants";

export default function Result({ ...props }) {
  let emote;
  function getDecoration() {
    if (props.result >= 3) {
      emote = GOOD_EMOTE;
      return emote;
    }
    emote = TRY_EMOTE;
    return emote;
  }

  const message = getDecoration();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">
        Result
      </h1>
      <p className="text-xl text-gray-700 text-center">You Corrected</p>
      <p className="text-xl text-gray-700 text-center font-bold">
        {props.result}
      </p>
      <p className="text-xl text-gray-700 text-center font-bold">{message}</p>
    </div>
  );
}
