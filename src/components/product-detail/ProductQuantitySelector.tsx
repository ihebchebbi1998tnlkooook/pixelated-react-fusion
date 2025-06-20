
import React from 'react';
import { toast } from '@/hooks/use-toast';
import { getAvailableStockForSize } from '@/utils/stockValidation';
import { Product } from '@/types/product';

interface ProductQuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  selectedSize: string;
  product: Product;
}

const ProductQuantitySelector = ({ 
  quantity, 
  setQuantity, 
  selectedSize, 
  product 
}: ProductQuantitySelectorProps) => {
  const handleQuantityChange = (newQuantity: number) => {
    // For products that don't require size selection
    const noSizeProducts = ['portefeuilles', 'porte-cles', 'porte-cartes'];
    const requiresSize = !noSizeProducts.includes(product.itemgroup_product);

    if (requiresSize && !selectedSize) {
      toast({
        title: "Veuillez sélectionner une taille",
        description: "Une taille doit être sélectionnée avant de modifier la quantité",
        variant: "destructive",
      });
      return;
    }

    const availableStock = requiresSize 
      ? getAvailableStockForSize(product, selectedSize)
      : product.quantity;
    
    if (newQuantity > availableStock) {
      toast({
        title: "Quantité non disponible",
        description: `Stock disponible: ${availableStock}`,
        duration: 3000,
      });
      setQuantity(availableStock);
      return;
    }

    if (newQuantity < 1) {
      setQuantity(1);
      return;
    }

    setQuantity(newQuantity);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-base font-semibold text-gray-900">Quantité</span>
        <span className="text-sm text-gray-600">Stock total: {product.quantity}</span>
      </div>
      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 w-fit">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className="p-1 rounded-md text-black text-[38px]"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="w-8 text-center font-medium text-gray-900">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="p-1 rounded-md text-black text-[38px]"
          disabled={!selectedSize && !['portefeuilles', 'porte-cles', 'porte-cartes'].includes(product.itemgroup_product)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductQuantitySelector;
