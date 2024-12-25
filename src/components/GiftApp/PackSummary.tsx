import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Package2, ShoppingBag, Gift, PenLine } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface PackSummaryProps {
  items: (Product & { size?: string; quantity?: number })[];
  note: string;
  onNoteChange: (note: string) => void;
  onItemClick?: (product: Product) => void;
}

const PackSummary = ({
  items,
  note,
  onNoteChange,
  onItemClick,
}: PackSummaryProps) => {
  const totalPrice = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 space-y-4 shadow-xl border border-gray-100"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Gift className="w-5 h-5 text-[#700100]" />
          <h2 className="text-lg font-medium text-gray-900">Résumé du Pack</h2>
        </div>
        <motion.div 
          className="flex items-center gap-2 bg-[#700100]/5 px-3 py-1.5 rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          <ShoppingBag className="w-4 h-4 text-[#700100]" />
          <span className="text-sm font-semibold text-[#700100]">{items.length} articles</span>
        </motion.div>
      </div>
      
      <ScrollArea className="h-[250px] pr-4">
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onClick={() => onItemClick?.(item)}
                className="group flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-50">
                  <motion.img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain p-1.5"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <motion.p 
                    className="font-medium text-sm text-gray-900 truncate group-hover:text-[#700100] transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {item.name}
                  </motion.p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      Taille: {item.size}
                    </span>
                    <span className="text-xs text-gray-500">
                      Qté: {item.quantity || 1}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#700100] font-semibold whitespace-nowrap">
                  {(item.price * (item.quantity || 1)).toFixed(2)} TND
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <Separator className="my-4" />
      
      <div className="flex justify-between items-center text-base font-medium p-3 rounded-lg bg-gradient-to-r from-[#700100]/5 to-[#700100]/10">
        <span className="text-gray-700">Total</span>
        <motion.span 
          key={totalPrice}
          initial={{ scale: 1.2, color: '#700100' }}
          animate={{ scale: 1, color: '#1a1a1a' }}
          className="text-lg font-semibold"
        >
          {totalPrice.toFixed(2)} TND
        </motion.span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <PenLine className="w-4 h-4 text-[#700100]" />
          <Label htmlFor="note" className="text-sm text-gray-700 font-medium">Message Personnel</Label>
        </div>
        <Textarea
          id="note"
          placeholder="Ajoutez votre message personnalisé ici..."
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          className="min-h-[80px] bg-white/80 backdrop-blur-sm border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-[#700100]/20 focus:border-[#700100] transition-all duration-300"
        />
      </div>
    </motion.div>
  );
};

export default PackSummary;