import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const validatePassword = (password) => {
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough) return 'Password must be at least 8 characters.';
    if (!hasCapital) return 'Password must contain at least one capital letter.';
    if (!hasSpecialChar) return 'Password must contain at least one special character.';

    return '';
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const pwdError = validatePassword(newPassword);
    if (pwdError) {
      setPasswordError(pwdError);
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Password reset successful! You can now log in.');
        navigate('/login');
      } else {
        setSubmitError(data.message || 'Password reset failed');
      }
    } catch (err) {
      setSubmitError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-green-700">Reset Your Password</h2>
        
        {submitError && <p className="text-red-600 text-sm text-center">{submitError}</p>}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-800">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                required
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError(validatePassword(e.target.value));
                }}
                className="w-full mt-1 px-4 py-2 border rounded pr-10 text-sm"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {passwordError && <p className="text-xs text-red-600 mt-1">{passwordError}</p>}
          </div>

          <button
            type="submit"
            disabled={!!passwordError}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
