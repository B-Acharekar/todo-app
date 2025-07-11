import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!text.trim()) return;
    try {
      await API.post('/todos', { text });
      setText('');
      fetchTodos();
    } catch (error) {
      alert('Failed to add todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos();
    } catch (error) {
      alert('Failed to delete todo');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6 dark:bg-base-100">
      <h2 className="text-2xl font-bold text-center text-primary">Your Todo List</h2>

      {/* Input & Add Button */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter new todo..."
          className="input input-bordered w-full"
        />
        <button
          onClick={handleAdd}
          className="btn btn-primary"
          disabled={!text.trim()}
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <div>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos found.</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-center bg-base-200 px-4 py-2 rounded-md shadow-sm"
              >
                <span className="text-gray-800 dark:text-gray-200">{todo.text}</span>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
