import { useReducer } from 'react';

type ActionType = 'increment' | 'decrement' | 'reset';

const initialState = { count: 0 };

function countReducer(state: typeof initialState, action: { type: ActionType }): typeof initialState {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

export const UseReducerCounter = () => {
  const [state, dispatch] = useReducer(countReducer, initialState);

  return (
    <div>
      <h1>Counter using useReducer</h1>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

