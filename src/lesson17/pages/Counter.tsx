import { useDispatch, useSelector } from "react-redux";
import { increase, decrease } from "../actions/counter";
import { counterSelector } from "../selectors/counterSelector";

const Counter = () => {
  // const [counter, setCounter] = useState(0);
  const counter = useSelector(counterSelector);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increase(3));
  };

  const handleDecrease = () => {
    dispatch(decrease(3));
  };

  return (
    <>
      <div>Counter</div>
      <h1>{counter}</h1>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease}>Decrease</button>
    </>
  );
};

export default Counter;
