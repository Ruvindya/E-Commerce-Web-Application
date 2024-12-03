import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, removeFromCart, updateQuantity } from '../store/cartSlice';
import { selectUser } from '../store/authSlice';
import { 
  Card, 
  CardContent, 
  Button, 
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [itemToConfirm, setItemToConfirm] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = useSelector(selectUser);
  const [userTotal, setUserTotal] = useState(0);
  
  const userCart = cart.filter(item => item.userId === user.id);
  
  useEffect(() => {
    const total = userCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setUserTotal(total);
    const event = new CustomEvent('updateCartCount', { 
      detail: { count: userCart.length }
    });
    window.dispatchEvent(event);
  }, [userCart]);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      setItemToConfirm(item);
      setIsDialogOpen(true);
    } else {
      dispatch(updateQuantity({ 
        id: item.id, 
        quantity: newQuantity 
      }));
    }
  };

  const handleConfirmRemove = () => {
    if (itemToConfirm) {
      dispatch(removeFromCart(itemToConfirm.cartItemId));
    }
    setIsDialogOpen(false);
    setItemToConfirm(null);
  };

  const handleCancelRemove = () => {
    if (itemToConfirm) {
      dispatch(updateQuantity({ 
        id: itemToConfirm.cartItemId, 
        quantity: 1 
      }));
    }
    setIsDialogOpen(false);
    setItemToConfirm(null);
  };

  return (
    <div className="container mx-auto p-4 flex justify-between">
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        {userCart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {userCart.map((item) => (
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
                        onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                        className="w-20 mr-4"
                      />
                      <Button 
                        onClick={() => {
                          setItemToConfirm(item);
                          setIsDialogOpen(true);
                        }}
                        variant="contained"
                        color="error"
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

            <Dialog
              open={isDialogOpen}
              onClose={handleCancelRemove}
            >
              <DialogTitle>Remove Item?</DialogTitle>
              <DialogContent>
                Do you want to remove {itemToConfirm?.name} from your cart?
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelRemove} color="primary">
                  No, Keep Item
                </Button>
                <Button onClick={handleConfirmRemove} color="error" variant="contained">
                  Yes, Remove Item
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>

      <div className="p-8">
        <div className="flex gap-20">
          <div className="text-right">
            <p className="text-2xl font-bold">Total:</p>
          </div>
          <div>
            <p className="text-2xl font-bold">${userTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};