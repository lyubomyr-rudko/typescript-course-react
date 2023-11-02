import { Provider } from "react-redux";
import Users from "./Users-homework";
import { store } from "./state/store";

export const Lesson17Homework = () => {
  return (
    <Provider store={store}>
      <Users />
    </Provider>
  );
};
