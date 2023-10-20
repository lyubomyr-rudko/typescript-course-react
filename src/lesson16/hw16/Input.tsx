import {ChangeEventHandler, FC, JSX, memo} from "react";

interface IInputProps {
  value: string
  onChange: ChangeEventHandler
}

export const Input:FC<IInputProps> = memo(({ value, onChange, ...rest }: IInputProps): JSX.Element => {

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      {...rest}
    />
  )
})
