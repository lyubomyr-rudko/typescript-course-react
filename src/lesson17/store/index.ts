import { combineReducers } from "redux";
import { createStore } from "redux";
import { counterReducer } from "../reducers/counter";
import { todoListReducer } from "../reducers/todolist";
// thunk middleware
// dispatch({
//   type: "ADD",
//   payload: '123'
// })

// dispatch(async (dispatch, getState) => {
//   const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')

//   const json = await data.json();

//   dispatch({
//     type: "ADD",
//     payload: json
//   })
// });

export const allReducers = combineReducers({
  counter: counterReducer,
  todoList: todoListReducer,
});

export const store = createStore(allReducers);

export type RootState = ReturnType<typeof store.getState>;

// export type RootState = {
//   counter: number;
//   todoList: TodoState;
// }
