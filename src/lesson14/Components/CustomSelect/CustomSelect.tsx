import React, { useState } from "react"
import { Controller, useFormContext } from "react-hook-form";

import { Wrapper, Input, Label, DropDownMenu, OptionsList, OptionItem, ErrorMessage } from './CustomSelect.styled';

interface ICustomSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: string[];
  width?: string;
  height?: string;
  htmlFor?: string;
  label?: string;
  id?: string;
  name: string;
  type: string;
  placeholder: string;
  errorMessage: string | undefined
}

const CustomSelect = ({
  options,
  width,
  height,
  htmlFor,
  label,
  id,
  name,
  type,
  placeholder,
  errorMessage,
}: ICustomSelectProps) => {

  const [isShowOptions, setIsShowOptions] = useState<boolean>(false);

  const handleSelectValue = (onChangeCb: (val: string) => void, option: string): void => {
    setIsShowOptions(!isShowOptions);
    onChangeCb(option);
  };

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
        render={({ field }) => (
          <>
            <Input
              id={id}
              type={type}
              width={width}
              height={height}
              placeholder={placeholder}
              {...field}
              onClick={() => setIsShowOptions(!isShowOptions)}
            />
            <ErrorMessage>
              {errorMessage}
            </ErrorMessage>
            {options.length > 0 && (
              <DropDownMenu isShow={isShowOptions}>
                <OptionsList isShow={isShowOptions}>
                  {options.length > 0 && options.map((option: string) => {
                    return <OptionItem key={option} onClick={() => handleSelectValue(field.onChange, option)}>{option}</OptionItem>
                  })}
                </OptionsList>
              </DropDownMenu>
            )}
          </>
        )}
      />
    </Wrapper>
  )
}

export default CustomSelect;