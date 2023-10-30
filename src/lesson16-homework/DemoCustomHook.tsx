import { useEffect, useState } from "react";
import { CSSProperties } from 'react';

export function DemoCustomHookComponent1(){
    const [count, setCount] = useState<number>(0);
    const isTriple:boolean = useWhenDividedBy(count, 3)

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevCount)=>prevCount + 1)
        }, 1000)
        
        return ()=>{
            clearInterval(interval)
        }
    }, [])

    return (
        <div>
            <div style={{fontSize:"24px"}}>DemoCustomHookComponent #1</div>
            <div style={{fontSize:"20px"}}>Simple count: {count}</div>
            {isTriple ? "THIS NUMBER CAN BE DIVIDED BY 3" : ""}
        </div>
    )
}

export function DemoCustomHookComponent2(){
    const [count, setCount] = useState<number>(new Date().getTime());
    const isDividedBy1:boolean = useWhenDividedBy(count, 1)
    const isDividedBy2:boolean = useWhenDividedBy(count, 2)
    const isDividedBy3:boolean = useWhenDividedBy(count, 3)
    const isDividedBy4:boolean = useWhenDividedBy(count, 4)
    const isDividedBy5:boolean = useWhenDividedBy(count, 5)
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount(()=>new Date().getTime())
        }, 1000)
        
        return ()=>{
            clearInterval(interval)
        }
    }, [])

    const TrueOrFalseStyle = (isTrue:boolean):CSSProperties=>{
        const dynamicStyle:CSSProperties = {
            color: isTrue ? "green" : "red"
        }
        return dynamicStyle
    }

    return (
        <div>
            <div style={{fontSize:"24px"}}>Totally different DemoCustomHookComponent #2</div>
            <div style={{fontSize:"20px"}}>DateTime count: {count}</div>
            <ul>
                <li style={TrueOrFalseStyle(isDividedBy1)}>Divided by 1</li>
                <li style={TrueOrFalseStyle(isDividedBy2)}>Divided by 2</li>
                <li style={TrueOrFalseStyle(isDividedBy3)}>Divided by 3</li>
                <li style={TrueOrFalseStyle(isDividedBy4)}>Divided by 4</li>
                <li style={TrueOrFalseStyle(isDividedBy5)}>Divided by 5</li>
            </ul>
        </div>
    )
}

//accepts 2 numbers. 
//num - is just a simple number that we'll examine
//dividedBy - is another number that we'll use to divide num by it's amount
//in return if (num % dividedBy === 0) it'll return true
function useWhenDividedBy(num:number, dividedBy:number){
    const [isDivides, setIsDivides] = useState<boolean>(false)

    useEffect(()=>{
        if(num % dividedBy === 0){
            setIsDivides(true)
        } else{
            setIsDivides(false)
        }
    }, [num, dividedBy])

    return isDivides
}




