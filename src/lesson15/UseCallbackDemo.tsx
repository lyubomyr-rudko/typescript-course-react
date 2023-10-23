/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useState } from "react";

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
};

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // const handleEmailChange = (newValue: string): void => setEmail(newValue);
  // const handlePasswordChange = (newValue: string): void =>
  //   setPassword(newValue);

  console.log("LoginForm render", email, password);

  const handleEmailChange = useCallback(
    (newValue: string): void => setEmail(newValue),
    [setEmail]
  );
  const handlePasswordChange = useCallback(
    (newValue: string): void => setPassword(newValue),
    [setPassword]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    props.onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <EmailInput value={email} onChange={handleEmailChange} />
      <PasswordInput value={password} onChange={handlePasswordChange} />
    </form>
  );
};

type EmailInputProps = {
  value: string;
  onChange: (newValue: string) => void;
};

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  return (
    <label>
      Your email:
      <input
        type="email"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </label>
  );
};

type PasswordInputProps = {
  value: string;
  onChange: (newValue: string) => void;
};

const PasswordInput: React.FC<PasswordInputProps> = React.memo(
  ({ value: password, onChange }) => {
    console.log("PasswordInput render", password);
    return (
      <label>
        Your password:
        <input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
        />
      </label>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.onChange === nextProps.onChange
    );
  }
);
