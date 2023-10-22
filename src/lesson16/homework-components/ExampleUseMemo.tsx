import { useMemo, FC, memo, ReactNode, useContext, useCallback } from "react";
import {useCustomButtonHook} from './ExampleUseCustomHook';
import {ThemeContext} from './ExampleUseContext';
import {CounterShower} from './ExampleUseCallback'


type TargetComponentProps = object

export const MemoComponent = memo<TargetComponentProps>(() => {
  return (
    <div>
    	some content that will never be rerender.
    </div>
	);
});

export const UseMemoComponent: FC = () => {
  const {count,increment,decrement} = useCustomButtonHook()
  const [theme, toggleTheme] = useContext(ThemeContext)

  const getDivs = (num:number):ReactNode[]=>{
    return Array.from({length:num}, (_, i) => <span key={i}>Test</span>);
  }
  const testFunc = useMemo(() => getDivs(count), [count]);
  const memoCalback = useCallback(()=>{console.log(count)},[]);

  return (
    <div>
      <MemoComponent />
      <CounterShower countVal={count} callback={memoCalback}/>
      <button onClick={increment} style={theme}>+</button>
      <button onClick={decrement} style={theme}>-</button>
      <button onClick={toggleTheme} style={theme}>Togle theme</button>
      <h2>Expensive Calculation</h2>
      {testFunc}
    </div>
  );
};
