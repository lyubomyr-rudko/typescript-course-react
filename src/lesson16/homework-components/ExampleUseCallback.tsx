import { memo } from "react";

type TCounterShower = {
  countVal:number;
  callback:()=>void
}

export const CounterShower = memo((props:TCounterShower):JSX.Element=>{
  return (<div onClick={props.callback}>{props.countVal}</div>)
});
