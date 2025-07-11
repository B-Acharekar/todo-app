import { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showHints, setShowHints] = useState({ username: false, password: false });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/register', form);
    login(res.data.token);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6 dark:bg-base-100">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-primary">Create Account</h2>

      {/* Username */}
      <div className="form-control">
        <label className="input input-bordered flex items-center gap-2">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </g>
          </svg>
          <input
            type="text"
            required
            placeholder="Username"
            value={form.username}
            onFocus={() => setShowHints({ ...showHints, username: true })}
            onBlur={() => setShowHints({ ...showHints, username: false })}
            onChange={e => setForm({ ...form, username: e.target.value })}
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            title="Only letters, numbers or dash"
            className="grow"
          />
        </label>
        {showHints.username && (
          <p className="text-xs mt-1 text-gray-500">
            3–30 characters, letters, numbers or dash (-)
          </p>
        )}
      </div>

      {/* Password */}
      <div className="form-control">
        <label className="input input-bordered flex items-center gap-2">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
            </g>
          </svg>
          <input
            type="password"
            required
            placeholder="Password"
            value={form.password}
            onFocus={() => setShowHints({ ...showHints, password: true })}
            onBlur={() => setShowHints({ ...showHints, password: false })}
            onChange={e => setForm({ ...form, password: e.target.value })}
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must include number, lowercase and uppercase letter"
            className="grow"
          />
        </label>
        {showHints.password && (
          <p className="text-xs mt-1 text-gray-500">
            Must be 8+ characters, include a number, lowercase, and uppercase letter
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="form-control">
        <button type="submit" className="btn btn-primary w-full text-base font-semibold">
          Register
        </button>
      </div>

      {/* Link */}
      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
