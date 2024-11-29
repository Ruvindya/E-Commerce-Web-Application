import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children }) => {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        setUser({ email });
        localStorage.setItem('user', JSON.stringify({ email }));
      };

      const signup = (email, password) => {
        
        setUser({ email });
        localStorage.setItem('user', JSON.stringify({ email }));
      };

      const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
      };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
        {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);
