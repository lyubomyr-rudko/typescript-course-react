import React from "react";

import { Button } from "./ClassicButton.styled";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  type: "button" | "submit";
  children: React.ReactNode;
  disabled?: boolean;
  style?: { [key: string]: string };
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ClassicButton = ({ width, type, children, disabled, style, onClick }: IProps) => {
  return (
    <Button
      width={width}
      type={type}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {children}
    </Button>
  )
};

export default ClassicButton;