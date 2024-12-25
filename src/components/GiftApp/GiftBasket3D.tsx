import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { Gift, Plus, Package, X } from 'lucide-react';
import { playTickSound } from '@/utils/audio';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductDetailModal from '../ProductDetailModal';

interface GiftBasket3DProps {
  items: (Product & { size?: string; quantity?: number })[];
  onItemDrop?: (item: Product, size?: string, quantity?: number) => void;
  onItemClick?: (item: Product) => void;
  onItemRemove?: (itemId: number) => void;
}

const GiftBasket3D = ({ items, onItemDrop, onItemClick, onItemRemove }: GiftBasket3DProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [draggedProduct, setDraggedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const product = JSON.parse(e.dataTransfer.getData('product'));
    setDraggedProduct(product);
    setShowSizeDialog(true);
  };

  const handleConfirmSize = () => {
    if (draggedProduct && selectedSize && onItemDrop) {
      playTickSound();
      onItemDrop(draggedProduct, selectedSize, selectedQuantity);
      setShowSizeDialog(false);
      setDraggedProduct(null);
      setSelectedSize('');
      setSelectedQuantity(1);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleRemoveItem = (itemId: number) => {
    if (onItemRemove) {
      onItemRemove(itemId);
      playTickSound();
    }
  };

  return (
    <>
      <motion.div 
        className={`relative h-[500px] w-full rounded-2xl overflow-hidden border transition-all duration-300 ${
          isDraggingOver 
            ? 'border-[#700100] shadow-2xl bg-white/95' 
            : 'border-gray-100 shadow-xl bg-white/90'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-6 h-full overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {items.length > 0 ? (
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                    onClick={() => handleProductClick(item)}
                    className="group relative bg-white rounded-xl shadow-sm p-4 border border-gray-50 hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(item.id);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-red-50 hover:bg-red-100 transition-colors z-10"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                    <motion.div 
                      className="aspect-square rounded-lg overflow-hidden bg-gray-50 mb-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                    <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-[#700100] transition-colors">
                      {item.name}
                    </h4>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-[#700100] font-semibold">{item.price} TND</p>
                      <span className="text-xs text-gray-500">Taille: {item.size}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="flex flex-col items-center justify-center h-full text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    scale: isDraggingOver ? 1.1 : 1,
                  }}
                  transition={{
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    scale: {
                      duration: 0.2,
                    },
                  }}
                  className="mb-4"
                >
                  <Package className="w-20 h-20 text-[#700100] mx-auto" />
                </motion.div>
                <h3 className="text-xl font-medium text-[#700100] mb-2">
                  Composez Votre Pack
                </h3>
                <p className="text-gray-500 max-w-sm">
                  Glissez et déposez vos articles préférés ici pour créer votre pack personnalisé
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isDraggingOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#700100]/5 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="bg-white/90 rounded-full p-6 shadow-2xl"
              >
                <Plus className="w-12 h-12 text-[#700100]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Dialog open={showSizeDialog} onOpenChange={setShowSizeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sélectionnez la taille et la quantité</DialogTitle>
            <DialogDescription>
              Choisissez la taille et la quantité souhaitées pour votre article
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <Label htmlFor="size" className="text-base">Taille</Label>
              <Select
                value={selectedSize}
                onValueChange={setSelectedSize}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez une taille" />
                </SelectTrigger>
                <SelectContent>
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label htmlFor="quantity" className="text-base">Quantité</Label>
              <Select
                value={selectedQuantity.toString()}
                onValueChange={(value) => setSelectedQuantity(Number(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez la quantité" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <SelectItem key={qty} value={qty.toString()}>
                      {qty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowSizeDialog(false);
                setDraggedProduct(null);
              }}
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirmSize}
              disabled={!selectedSize}
              className="bg-[#700100] hover:bg-[#590000] text-white"
            >
              Confirmer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {selectedProduct && (
        <ProductDetailModal
          isOpen={showProductModal}
          onClose={() => {
            setShowProductModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default GiftBasket3D;