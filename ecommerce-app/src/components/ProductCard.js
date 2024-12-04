import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { selectUser } from '../store/authSlice';
import { Card, CardContent, Button , CardMedia} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { addToWishlist, removeFromWishlist  } from '../store/wishlistSlice';

export const ProductCard = ({ product, isWishlistPage = false }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product)); 
    toast.success('Item added to wishlist!', {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

    });
  };

  const handleRemoveFromWishlist = (product) => {
    dispatch(removeFromWishlist(product));
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);

  };

  const handleAddToCart = (product) => {
    try {
      dispatch(removeFromWishlist(product));
      
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
              <div className="flex gap-4 mt-2 justify-between">
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleAddToCart(product); 
                  }}
                  
                  className="bg-gray-800 text-white text-sm py-1 px-2 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Add to Cart
                </button>

                {isWishlistPage ? (
                  <button
                    onClick={(e) => {e.stopPropagation(); handleRemoveFromWishlist(product);}}
                    className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-colors"
                  >
                    Remove
                  </button>
                ) : (
                  <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWishlist(product); 
                    
                  }}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
                )}
                
                {/* <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWishlist(product); 
                    
                  }}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button> */}
              </div>
              
            </CardContent>
          </Card>
  );
};