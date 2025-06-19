
import React from 'react';
import { motion } from 'framer-motion';
import { UserDetails } from '@/utils/userDetailsStorage';
import PaymentButtons from '@/components/order/PaymentButtons';
import { Pencil, Trash2, StickyNote } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { useCart } from '@/components/cart/CartProvider';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  finalTotal: number;
  hasNewsletterDiscount: boolean;
  newsletterDiscount: number;
}

const OrderSummary = ({
  subtotal,
  shipping,
  finalTotal,
  hasNewsletterDiscount,
  newsletterDiscount
}: OrderSummaryProps) => {
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 mt-6 border border-gray-100"
    >
      <h2 className="text-xl font-serif text-[#1A1F2C] mb-6">Résumé de la commande</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-[#8E9196]">
          <span>Sous-total</span>
          <span>{subtotal.toFixed(2)} TND</span>
        </div>
        
        {hasNewsletterDiscount && newsletterDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Réduction newsletter (-5%)</span>
            <span>-{newsletterDiscount.toFixed(2)} TND</span>
          </div>
        )}

        <div className="flex justify-between text-[#8E9196]">
          <span>Livraison</span>
          <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} TND`}</span>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between text-lg font-medium text-[#1A1F2C]">
            <span>Total</span>
            <span>{finalTotal.toFixed(2)} TND</span>
          </div>
          <p className="text-xs text-[#8E9196] mt-1">TVA incluse</p>
        </div>
      </div>
      
      <PaymentButtons
        subtotal={subtotal}
        shipping={shipping}
        finalTotal={finalTotal}
        hasNewsletterDiscount={hasNewsletterDiscount}
        newsletterDiscount={newsletterDiscount}
      />

      <div className="mt-6 space-y-2 text-sm text-[#8E9196]">
        <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
          • Livraison gratuite à partir de 299 TND
        </p>
        <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
          • Échange de produit sous 30 jours ( 4 TND )
        </p>
        <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
          • Service client disponible 24/7
        </p>
        <p className="flex items-center gap-2 hover:text-[#1A1F2C] transition-colors">
          • Livraison mondial disponible
        </p>
        <div className="flex justify-left items-center gap-4 mt-2">
          <img src="https://i.ibb.co/pPLzH9L/image.png" alt="Payment Methods" className="h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
