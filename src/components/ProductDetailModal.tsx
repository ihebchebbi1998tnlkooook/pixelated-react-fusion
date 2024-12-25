import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, X, Star, Store } from 'lucide-react';
import { useCart } from './cart/CartProvider';
import { useToast } from "@/hooks/use-toast";
import { playTickSound } from '../utils/audio';
import { motion } from 'framer-motion';
import ColorSelector from './product-detail/ColorSelector';
import SizeSelector from './product-detail/SizeSelector';
import QuantitySelector from './product-detail/QuantitySelector';
import PersonalizationButton from './product-detail/PersonalizationButton';
import { getPersonalizations } from '@/utils/personalizationStorage';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    material: string;
    color: string;
    price: number;
    image: string;
    description: string;
    status: string;
  };
}

const ProductDetailModal = ({ isOpen, onClose, product }: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [personalization, setPersonalization] = useState(() => {
    const savedPersonalizations = getPersonalizations();
    return savedPersonalizations[product.id] || '';
  });
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Veuillez sélectionner une taille",
        description: "Une taille doit être sélectionnée avant d'ajouter au panier",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: product.color,
      personalization: personalization
    });

    playTickSound();
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name} (${selectedSize}) ajouté avec succès`,
      duration: 5000,
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[600px] p-0 bg-white rounded-lg shadow-xl overflow-hidden mx-auto">
        <div className="flex flex-col md:flex-row max-h-[80vh]">
          {/* Left Column - Image */}
          <div className="w-full md:w-1/2 relative bg-gray-50 p-4">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute right-4 top-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors z-10"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-[#700100] text-[#700100]' : 'text-gray-400'}`} />
            </button>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="w-full md:w-1/2 p-4 overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 font-['WomanFontBold']">{product.name}</h2>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-[#700100]">{product.price} TND</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <SizeSelector
                selectedSize={selectedSize}
                sizes={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
                onSizeSelect={setSelectedSize}
              />

              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-900">Quantité</span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrement={() => setQuantity(q => q + 1)}
                  onDecrement={() => setQuantity(q => q > 1 ? q - 1 : 1)}
                />
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-[#700100] hover:bg-[#590000] text-white py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                disabled={product.status !== 'En stock'}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="font-medium">
                  {product.status === 'En stock' ? 'Ajouter au panier' : 'Produit épuisé'}
                </span>
              </Button>

              <div className="text-sm text-gray-600 space-y-2">
                <p><span className="font-medium">Matière:</span> {product.material}</p>
                <p><span className="font-medium">Couleur:</span> {product.color}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;