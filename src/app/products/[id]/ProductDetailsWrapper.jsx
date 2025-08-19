"use client";

import { useState, useContext, useEffect } from 'react';
import ProductDetails from '@/components/ProductDetails';
import RecentlyViewed from '@/components/RecentlyViewed';
import { CartContext } from '@/context/CartContext';
import useSWR from "swr";
import { fetchProductById } from '@/data/products';

export default function ProductDetailsWrapper({ productId }) {
  const { addToCart } = useContext(CartContext);

  const fetcher = async (id) => {
  console.log("Fetching product from API:", id);
  return fetchProductById(id);
};
  const { data: product, error } = useSWR(productId, fetcher, {
    dedupingInterval: 5 * 60 * 1000, // 5 min cache
  });

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Set default color when product loads
  useEffect(() => {
    if (product) {
      setSelectedColor(product.variants[0]?.color || '');
    }
  }, [product]);

  // Reset size whenever color changes
  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

  const availableSizesForColor = product?.variants.find(
    variant => variant.color === selectedColor
  )?.sizes || [];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    addToCart(product, selectedColor, selectedSize);
  };

  if (error) return <div>Failed to load product</div>;
  if (!product) return <div>Loading...</div>;

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
