import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  addTodo,
  deleteTodo,
  editTodo,
  setTodo,
  toggleTodo,
} from "../actions/todo";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../types";
import { RootState } from "../store";

const TodoList = () => {
  const dispatch = useDispatch();
  const { list, todo } = useSelector((state: RootState) => state.todoList);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [id, setId] = useState<string | number>("");

  const handleSetItem = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTodo(e.target.value));
  };
  const handleFormSubmit = () => {
    if (editMode) {
      dispatch(
        editTodo({
          id,
          title: todo,
          completed: false,
        })
      );
      setEditMode(false);
    } else {
      dispatch(
        addTodo({
          id: uuidv4(),
          title: todo,
          completed: false,
        })
      );
    }
    dispatch(setTodo(""));
  };

  const handleDelete = (id: string | number) => {
    dispatch(deleteTodo(id));
  };

  const handleToggle = (id: string | number) => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = (id: string | number) => {
    setEditMode(true);
    const editItem = list.find((item: Todo) => item.id === id);
    if (!editItem) return;

    dispatch(setTodo(editItem.title));
    setId(id);
  };
  return (
    <>
      <div>Todo</div>
      <input type="text" value={todo || ""} onChange={handleSetItem} />
      <button onClick={handleFormSubmit}>{editMode ? "Edit" : "Add"}</button>
      {list.map((item: Todo) => {
        return (
          <div key={item.id}>
            <li
              className={item.completed ? "active" : ""}
              onClick={() => handleToggle(item.id)}
            >
              {item.title}
            </li>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button onClick={() => handleEdit(item.id)}>Edit</button>
          </div>
        );
      })}
    </>
  );
};

export default TodoList;
