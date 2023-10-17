import React from "react";
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from "react-datepicker";

import {
  Wrapper,
  Input,
  Label,
  InputWrapper,
  ErrorMessage
} from "./DateInput.styled";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  htmlFor: string;
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  errorMessage: string | undefined
}

export const DateInput = ({
  width,
  height,
  htmlFor,
  label,
  id,
  name,
  placeholder,
  errorMessage
}: InputProps) => {

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
      <InputWrapper>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <DatePicker
              customInput={(
                <Input
                  id={id}
                  width={width}
                  height={height}
                  {...field}
                />
              )}
              dateFormat="d MMMM, yyyy"
              showYearDropdown
              placeholderText={placeholder}
              maxDate={new Date()}
              selected={field.value}
              showTimeSelect={false}
              todayButton="Today"
              dropdownMode="select"
              popperPlacement="top-end"
              shouldCloseOnSelect
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
      </InputWrapper>
      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>
    </Wrapper>
  );
};

export default DateInput;
