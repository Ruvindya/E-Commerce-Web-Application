
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectWishlist } from '../store/wishlistSlice';
import { ProductCard } from './ProductCard';

export const WishlistPage = () => {
  const wishlist = useSelector(selectWishlist);
  const dispatch = useDispatch();

  if (wishlist.length === 0) {
    return <div className='p-10'>Your wishlist is empty.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
        //   <ProductCard key={product.id} product={product}  />
        <ProductCard product={product} isWishlistPage={true} />
        ))}
      </div>
    </div>
  );
};

