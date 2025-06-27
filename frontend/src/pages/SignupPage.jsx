import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', 
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough) return 'Password must be at least 8 characters.';
    if (!hasCapital) return 'Password must contain at least one capital letter.';
    if (!hasSpecialChar) return 'Password must contain at least one special character.';

    return '';
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));

    if (name === 'password') {
      setPasswordError(validatePassword(value));
    }

    if (name === 'email') {
      setEmailError(validateEmail(value) ? '' : 'Please enter a valid email address.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const pwdCheck = validatePassword(formData.password);
    if (pwdCheck) return setPasswordError(pwdCheck);

    if (!validateEmail(formData.email)) return setEmailError('Please enter a valid email address.');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone, 
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.message || 'Signup failed. Please try again.');
      } else {
        setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
        setError('');
        alert('Signup successful!');
        navigate('/login');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-green-700">Get Started</h2>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-800">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded text-sm"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded text-sm"
              placeholder="Enter email address"
            />
            {emailError && <p className="text-xs text-red-600 mt-1">{emailError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800">Phone</label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded text-sm"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded text-sm"
              placeholder="Enter password"
            />
            {passwordError && <p className="text-xs text-red-600 mt-1">{passwordError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded pr-10 text-sm"
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!!passwordError || !!emailError}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-700">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="text-green-700 hover:underline cursor-pointer">
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
