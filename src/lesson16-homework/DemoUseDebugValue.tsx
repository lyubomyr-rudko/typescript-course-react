import { useDebugValue, useState, useEffect } from 'react';
import { CSSProperties } from 'styled-components';

function useOnlineStatus(url:string) {
  const [isOnline, setIsOnline] = useState<boolean>(false)
  const [responseTime, setResponseTime] = useState<number>(0)

  useDebugValue(isOnline)
  useDebugValue(responseTime)

  useEffect(()=>{
    async function pingWebsite(){
        const startTime = performance.now()
        
        try{
            const response = await fetch(url)
            const endTime = performance.now()

            setResponseTime(()=> endTime - startTime)

            if(response.ok){
                setIsOnline(true)
            } else{
                setIsOnline(false)
            }
        } catch(e){
            setIsOnline(false)
        }
    }
    
    pingWebsite()
  }, [url])
 
  return isOnline;
}

export function DemoUseDebugValue(){
    const isLocalHost:boolean = useOnlineStatus("http://localhost:5173/")
    const isPokemonApi:boolean = useOnlineStatus("https://pokeapi.co/api/v2/")
    const isDogApi:boolean = useOnlineStatus("https://dog.ceo/api/breeds/image/random")

    const TrueOrFalseStyle = (isTrue:boolean):CSSProperties=>{
        const dynamicStyle:CSSProperties = {
            color: isTrue ? "green" : "red"
        }
        return dynamicStyle
    }

    return (
        <ul>
            <li style={TrueOrFalseStyle(isLocalHost)}>LocalHost 5137 - {isLocalHost ? "Online" : "Offline"}</li>
            <li style={TrueOrFalseStyle(isPokemonApi)}>PokemonApi - {isLocalHost ? "Online" : "Offline"}</li>
            <li style={TrueOrFalseStyle(isDogApi)}>DogApi - {isLocalHost ? "Online" : "Offline"}</li>
        </ul>
    )
}