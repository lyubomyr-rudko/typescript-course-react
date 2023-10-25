import { CounterAction } from "../types";

const initCounter = 100;

export const counterReducer = (state = initCounter, action: CounterAction) => {
  console.log("counterReducer", action);

  switch (action.type) {
    case "UP":
      return state + action.payload;
    case "DOWN":
      return state - action.payload;
    default:
      return state;
  }
};
