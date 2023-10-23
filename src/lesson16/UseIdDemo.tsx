import { useId, useState } from "react";

export function UseIdDemo() {
  const [value, setValue] = useState("");
  const id = useId();

  return (
    <>
      <label>
        Password:
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-describedby={`${id}-hint`}
        />
      </label>
      <p id={`${id}-hint`}>
        The password should contain at least 18 characters
      </p>

      <input list={`${id}-list`} />
      <datalist id={`${id}-list`}>
        <option value="BMW" />
        <option value="Bentley" />
        <option value="Mercedes" />
        <option value="Audi" />
        <option value="Volkswagen" />
      </datalist>
    </>
  );
}
