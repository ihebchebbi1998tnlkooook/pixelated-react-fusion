
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface PaymentButtonsProps {
  subtotal: number;
  shipping: number;
  finalTotal: number;
  hasNewsletterDiscount: boolean;
  newsletterDiscount: number;
}

const PaymentButtons = ({
  subtotal,
  shipping,
  finalTotal,
  hasNewsletterDiscount,
  newsletterDiscount
}: PaymentButtonsProps) => {
  return (
    <div className="space-y-3 mt-4">
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        className="text-center text-sm text-gray-500 mb-2"
      >
        Votre commande est en cours de traitement.
      </motion.div>
      
      <Button
        disabled
        className="w-full bg-[#700100] text-white px-4 py-3 rounded-md opacity-60 cursor-not-allowed"
      >
        Paiement déjà effectué
      </Button>
      
      <div className="flex items-center justify-center gap-2 p-2 rounded-md">
        <img 
          src="https://i.ibb.co/PG8cC0sd/Image-News-Get.jpg" 
          alt="Konnect Payment Provider" 
          className="h-8 object-contain"
          style={{ background: 'transparent' }}
        />
        <span className="text-xs text-gray-600 font-medium">
          Paiement via Konnect 100% sécurisé
        </span>
      </div>
    </div>
  );
};

export default PaymentButtons;
