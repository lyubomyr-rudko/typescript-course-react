export const increase = (data: number) => {
  return {
    type: "UP",
    payload: data,
  };
};

export const decrease = (data: number) => {
  return {
    type: "DOWN",
    payload: data,
  };
};
