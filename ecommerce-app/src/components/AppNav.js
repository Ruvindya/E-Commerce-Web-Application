import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../store/authSlice';

export const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  return user ? children : <Navigate to="/login" />;
};

export const Navigation = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">E-Commerce</Link>
          <div className="space-x-4">
            {user ? (
              <>
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
                <button onClick={() => dispatch(logout())}>Logout</button>
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