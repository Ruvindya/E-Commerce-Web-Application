import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { selectUser } from '../store/authSlice';
import { Card, CardContent, Button , CardMedia} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleAddToCart = (product) => {

    if (!user?.id) {
      toast.error('Please log in to add items to your cart.');

      return;
    }
    const productWithUserId = { ...product, userId: user.id };



    dispatch(addToCart(productWithUserId));
    toast.success('Item added to cart!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      // className: 'custom-toast',
      // progressClassName: 'custom-progress-bar'
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
              <Button 
                onClick={() => handleAddToCart(product)}
                className="w-full mt-4"
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
  );
};