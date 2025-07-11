import { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showHints, setShowHints] = useState({ username: false, password: false });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your input or try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl dark:bg-base-100">
        <h2 className="text-3xl font-extrabold text-center text-primary mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="form-control">
            <label htmlFor="username" className="label font-medium">
              Username
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                id="username"
                type="text"
                required
                className="grow"
                placeholder="Username"
                value={form.username}
                onFocus={() => setShowHints({ ...showHints, username: true })}
                onBlur={() => setShowHints({ ...showHints, username: false })}
                onChange={e => setForm({ ...form, username: e.target.value })}
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="30"
                title="Only letters, numbers or dash"
              />
            </label>
            {showHints.username && (
              <p className="text-xs mt-1 text-gray-500 transition-opacity duration-200">
                3–30 characters. Only letters, numbers, or dash (-)
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label htmlFor="password" className="label font-medium">
              Password
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              <input
                id="password"
                type="password"
                required
                className="grow"
                placeholder="Password"
                value={form.password}
                onFocus={() => setShowHints({ ...showHints, password: true })}
                onBlur={() => setShowHints({ ...showHints, password: false })}
                onChange={e => setForm({ ...form, password: e.target.value })}
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be 8+ characters with number, lowercase and uppercase letters"
              />
            </label>
            {showHints.password && (
              <p className="text-xs mt-1 text-gray-500 transition-opacity duration-200">
                Must contain 1 number, 1 lowercase, 1 uppercase letter
              </p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full text-base font-medium">
            Login
          </button>

          {/* Link */}
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
