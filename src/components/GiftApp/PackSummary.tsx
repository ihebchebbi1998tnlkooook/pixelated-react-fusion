import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Package2, ShoppingBag } from 'lucide-react';

interface PackSummaryProps {
  items: Product[];
  note: string;
  onNoteChange: (note: string) => void;
}

const PackSummary = ({
  items,
  note,
  onNoteChange,
}: PackSummaryProps) => {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 space-y-6 shadow-xl border border-gray-100"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package2 className="w-6 h-6 text-[#700100]" />
          <h2 className="text-xl font-medium text-gray-900">Résumé</h2>
        </div>
        <div className="flex items-center gap-2 bg-[#700100]/5 px-4 py-2 rounded-full">
          <ShoppingBag className="w-5 h-5 text-[#700100]" />
          <span className="font-semibold text-[#700100]">{items.length} articles</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl backdrop-blur-sm border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shadow-sm">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-[#700100]">{item.price.toFixed(2)} TND</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <Separator className="my-6" />
        
        <div className="flex justify-between items-center text-lg font-medium bg-[#700100]/5 p-4 rounded-xl">
          <span className="text-gray-700">Total</span>
          <motion.span 
            key={totalPrice}
            initial={{ scale: 1.2, color: '#700100' }}
            animate={{ scale: 1, color: '#1a1a1a' }}
            className="text-xl font-semibold"
          >
            {totalPrice.toFixed(2)} TND
          </motion.span>
        </div>

        <div className="space-y-3 mt-6">
          <Label htmlFor="note" className="text-gray-700 font-medium">Message Personnel</Label>
          <Textarea
            id="note"
            placeholder="Ajoutez votre message personnalisé ici..."
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            className="min-h-[100px] bg-white/80 backdrop-blur-sm border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-[#700100]/20 focus:border-[#700100]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PackSummary;