import React, { useMemo, useState } from "react";

function longProcess(count: number) {
  let sum = 0;
  for (let i = 0; i < 10 ** count; i++) {
    sum += i;
  }

  return sum;
}

export const UseMemoDemo: React.FC = () => {
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);
  const hash = useMemo(() => longProcess(count), [count]);

  return (
    <div>
      <label>
        Input:
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      Hash: {hash}
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </div>
  );
};
