import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, User } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/CogniCook Logo.png';
import { useAuth } from '../utils/auth';
import { signup, login as apiLogin } from '../lib/backendApi';

// ============================================================
// Login / Register Page
// Now calls the Python backend → Supabase Auth.
// ============================================================
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; general?: string }>({});

  const validateEmail = (email: string) => {
    return email.includes('@');
  };

  const clearErrors = () => {
    setErrors({});
  };

  // ── Register via backend API ─────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Call the Python backend signup endpoint
        const result = await signup(email.trim().toLowerCase(), password, name.trim());

        // Supabase returns user + session (tokens)
        if (result.access_token) {
          const userData = {
            id: result.user.id,
            name: name.trim(),
            email: email.trim().toLowerCase(),
          };
          login(userData, result.access_token, result.refresh_token);
          navigate('/home');
        } else {
          // If email confirmation is required, Supabase may not return tokens
          setErrors({ general: 'Account created! Please check your email to confirm, then log in.' });
          setMode('login');
        }
      } catch (err: any) {
        setErrors({ general: err.message || 'Registration failed. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  // ── Login via backend API ────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Call the Python backend login endpoint
        const result = await apiLogin(email.trim().toLowerCase(), password);

        const userData = {
          id: result.user.id,
          name: result.user.user_metadata?.name || email.split('@')[0],
          email: result.user.email,
        };
        login(userData, result.access_token, result.refresh_token);
        navigate('/home');
      } catch (err: any) {
        setErrors({ general: err.message || 'Login failed. Please check your credentials.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleMode = () => {
    clearErrors();
    setName('');
    setEmail('');
    setPassword('');
    setMode(m => m === 'login' ? 'register' : 'login');
  };

  const handleSubmit = mode === 'login' ? handleLogin : handleRegister;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.img
            src={logo}
            alt="CogniCook Logo"
            className="h-24 w-24 mx-auto mb-4 object-contain"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-500 mt-2">
            {mode === 'login'
              ? 'Sign in to your CogniCook account'
              : 'Join CogniCook — your intelligent cooking companion'}
          </p>
        </div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* General error */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name — register only */}
            {mode === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-primary-500'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-primary-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all focus:outline-none ${
                    errors.password
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-primary-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl ${
                loading
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : mode === 'login' ? (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </motion.button>
          </form>

          {/* Toggle mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-500">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={toggleMode}
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                {mode === 'login' ? 'Register' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}