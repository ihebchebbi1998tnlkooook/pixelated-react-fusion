import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, CreditCard, Clock, Download, Gift, PenLine } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { usePDF } from 'react-to-pdf';
import { toast } from "@/components/ui/use-toast";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  finalTotal: number;
  hasNewsletterDiscount?: boolean;
  newsletterDiscount?: number;
  items?: any[];
  userDetails?: any;
  giftNote?: string;
}

const OrderSummary = ({ 
  subtotal, 
  shipping, 
  finalTotal,
  hasNewsletterDiscount = false,
  newsletterDiscount = 0,
  items = [],
  userDetails,
  giftNote
}: OrderSummaryProps) => {
  const { toPDF, targetRef } = usePDF({
    filename: `commande-${Date.now()}.pdf`,
    page: { margin: 20 }
  });

  const handleDownloadPDF = async () => {
    try {
      await toPDF();
      toast({
        title: "PDF téléchargé avec succès",
        description: "Votre résumé de commande a été téléchargé",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
      });
    } catch (error) {
      toast({
        title: "Erreur lors du téléchargement",
        description: "Une erreur est survenue lors de la génération du PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-8 mb-6"
      ref={targetRef}
    >
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-medium text-black">Résumé de la Commande</h2>
        <Button
          onClick={handleDownloadPDF}
          variant="outline"
          className="flex items-center gap-2 text-[#700100] hover:bg-[#700100] hover:text-white transition-all duration-300"
        >
          <Download className="w-4 h-4" />
          Télécharger PDF
        </Button>
      </div>

      {items && items.length > 0 && (
        <div className="mb-8 space-y-4">
          <h3 className="font-medium text-black text-xl mb-4">Articles Commandés</h3>
          {items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-6">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded-lg bg-gray-50"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-black text-lg">{item.name}</h4>
                  <div className="text-sm text-gray-700 mt-2 space-y-1">
                    {item.size && <p>Taille: {item.size}</p>}
                    <p>Quantité: {item.quantity}</p>
                    {item.color && <p>Couleur: {item.color}</p>}
                  </div>
                  {item.personalization && (
                    <div className="mt-3 text-sm bg-gray-50 p-3 rounded-md">
                      <span className="font-medium text-black">Personnalisation:</span>
                      <p className="mt-1 text-gray-700">{item.personalization}</p>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-medium text-[#700100] text-lg">
                    {(item.price * item.quantity).toFixed(2)} TND
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {giftNote && (
        <div className="mb-8 bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-[#700100]" />
            <h3 className="font-medium text-black text-lg">Message du Pack Cadeau</h3>
          </div>
          <p className="text-gray-700 italic">{giftNote}</p>
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between text-gray-700">
            <span>Sous-total</span>
            <span>{subtotal.toFixed(2)} TND</span>
          </div>
          
          {hasNewsletterDiscount && newsletterDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Réduction newsletter (-5%)</span>
              <span>-{newsletterDiscount.toFixed(2)} TND</span>
            </div>
          )}

          <div className="flex justify-between text-gray-700">
            <span>Frais de livraison</span>
            <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} TND`}</span>
          </div>
          
          <div className="flex justify-between font-medium text-xl pt-4 border-t border-gray-200">
            <span className="text-black">Total</span>
            <span className="text-[#700100]">{finalTotal.toFixed(2)} TND</span>
          </div>
        </div>

        {userDetails && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-black text-lg mb-4">Informations de Livraison</h3>
            <div className="space-y-2 text-gray-700">
              <p className="text-black font-medium">{userDetails.firstName} {userDetails.lastName}</p>
              <p>{userDetails.address}</p>
              <p>{userDetails.zipCode} {userDetails.country}</p>
              <p>Téléphone: {userDetails.phone}</p>
              <p>Email: {userDetails.email}</p>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-medium text-black text-lg mb-4">Informations Importantes</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#700100]" />
              <span>Livraison gratuite à partir de 500 TND</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-[#700100]" />
              <span>Livraison express disponible</span>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-[#700100]" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#700100]" />
              <span>Retours gratuits sous 14 jours</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;