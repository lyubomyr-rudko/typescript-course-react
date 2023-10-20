import {ChangeEvent, ChangeEventHandler, FC, JSX, useCallback, useState} from "react";
import {Input} from "./Input.tsx";

export const UseCallBackDemo:FC = (): JSX.Element => {
  const [name, setName] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const nameInputHandler:ChangeEventHandler<HTMLInputElement> = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  },[setName])

  const titleInputHandler:ChangeEventHandler<HTMLInputElement> = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  },[setTitle])

  return (
    <form>
      <Input
        value={name}
        onChange={nameInputHandler}
      />
      <Input
        value={title}
        onChange={titleInputHandler}
      />
    </form>
  )
}

// this is an example of usage useCallBack hook. The hook is designed for caching a function that
// is passed to children components between renders
// and avoid excessive renders of children components.
// To make it work properly name of function that should be cached needs to be passed to dependency array and
// child component in which function will be called must be wrapped in React.memo function.
