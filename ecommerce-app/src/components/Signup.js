import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardContent, Input, Button  } from '@mui/material';


export const Signup = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        console.log("handle submit called")
        e.preventDefault();
        signup(email, password);
        navigate('/products');
      };
  return (
    <div>
        <Card className="w-full max-w-md">
            <CardHeader>
                <h2 className="text-2xl font-bold">Sign Up</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                    Sign Up
                    </Button>
                </form>
                
            </CardContent>
        </Card>
    </div>
  )
}
