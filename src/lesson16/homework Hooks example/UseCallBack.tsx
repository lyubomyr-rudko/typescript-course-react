import { memo, useCallback, useState } from "react";

// Пояснення
// Перед визовом функції перевіряється, чи викликалась  функція раніше:
// якщо не викликалась, то функція викликається, і результат її виконання зберігається;
// якщо викликалась, то використовується збереженний результат.
// useCallback приймає в якості аргументів встроенний колбек і массив залежностей.
//  Повертає мемоізованну версію колбека, котрий зміниться тільки, якщо зміняться значення однієї із залежностей

interface ILastNameInputsProps {
  value: string;
  handleLastNameChange: (newValue: string) => void;
}
interface IBirthDateInputsProps {
  value: string;
  handleBirthDateChange: (newValue: string) => void;
}

const LastNameInput: React.FC<ILastNameInputsProps> = memo(
  (props) => {
    const { value: lastName, handleLastNameChange } = props;
    console.log("LastNameInput render", lastName);
    return (
      <input
        type="text"
        value={lastName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLastNameChange(e.target.value)}
        name="birthDate"
        placeholder="Last Name"
        required
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.handleLastNameChange === nextProps.handleLastNameChange
    );
  }
);

const BirthDateInput: React.FC<IBirthDateInputsProps> = memo(
  (props) => {
    const { value: birthDate, handleBirthDateChange } = props;
    console.log("BirthDateInput render", birthDate);
    return (
      <input
        type="date"
        value={birthDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBirthDateChange(e.target.value)}
        name="birthDate"
        required
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.handleBirthDateChange === nextProps.handleBirthDateChange
    );
  }
);

export function UseCallBack() {
  const [userBirthDate, setUserBirthDate] = useState<string>("");
  const [userLastName, setUserLastName] = useState<string>("");

  const handleBirthDateChange = useCallback(
    (newValue: string): void => setUserBirthDate(newValue),
    [setUserBirthDate]
  );
  const handleLastNameChange = useCallback(
    (newValue: string): void => setUserLastName(newValue),
    [setUserLastName]
  );
  return (
    <form>
      <LastNameInput value={userLastName} handleLastNameChange={handleLastNameChange} />
      <BirthDateInput value={userBirthDate} handleBirthDateChange={handleBirthDateChange} />
    </form>
  );
}
