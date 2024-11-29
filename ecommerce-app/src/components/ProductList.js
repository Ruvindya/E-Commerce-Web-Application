import React from 'react';
import { useCart } from '../context/CartContext';
import { Card, CardHeader, CardContent, Input, Button  } from '@mui/material';

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 99.99,
    description: 'This is product 1',
    image: '/api/placeholder/200/200'
  },
  {
    id: 2,
    name: 'Product 2',
    price: 149.99,
    description: 'This is product 2',
    image: '/api/placeholder/200/200'
  },
  
];

export const ProductList = () => {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {products.map((product) => (
          <Card key={product.id}>

            <CardHeader>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            </CardHeader>

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
        ))}
      </div>
    </div>
  );
};