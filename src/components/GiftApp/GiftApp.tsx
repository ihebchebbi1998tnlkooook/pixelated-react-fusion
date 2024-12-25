import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useCart } from "../cart/CartProvider";
import { toast } from "@/components/ui/use-toast";
import { playTickSound } from "@/utils/audio";
import ProductSelectionPanel from "./ProductSelectionPanel";
import GiftBasket3D from "./GiftBasket3D";
import PackSummary from "./PackSummary";
import ConfirmationButton from "./ConfirmationButton";
import { Product } from "@/types/product";
import ProductDetailModal from "../ProductDetailModal";

export interface GiftPack {
  items: (Product & { size?: string; quantity?: number })[];
  totalPrice: number;
  note?: string;
}

const GiftApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<(Product & { size?: string; quantity?: number })[]>([]);
  const [packNote, setPackNote] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleItemDrop = (item: Product, size?: string, quantity: number = 1) => {
    setSelectedItems((prev) => [...prev, { ...item, size, quantity }]);
    playTickSound();
    toast({
      title: "Article Ajouté! 🎁",
      description: "N'oubliez pas que vous pouvez ajouter un message personnalisé à votre cadeau!",
      duration: 5000,
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleItemRemove = (itemId: number) => {
    setSelectedItems((prev) => prev.filter(item => item.id !== itemId));
    toast({
      title: "Article Retiré",
      description: "L'article a été retiré de votre pack cadeau",
      duration: 5000,
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleConfirmPack = async () => {
    const invalidItems = selectedItems.filter(item => !item.size);
    if (invalidItems.length > 0) {
      toast({
        title: "Attention!",
        description: "Veuillez sélectionner une taille pour tous les articles",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);
    
    for (const item of selectedItems) {
      await new Promise(resolve => setTimeout(resolve, 500));
      addToCart({
        ...item,
        quantity: item.quantity || 1,
        personalization: packNote,
        size: item.size || 'M', // Fallback size if somehow missing
      });
    }

    toast({
      title: "Pack Ajouté au Panier! 🎉",
      description: "Souhaitez-vous procéder au paiement?",
      duration: 5000,
      action: (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-[#700100] px-4 py-2 rounded-md font-medium"
          onClick={() => navigate('/cart')}
        >
          Voir le Panier
        </motion.button>
      ),
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-white to-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-[#700100] border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-[#700100] font-medium">Création de votre pack cadeau...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductSelectionPanel onItemDrop={handleItemDrop} />
          </motion.div>

          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GiftBasket3D 
              items={selectedItems}
              onItemDrop={handleItemDrop}
              onItemClick={handleProductClick}
              onItemRemove={handleItemRemove}
            />
          </motion.div>

          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PackSummary
              items={selectedItems}
              note={packNote}
              onNoteChange={setPackNote}
              onItemClick={handleProductClick}
            />
            <ConfirmationButton
              onConfirm={handleConfirmPack}
              disabled={selectedItems.length === 0}
            />
          </motion.div>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default GiftApp;
