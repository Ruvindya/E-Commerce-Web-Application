import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../store/authSlice';
import { selectCartCount } from '../store/cartSlice';
import { ShoppingCart } from 'lucide-react';

export const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  return user ? children : <Navigate to="/login" />;
};

export const Navigation = () => {
  const user = useSelector(selectUser);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">E-Commerce</Link>
          <div className="space-x-4 flex items-center">
            {user ? (
              <>
                <Link to="/products">Products</Link>
                <Link to="/cart" className="relative inline-flex items-center">
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button 
                  onClick={() => dispatch(logout())} 
                  className="hover:bg-gray-700 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};