import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../store/authSlice';
import { selectCart } from '../store/cartSlice';
import { ShoppingCart, Menu, X, LogOut as LogOutIcon, Heart  } from 'lucide-react';
import { useState, useEffect, useRef  } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logoutModalRef = useRef(null);

  useEffect(() => {
    try {
      const updateCount = (e) => setCartCount(e.detail.count);
      window.addEventListener('updateCartCount', updateCount);
  
      const userItems = cart.filter(item => item.userId === user?.id).length;
      setCartCount(userItems);
  
      const handleClickOutside = (event) => {
        if (logoutModalRef.current && !logoutModalRef.current.contains(event.target)) {
          setShowLogoutModal(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        window.removeEventListener('updateCartCount', updateCount);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    } catch (error) {
      console.error("Error in useEffect:", error);
      toast.error('An error occurred while setting up event listeners.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [cart, user]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogoutClick = () => {
      console.log("Logout button clicked");
      setShowLogoutModal(!showLogoutModal);
    };

    const handleConfirmLogout = async () => {
      try {
        console.log("Logout confirm button clicked");
        await dispatch(logout());
        
        // Show success toast
        toast.success('LogOut Success', {
          position: "top-right",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          setShowLogoutModal(false);
          setIsOpen(false);
        }, 1000);
      } catch (error) {
        console.error("Logout failed", error);
        toast.error('LogOut Failed. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    const LogoutModal = () => (
      <div 
        ref={logoutModalRef}
        className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 text-gray-800 z-50"
        style={{ minWidth: '200px' }}
      >
        <div className="p-4">
          <div className="text-sm font-medium mb-2">Logged in as:</div>
          <div className="text-sm text-gray-600 mb-4 break-all">{user?.email}</div>
          <button
            onClick={handleConfirmLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            <LogOutIcon className="w-4 h-4" />
            Confirm Logout
          </button>
        </div>
      </div>
    );
    
  const NavLinks = () => (
    <>
      {user ? (
        <>
          <div className="text-sm mb-2 md:mb-0 md:text-base">Welcome {user.email}</div>
          <Link to="/products" className="block py-2 md:py-0" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/wishlist"><Heart className="w-5 h-5  transition-colors" /></Link>
          <Link to="/cart" className="relative inline-flex items-center py-2 md:py-0" onClick={() => setIsOpen(false)}>
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <div className="relative">
            <button 
              onClick={handleConfirmLogout} 
              className="hover:bg-gray-700 px-3 py-1 rounded w-full md:w-auto text-right md:text-center flex items-center gap-2"
            >
              <LogOutIcon className="w-4 h-4" />
              Logout
            </button>
            {showLogoutModal && <LogoutModal />}
          </div>
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
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-full right-0 bg-gray-800 p-4 shadow-lg space-y-2 flex flex-col items-end pr-10`}>
          <NavLinks />
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;