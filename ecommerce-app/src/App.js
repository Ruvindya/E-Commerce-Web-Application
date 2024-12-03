import './App.css';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation, PrivateRoute } from './components/AppNav';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="h-screen w-screen  min-h-screen bg-gray-100">
          <Navigation />
          <ToastContainer />
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
      </Router>
    </Provider>
  );
}

export default App;