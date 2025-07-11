import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const fetchTodos = async () => {
    const res = await API.get('/todos');
    setTodos(res.data);
  };

  const handleAdd = async () => {
    await API.post('/todos', { text });
    setText('');
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => { fetchTodos(); }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => handleDelete(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}