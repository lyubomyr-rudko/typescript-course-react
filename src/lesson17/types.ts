export interface Todo {
  id: string | number;
  title: string;
  completed: boolean;
}

export interface CounterAction {
  type: "UP" | "DOWN";
  payload: number;
}

export interface TodoListAction {
  type: string;
  payload: Todo;
}

export interface TodoEditItem {
  id: string | number;
  todo: Todo;
}

export type TodoState = {
  list: {
    id: string | number;
    title: string;
    completed: boolean;
  }[];
  todo: any;
};
