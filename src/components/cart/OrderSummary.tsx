import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Tag, Download } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePDF } from 'react-to-pdf';
import { toast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import { useCart } from './CartProvider';
import { CartItem } from './CartProvider';
import { UserDetails } from '@/utils/userDetailsStorage';

interface OrderSummaryProps {
  total: number;
  shipping: number;
  finalTotal: number;
  subtotal: number;
  hasNewsletterDiscount?: boolean;
  newsletterDiscount?: number;
  userDetails: UserDetails | null;
  cartItems: CartItem[];
  onEditDetails?: () => void;
  onDeleteDetails?: () => void;
  onApplyDiscount?: (code: string) => void;
}

const OrderSummary = ({ 
  total, 
  shipping, 
  finalTotal,
  subtotal,
  hasNewsletterDiscount,
  newsletterDiscount = 0,
  userDetails,
  cartItems,
  onEditDetails,
  onDeleteDetails,
  onApplyDiscount
}: OrderSummaryProps) => {
  const { toPDF, targetRef } = usePDF({
    filename: 'commande-fiori.pdf'
  });

  const handleGeneratePDF = async () => {
    try {
      await toPDF();
      toast({
        title: "PDF généré avec succès",
        description: "Votre résumé de commande a été téléchargé",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 mb-6"
      ref={targetRef}
    >
      <h2 className="text-xl font-medium mb-4 text-black">Résumé de la commande</h2>
      
      {userDetails && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-black">Adresse de livraison</h3>
            <div className="flex gap-2">
              {onEditDetails && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEditDetails}
                  className="text-[#700100] hover:bg-[#700100] hover:text-white"
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
              )}
              {onDeleteDetails && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDeleteDetails}
                  className="text-red-600 hover:bg-red-600 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer
                </Button>
              )}
            </div>
          </div>
          <div className="text-black space-y-1">
            <p>{userDetails.firstName} {userDetails.lastName}</p>
            <p>{userDetails.address}</p>
            <p>{userDetails.zipCode} {userDetails.country}</p>
            <p>{userDetails.phone}</p>
            <p>{userDetails.email}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-black border-b pb-4">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                {item.size && <p className="text-sm text-gray-600">Taille: {item.size}</p>}
                {item.color && <p className="text-sm text-gray-600">Couleur: {item.color}</p>}
                {item.personalization && (
                  <p className="text-sm text-gray-600">Personnalisation: {item.personalization}</p>
                )}
              </div>
            </div>
            <p className="font-medium text-black">{(item.price * item.quantity).toFixed(2)} TND</p>
          </div>
        ))}
      </div>

      {onApplyDiscount && (
        <div className="flex gap-2 mt-6">
          <Input
            type="text"
            placeholder="Code promo"
            className="flex-1"
          />
          <Button
            onClick={() => onApplyDiscount('CODE')}
            className="bg-[#700100] hover:bg-[#590000] text-white"
          >
            <Tag className="w-4 h-4 mr-2" />
            Appliquer
          </Button>
        </div>
      )}

      <div className="space-y-3 mt-6">
        <div className="flex justify-between text-black">
          <span>Sous-total</span>
          <span>{subtotal.toFixed(2)} TND</span>
        </div>
        
        {hasNewsletterDiscount && newsletterDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Réduction newsletter (5%)</span>
            <span>-{newsletterDiscount.toFixed(2)} TND</span>
          </div>
        )}
        
        <div className="flex justify-between text-black">
          <span>Livraison</span>
          <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} TND`}</span>
        </div>
        
        <div className="flex justify-between font-medium text-lg pt-3 border-t border-gray-100 text-black">
          <span>Total</span>
          <span>{finalTotal.toFixed(2)} TND</span>
        </div>
      </div>

      <Button
        onClick={handleGeneratePDF}
        className="w-full mt-6 bg-[#700100] hover:bg-[#590000] text-white"
      >
        <Download className="w-4 h-4 mr-2" />
        Télécharger le résumé PDF
      </Button>
    </motion.div>
  );
};

export default OrderSummary;