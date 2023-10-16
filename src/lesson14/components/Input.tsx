import {ForwardedRef, forwardRef} from "react";
import {InputWrapper} from "../Users-homework.styled.tsx";
import {IInputProps} from "../types.ts";

const Input = forwardRef(({id, type, label, errors, ...attrs }: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <InputWrapper>
      <label htmlFor='name'>
        {label}
      </label>
      <input
        type={type}
        {...attrs}
        ref={ref}
      />
      {errors && errors.message && <div>{errors.message}</div>}
    </InputWrapper>
  )
})

export default Input
