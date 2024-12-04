import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { selectUser } from '../store/authSlice';
import { Card, CardContent, Button , CardMedia} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {

    if (!user?.id) {
      toast.error('Please login.', {

      onClick: () => navigate('/login')
      });
      return;
    }
    const productWithUserId = { ...product, userId: user.id };

    dispatch(addToCart(productWithUserId));
    toast.success('Item added to cart!', {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

    });
  };

  

  return (
    <Card key={product.id}>
            <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ 
                    height: 260,  
                    objectFit: 'cover',
                    padding: '8px', 
                    borderRadius: '8px'  
                }}
            /> 
            <CardContent>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold mt-2">LKR {product.price}</p>
              <button 
                onClick={() => handleAddToCart(product)}
                className=" bg-gray-800 text-white text-sm py-1 px-2 mt-2 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Add to Cart
              </button>
            </CardContent>
          </Card>
  );
};