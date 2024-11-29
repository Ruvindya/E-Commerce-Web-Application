import './App.css';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { useAuth, AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Navigation, PrivateRoute } from './components/AppNav';


function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-100">
            <Navigation />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/products" 
                element={
                  <PrivateRoute>
                    <ProductList />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/cart" 
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/products" />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
