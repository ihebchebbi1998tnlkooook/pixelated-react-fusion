
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductActions from './ProductActions';

interface ProductDetailContainerProps {
  product: Product;
  onProductAdded: (productName: string) => void;
}

const ProductDetailContainer = ({ product, onProductAdded }: ProductDetailContainerProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(product.color || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [personalization, setPersonalization] = useState<string>('');

  const handleInitialAddToCart = () => {
    console.log('Adding to cart:', { selectedSize, selectedColor, quantity, personalization });
    onProductAdded(product.name);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto p-6"
    >
      <div className="space-y-4">
        <ProductImage product={product} />
      </div>
      
      <div className="space-y-6">
        <ProductInfo product={product} />
        <ProductActions 
          handleInitialAddToCart={handleInitialAddToCart}
          product={product}
          selectedSize={selectedSize}
        />
      </div>
    </motion.div>
  );
};

export default ProductDetailContainer;
