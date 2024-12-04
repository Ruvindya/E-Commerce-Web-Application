import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { selectUser } from '../store/authSlice';
import { Card, CardContent, Button , CardMedia} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (product) => {
    try {
      
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
    }catch(error) {
      console.error('Error handling Add to cart in product card:', error);
    }

    
  };

  

  return (
    <Card key={product.id} onClick={handleCardClick}>
            <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ 
                    height: 150,  
                    objectFit: 'cover',
                    padding: '8px', 
                    borderRadius: '8px'  
                }}
            /> 
            <CardContent>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold mt-2">LKR {product.price}</p>
              {/* <button 
                onClick={() => handleAddToCart(product)}
                className=" bg-gray-800 text-white text-sm py-1 px-2 mt-2 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Add to Cart
              </button> */}
              <div className="flex gap-4 mt-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleAddToCart(product); 
                  }}
                  
                  className="bg-gray-800 text-white text-sm py-1 px-2 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Add to Cart
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // this is uuse for preventing the card click from firing when the heart is clicked
                    
                  }}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
              </div>
              
            </CardContent>
          </Card>
  );
};