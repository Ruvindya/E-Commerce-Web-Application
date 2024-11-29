import React from 'react';
import { useCart } from '../context/CartContext';
import { Card, CardHeader, CardContent, Button , CardMedia} from '@mui/material';
import { images } from '../assets';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  console.log("product.image===", product.image)

  

  return (
    <Card>
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
      {/* <CardHeader>

      <img 
          src={product.image}
          alt={product.name} 
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = "/api/placeholder/200/200"; // Fallback image if the URL fails
          }}
        />
      </CardHeader> */}

      <CardContent>
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-lg font-bold mt-2">${product.price}</p>

        <Button 
          onClick={() => addToCart(product)}
          className="w-full mt-4"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};