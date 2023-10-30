import { useId } from "react"

type TUser = {
    name:string,
    age:number
}

interface IUserProps{
    user:TUser
}

function User(props:IUserProps){
    const { user } = props
    const id = useId()

    return(
        <li key={id} style={{display:"flex", gap:"16px"}}>
            <span>Id: {id}</span>
            <span>Name: {user.name}</span>
            <span>Age: {user.age} </span>
        </li>
    )
}   

export function DemoUseId(){
    const users:TUser[] = [
        { name:"Codo", age: 1 },
        { name:"Dodo", age: 2 },
        { name:"Fodo", age: 3 },
        { name:"Godo", age: 4 },
        { name:"Hodo", age: 5 }
    ]

    return (
        <ul>
            {
                users.map((entity)=><User user={entity}/>)
            }
        </ul>
    )
}