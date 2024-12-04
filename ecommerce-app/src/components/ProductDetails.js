import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { selectUser } from '../store/authSlice';
import { selectProductById } from '../store/productSlice';
import { toast } from 'react-toastify';
import { Card, CardMedia, Grid2 } from '@mui/material';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  const product = useSelector((state) => selectProductById(state, parseInt(id)));

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
      toast.success('Item added to cart!');
    } catch(error) {
      console.error('Error handling Add to cart:', error);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
    <button 
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
    >
      <ArrowLeft className="w-5 h-5" />
      Back to Products
    </button>

    <div className="flex flex-col md:flex-row gap-6">
      {/* Image Section */}
      <div className="flex-1">
        <Card className="h-full">
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{ 
              height: 400,
              objectFit: 'cover',
              padding: '16px',
              borderRadius: '16px'
            }}
          />
        </Card>
      </div>

      {/* Product Details Section */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
        </div>

        <div className="border-t border-b py-4">
          <p className="text-3xl font-bold">LKR {product.price}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleAddToCart(product)}
            className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
          
          <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Additional product details */}
        <div className="space-y-4 pt-6">
          <h3 className="font-semibold text-lg">Product Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-gray-600">Category</div>
            <div>{product.category}</div>
            {/* Add more product details as needed */}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};