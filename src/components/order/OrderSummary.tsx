import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, CreditCard, Clock, Download, Gift, PenLine, Trash2, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { usePDF } from 'react-to-pdf';
import { toast } from "@/components/ui/use-toast";
import { CartItem } from '@/components/cart/CartProvider';
import { UserDetails } from '@/utils/userDetailsStorage';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  finalTotal: number;
  hasNewsletterDiscount?: boolean;
  newsletterDiscount?: number;
  items: CartItem[];
  userDetails: UserDetails | null;
  giftNote?: string;
  onEditDetails?: () => void;
  onDeleteDetails?: () => void;
  onApplyDiscount?: (code: string) => void;
}

const OrderSummary = ({
  subtotal,
  shipping,
  finalTotal,
  hasNewsletterDiscount,
  newsletterDiscount = 0,
  items,
  userDetails,
  giftNote,
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
      className="bg-white p-6 rounded-lg shadow-sm space-y-6"
      ref={targetRef}
    >
      <h2 className="text-xl font-medium text-black">Résumé de la commande</h2>

      {userDetails && (
        <div className="border-b border-gray-200 pb-4">
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
                  <PenLine className="w-4 h-4 mr-1" />
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
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-black">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm">Quantité: {item.quantity}</p>
                {item.size && <p className="text-sm">Taille: {item.size}</p>}
                {item.color && <p className="text-sm">Couleur: {item.color}</p>}
                {item.personalization && (
                  <p className="text-sm">Personnalisation: {item.personalization}</p>
                )}
              </div>
            </div>
            <p className="font-medium">{(item.price * item.quantity).toFixed(2)} DT</p>
          </div>
        ))}
      </div>

      {giftNote && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2 text-black mb-2">
            <Gift className="w-5 h-5" />
            <h3 className="font-medium">Note cadeau</h3>
          </div>
          <p className="text-black italic">{giftNote}</p>
        </div>
      )}

      {onApplyDiscount && (
        <div className="flex gap-2 border-t border-gray-200 pt-4">
          <input
            type="text"
            placeholder="Code promo"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#700100]"
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

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-black">
          <span>Sous-total</span>
          <span>{subtotal.toFixed(2)} DT</span>
        </div>
        {hasNewsletterDiscount && (
          <div className="flex justify-between text-green-600">
            <span>Réduction newsletter (5%)</span>
            <span>-{newsletterDiscount.toFixed(2)} DT</span>
          </div>
        )}
        <div className="flex justify-between text-black">
          <span>Frais de livraison</span>
          <span>{shipping === 0 ? 'Gratuit' : `${shipping.toFixed(2)} DT`}</span>
        </div>
        <div className="flex justify-between font-medium text-lg text-black pt-2 border-t">
          <span>Total</span>
          <span>{finalTotal.toFixed(2)} DT</span>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-black">
          <Truck className="w-5 h-5" />
          <span>Livraison estimée sous 3-5 jours ouvrables</span>
        </div>
        <div className="flex items-center gap-2 text-black">
          <CreditCard className="w-5 h-5" />
          <span>Paiement sécurisé</span>
        </div>
      </div>

      <Button
        onClick={handleGeneratePDF}
        className="w-full bg-[#700100] hover:bg-[#590000] text-white"
      >
        <Download className="w-4 h-4 mr-2" />
        Télécharger le résumé PDF
      </Button>
    </motion.div>
  );
};

export default OrderSummary;