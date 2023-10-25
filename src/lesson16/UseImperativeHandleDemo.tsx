import React from "react";

// Reference: https://react.dev/reference/react/useImperativeHandle

// Example 1
export const RefProblemDemo = () => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleFocusBtnClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <CustomInputWithRef
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <br />
      <button onClick={handleFocusBtnClick}>Focus</button>
    </>
  );
};

interface ICustomInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  ref: React.Ref<HTMLInputElement>;
}

export const CustomInput: React.FC<ICustomInputProps> = (props) => {
  return <input {...props} />;
};

export const CustomInputWithRef = React.forwardRef<
  HTMLInputElement,
  ICustomInputProps
>((props, ref) => {
  return <input {...props} ref={ref} />;
});

// Example 2
export type ComplexInputHandle = {
  focus1: () => void;
  focus2: () => void;
  incrementCount: () => void;
};

export function UseImperativeHandleDemo() {
  const complexRef = React.useRef<ComplexInputHandle>(null);

  React.useEffect(() => {
    if (complexRef.current) {
      complexRef.current.focus1();
    }
  }, []);

  const handleClick1 = () => {
    if (complexRef.current) {
      complexRef.current.focus1();
    }
  };

  const handleClick2 = () => {
    if (complexRef.current) {
      complexRef.current.focus2();
    }
  };

  const handleIncrement = () => {
    // if (complexRef.current) {
    complexRef?.current?.incrementCount?.();
    // }
  };

  return (
    <>
      <ComplexInput ref={complexRef} />
      <button onClick={handleClick1}>Focus 1</button>
      <button onClick={handleClick2}>Focus 2</button>
      <button onClick={handleIncrement}>Increment</button>
    </>
  );
}

type Props = {}; // eslint-disable-line

const ComplexInput = React.forwardRef<ComplexInputHandle, Props>(
  (_props, ref) => {
    const [count, setCount] = React.useState(0);
    const inputRef1 = React.useRef<HTMLInputElement>(null);
    const inputRef2 = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        focus1() {
          if (inputRef1.current) {
            inputRef1.current.focus();
          }
          console.log("Focusing input 1");
        },
        focus2() {
          if (inputRef2.current) {
            inputRef2.current.focus();
          }
          console.log("Focusing input 2");
        },
        incrementCount() {
          setCount((prev) => prev + 1);
        },
      }),
      []
    );

    return (
      <div>
        <input ref={inputRef1} />
        <input ref={inputRef2} />
        {count}
      </div>
    );
  }
);
