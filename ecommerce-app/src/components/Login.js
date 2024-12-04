import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectLoginError } from '../store/authSlice';
import { Card, CardHeader, CardContent, Button , Input} from '@mui/material';
import { toast } from 'react-toastify';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginError = useSelector(selectLoginError);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (user) {
      toast.success(`Welcome back ${user.email} `, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,} );
      navigate('/products');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(login({ email, password }));
      if (loginError) {
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
      <CardHeader
          title="Login"
          className="text-2xl font-bold text-center text-gray-800"
        />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {loginError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {loginError}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className=' px-5 flex flex-col gap-3'>
            <div className='font-semibold  text-gray-800'>
              <h2>Email:</h2>
            </div>
            <div >
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              
              />
            </div>
            <div className='font-semibold  text-gray-800'>
              <h2>Password:</h2>
            </div>
            <div >
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
            </div>
          </div>

            
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            Login
          </button>
          </form>
        </CardContent>
      </Card>
      
    </div>
  );
};