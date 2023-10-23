import React, { useEffect } from "react";
import { memo } from "react";

export function UseDeferredValueDemo() {
  const [text, setText] = React.useState("");
  const deferredText = React.useDeferredValue(text);

  useEffect(() => {
    console.log("fetch", deferredText);
  }, [deferredText]);

  console.log(text, deferredText);

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}

const SlowList: React.FC<{ text: string }> = memo(function SlowList({ text }) {
  // Log once. The actual slowdown is inside SlowItem.
  console.log("[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: any[] = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }

  return <ul className="items">{items}</ul>;
});

const SlowItem: React.FC<{ text: string }> = ({ text }) => {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className="item">Text: {text}</li>;
};
