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
        cartItemId: item.cartItemId, 
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
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
          {userCart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {userCart.map((item) => (
                <Card key={item.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-gray-600">${item.price}</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                            className="w-20"
                          />
                          <Button 
                            onClick={() => {
                              setItemToConfirm(item);
                              setIsDialogOpen(true);
                            }}
                            variant="contained"
                            color="error"
                            className="w-full sm:w-auto"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <div className="w-full sm:w-auto text-left sm:text-right mt-4 sm:mt-0">
                        <p className="text-xl font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        <div className="w-full lg:w-1/3 bg-gray-50 rounded-lg p-6">
          <div className="sticky top-4">
            <div className="text-lg mb-4">Items in Cart: {userCart.length}</div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-2xl font-bold">Total:</p>
              <p className="text-2xl font-bold">${userTotal.toFixed(2)}</p>
            </div>
            <button className="w-full bg-gray-800 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Make Payment
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={isDialogOpen}
        onClose={handleCancelRemove}
        className="sm:max-w-lg mx-auto"
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
    </div>
  );
};

export default Cart;