import React from 'react';
import { Mail, Github, Facebook } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

interface LoginFormProps {
  onLogin: () => void;
  onShowRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onShowRegister }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
      onLogin();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to MediCare Plus</h2>
      
      <div className="space-y-4">
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Mail className="w-5 h-5" />
          <span>Continue with Email</span>
        </button>
        
        <button
          onClick={handleLogin}
          className="w-full bg-[#1877F2] text-white py-3 rounded-lg hover:bg-[#1864D9] transition-colors flex items-center justify-center space-x-2"
        >
          <Facebook className="w-5 h-5" />
          <span>Continue with Facebook</span>
        </button>
        
        <button
          onClick={handleLogin}
          className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
        >
          <Github className="w-5 h-5" />
          <span>Continue with GitHub</span>
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onShowRegister}
            className="text-blue-600 hover:underline font-medium"
          >
            Register now
          </button>
        </p>
      </div>
    </div>
  );
};