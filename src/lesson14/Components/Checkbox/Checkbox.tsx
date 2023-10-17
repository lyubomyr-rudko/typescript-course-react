import React from "react";

import { Controller, useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string,
  label: string,
  id: string,
  name: string,
}

import { Wrapper, Label, Input } from './Checkbox.styled';

const Checkbox = ({ htmlFor, label, id, name }: InputProps) => {

  const {
    control
  } = useFormContext();

  return (
    <Wrapper>
      {
        label && (
          <Label
            htmlFor={htmlFor}
          >
            {label}
          </Label>
        )
      }
      <Controller
        control={control}
        name={name}
        render={({ ...fields }) => (
          <Input
            id={id}
            type='checkbox'
            onChange={fields.field.onChange}
            {...fields}
          />
        )}
      />
    </Wrapper>
  )

};

export default Checkbox;
