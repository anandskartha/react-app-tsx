import { useState, useRef, ChangeEvent } from 'react';
import './TodoWithInput.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoWithInput = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'uncompleted'>(
    'all',
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodoHandler = () => {
    if (newTodoText.trim()) {
      setTodoList((prevTodoList) => [
        ...prevTodoList,
        { id: Date.now(), text: newTodoText, completed: false },
      ]);
      setNewTodoText('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleComplete = (todoId: number) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodoHandler = (todoId: number) => {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((todo) => todo.id !== todoId),
    );
  };

  const filteredTodoList = todoList.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'uncompleted') return !todo.completed;
    return true; // 'all' filter
  });

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as 'all' | 'completed' | 'uncompleted');
  };

  return (
    <div className="todo-container">
      <h2>Functional TODO with a Text Input</h2>
      <div className="todo-input-container">
        <input
          id="new-todo"
          type="text"
          className="todo-input"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          ref={inputRef}
          placeholder="Enter a new todo..."
          autoFocus
        />
        <button className="todo-btn" onClick={addTodoHandler}>
          Add
        </button>
      </div>
      <div className="filter-container">
        <label htmlFor="filter-select" className="sr-only">
          Filter Todos
        </label>
        <select
          id="filter-select"
          className="filter-select"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      {todoList.length === 0 ? (
        <p className="empty-list-message">No Todos. Start adding some!</p>
      ) : (
        <ul className="todo-item-container">
          {filteredTodoList.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <div className="todo-item-text-check">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleComplete(todo.id)}
                  id={`todo-${todo.id}`}
                />
                <label htmlFor={`todo-${todo.id}`} className="no-bullets">
                  {todo.text}
                </label>
              </div>
              <button
                className="delete-btn"
                onClick={() => removeTodoHandler(todo.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoWithInput;
