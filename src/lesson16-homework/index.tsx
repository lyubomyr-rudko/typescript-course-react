import { CSSProperties } from "styled-components";
import { DemoCustomHookComponent1, DemoCustomHookComponent2 } from "./DemoCustomHook";
import { DemoUseReducer } from "./DemoUseReducer";
import { DemoUseId } from "./DemoUseId";
import { DemoUseDebugValue } from "./DemoUseDebugValue";

export function Lesson16Homework(){
  const flexRowStyle:CSSProperties = {
    display:"flex",
    flexDirection:"row",
    gap:"20px"
  }

  const flexColumnStyle:CSSProperties = {
    display:"flex",
    flexDirection:"column",
    gap:"20px"
  }

  return(
    <div style={{...flexColumnStyle, gap:"32px"}}>
      <div style={flexColumnStyle}>
        <div style={{fontSize:"32px"}}>CustomHooks</div>
        <span style={{fontSize:"20px", fontWeight:"bold"}}>Custom hooks are ideal to encapsulate certain logic and hide it from component behind a single line of code. In this example the logic is simple (num % dividedBy === 0), but it could've been something more difficult (like API related stuff)</span>
        <div style={flexRowStyle}>
          <DemoCustomHookComponent1/>
          <DemoCustomHookComponent2/>
        </div>
      </div>  

      <div style={flexColumnStyle}>
        <div style={{fontSize:"32px"}}>UseReducer</div>
        <span style={{fontSize:"20px", fontWeight:"bold"}}>UseReducer is a great hook for those who don't want to install Redux</span>
        <div style={flexRowStyle}>
          <DemoUseReducer/>
        </div>
      </div>  

      <div style={flexColumnStyle}>
        <div style={{fontSize:"32px"}}>UseId</div>
        <span style={{fontSize:"20px", fontWeight:"bold"}}>UseId is used to generate random ID for the component</span>
        <div style={flexRowStyle}>
          <DemoUseId/>
        </div>
      </div>  

      <div style={flexColumnStyle}>
        <div style={{fontSize:"32px"}}>UseDebugValue</div>
        <span style={{fontSize:"20px", fontWeight:"bold"}}>UseDebugValue is used to debug states of a custom hook. Also may or may not debug depending on if it's production or development build. </span>
        <div style={flexRowStyle}>
          <DemoUseDebugValue/>
        </div>
      </div>  
    </div>
  )
}