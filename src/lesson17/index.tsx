import { Provider } from "react-redux";
import Todo from "./Todo";
import { store } from "./store";

export const Lesson17 = () => {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
};
