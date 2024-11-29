import React from 'react';
import { useCart } from '../context/CartContext';
import { Card, CardHeader, CardContent, Input, Button  } from '@mui/material';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardContent className="flex items-center p-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mr-4" />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-20 mr-4"
                    />
                    <Button 
                      onClick={() => removeFromCart(item.id)}
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="mt-6 text-right">
            <p className="text-2xl font-bold">
              Total: ${getTotal().toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};