import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../store/authSlice';
import { selectCart } from '../store/cartSlice';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  return user ? children : <Navigate to="/login" />;
};

export const Navigation = () => {
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateCount = (e) => setCartCount(e.detail.count);
    window.addEventListener('updateCartCount', updateCount);

    const userItems = cart.filter(item => item.userId === user?.id).length;
    setCartCount(userItems);

    return () => window.removeEventListener('updateCartCount', updateCount);
  }, [cart, user]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavLinks = () => (
    <>
      {user ? (
        <>
          <div className="text-sm mb-2 md:mb-0 md:text-base">Welcome {user.email}</div>
          <Link to="/products" className="block py-2 md:py-0" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/cart" className="relative inline-flex items-center py-2 md:py-0" onClick={() => setIsOpen(false)}>
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button 
            onClick={() => {
              dispatch(logout());
              setIsOpen(false);
            }} 
            className="hover:bg-gray-700 px-3 py-1 rounded w-full md:w-auto text-right md:text-center"
>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="block py-2 md:py-0" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/signup" className="block py-2 md:py-0" onClick={() => setIsOpen(false)}>Sign Up</Link>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">E-Commerce</Link>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <NavLinks />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-full right-0 bg-gray-800  p-4 shadow-lg space-y-2 flex flex-col items-end pr-10`}>
          <NavLinks />
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};