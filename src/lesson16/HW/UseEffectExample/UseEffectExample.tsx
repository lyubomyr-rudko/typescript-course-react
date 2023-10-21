import { useEffect, useState } from "react"

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const UseEffectExample = () => {

  const [todoNumber, setTodoNumber] = useState<number>(1);
  const [todos, setTodos] = useState<ITodo[]>([]);

  const fetchTodo = async (todo: number): Promise<void> => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo}`);
      const data: ITodo = await response.json();
      setTodos(prev => [...prev, data]);
    } catch (error) {
      console.log('error fetch todo users', error)
    }
  }

  useEffect(() => {
    const handleEvent = (): void => {
      const width = window.innerWidth;
      console.log('width', width)
    }

    window.addEventListener("resize", handleEvent);
    return () => {
      window.removeEventListener("resize", handleEvent);
    }
  }, []);

  useEffect(() => {
    fetchTodo(todoNumber)
  }, [todoNumber])

  return (
    <>
      <h2>Example UseEffect</h2>
      <button onClick={() => setTodoNumber(prev => prev + 1)}>Fetch next Todo</button>
      <ul>
        {
          todos && todos.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))
        }
      </ul>
    </>
  )
}

export default UseEffectExample;

// UseEffect allows to perform side effects in a functional component (such as data loading from server, subscription to browser events for example, resize or scroll)
//and unsubscribe from events
// in first example use useEffect for subscribe to resize event  and return function for unsubscribe from  resize event before unmount component
// in second example use useEffect for fetch  data from Api