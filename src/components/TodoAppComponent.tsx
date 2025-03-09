import React, { useState, useEffect } from 'react';

const TodoAppComponent = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
    fetchTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const fetchTodos = async () => {
    const response = await fetch('https://dummyjson.com/todos');
    const data = await response.json();
    setTodos(data.todos.slice(0, 5));
  };

  const addTodo = () => {
    if (newTask.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      todo: newTask,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const statusUpdate= (id) => {
    
    let data = todos.map((todo) => {
      if(todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    });
    setTodos(data);

  }

  const filteredTodos = () => {
    if (filter === 'completed') return todos.filter((todo) => todo.completed);
    if (filter === 'pending') return todos.filter((todo) => !todo.completed);
    return todos;
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 flex-1 rounded-l"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white p-2 rounded-r">
          Add
        </button>
      </div>

      <div className="mb-4">
        <button onClick={() => setFilter('all')} className="mr-2">All</button>
        <button onClick={() => setFilter('completed')} className="mr-2">Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <ul>
        {filteredTodos().map((todo) => (
          <li
            key={todo.id}
            className={`p-2 border-b flex justify-between items-center ${todo.completed ? 'line-through' : ''}`}
          >
            <span onClick={() => toggleComplete(todo.id)}>{todo.todo}</span>
            <button onClick={() => statusUpdate(todo.id)} className="text-red-500">{todo?.completed? "Mark As Pending": "Mark As Complete"}</button>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoAppComponent;
