'use client';

import { useState, useContext, useEffect } from 'react';
import ProductDetails from '@/components/ProductDetails';
import RecentlyViewed from '@/components/RecentlyViewed';
import { CartContext } from '@/context/CartContext';

export default function ProductDetailsWrapper({ product }) {
  const { addToCart } = useContext(CartContext);

  // fix/BUG 1: No default color selected
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || '');
  const [selectedSize, setSelectedSize] = useState('');

  //fix/BUG 2: Always shows first variant's sizes regardless of selected color
  const availableSizesForColor = product.variants.find(variant => variant.color === selectedColor)?.sizes || [];

  // BUG 6: Empty dependency array - won't reset when color changes
  useEffect(() => {
    setSelectedSize('');
  }, []);

  // BUG 5: Only checks size, not color
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    addToCart(product, selectedColor, selectedSize);
  };

  return (
    <>
      <ProductDetails
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorSelect={setSelectedColor}
        onSizeSelect={setSelectedSize}
        onAddToCart={handleAddToCart}
        availableSizesForColor={availableSizesForColor}
      />
      <RecentlyViewed />
    </>
  );
}
