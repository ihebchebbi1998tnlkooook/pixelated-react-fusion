
import React from 'react';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const formatPrice = (price: number | undefined): string => {
    if (price === undefined || price === null || isNaN(price)) {
      return '0.00';
    }
    return price.toFixed(2);
  };

  const formattedDescription = product.description?.split('\\n').map((line, index) => (
    <p key={index} className="text-gray-600 py-1">{line.trim()}</p>
  )) || [];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-[#700100] mb-2">
          {product.name}
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Référence: {product.reference}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-[#700100]">
          {formatPrice(product.price)} TND
        </span>
        {product.discount_product && (
          <Badge variant="destructive" className="bg-red-500">
            -{product.discount_product}%
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
          <div className="text-gray-600 space-y-1">
            {formattedDescription}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Matière:</span>
            <span className="ml-2 text-gray-600">{product.material}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Couleur:</span>
            <span className="ml-2 text-gray-600">{product.color}</span>
          </div>
        </div>

        {product.status === 'in_stock' && (
          <div className="flex items-center gap-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">En stock</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
