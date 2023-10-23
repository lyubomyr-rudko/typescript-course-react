import React, { useState, useEffect } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return width;
}

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  });
}

export function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  function onHandleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  return { value, onChange: onHandleChange };
}
