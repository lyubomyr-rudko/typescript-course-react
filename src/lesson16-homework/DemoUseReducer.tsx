import { useReducer } from "react"
import { CSSProperties } from "styled-components";

type TColor = {
    color:string,
    opacity:number
}

interface ActionChangeColor {
    type: "CHANGE_COLOR";
    payload: string;
}
  
interface ActionChangeOpacity {
    type: "INCREASE" | "DECREASE";
    payload?: never;
}

const opacityIncrementValue = 0.1

function colorReducer(state:TColor, action:ActionChangeColor | ActionChangeOpacity):TColor {
    switch(action.type){
        case "INCREASE":
            return {...state, opacity: state.opacity + opacityIncrementValue}

        case "DECREASE":
            return {...state, opacity: state.opacity - opacityIncrementValue}
        
        case "CHANGE_COLOR":
            return {...state, color: action.payload}

        default:
            throw Error('Unknown Action')
    }
}


export function DemoUseReducer(){
    const initialState:TColor = {color:"red", opacity: 0.5}
    const [state, dispatch] = useReducer(colorReducer, initialState)

    const canvasStyle:CSSProperties = {
        display:"block",
        background:state.color,
        opacity:state.opacity,
        width: "64px",
        height: "64px"
    }

    return (
        <div style={{display:"flex", flexDirection:"row", gap:"20px"}}>
            <div style={{display:"flex", flexDirection:"row", gap:"16px"}}>
                <canvas style={canvasStyle}></canvas>
                <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
                    <span>Color: {state.color}</span>
                    <span>Opacity: {state.opacity.toFixed(1)}</span>
                </div>
            </div>
            <button onClick={()=>dispatch({type:"INCREASE"})}>Increase Opacity</button>
            <button onClick={()=>dispatch({type:"DECREASE"})}>Decrease Opacity</button>

            <select value={state.color} onChange={(value)=>dispatch({type:"CHANGE_COLOR", payload:value.currentTarget.value})}>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
            </select>
        </div>
    )
}