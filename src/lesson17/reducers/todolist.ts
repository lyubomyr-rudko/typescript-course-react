import { v4 as uuidv4 } from "uuid";
import { TodoListAction, TodoState } from "../types";

const initialState: TodoState = {
  list: [
    { id: uuidv4(), title: "Learn to sing", completed: true },
    { id: uuidv4(), title: "Go to the forest", completed: true },
    { id: uuidv4(), title: "Read some book", completed: true },
  ],
  todo: null,
};

export const todoListReducer = (
  state = initialState,
  action: TodoListAction
): TodoState => {
  console.log("todoListReducer", action);

  switch (action.type) {
    case "SET":
      console.log(action.payload);

      return {
        ...state,
        todo: action.payload,
      };
    case "ADD":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "DELETE":
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload.id),
      };
    case "TOGGLE":
      console.log(action.payload);

      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id
            ? { ...item, completed: !item.completed }
            : item
        ),
      };
    case "EDIT":
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.title }
            : item
        ),
      };
    default:
      return state;
  }
};
