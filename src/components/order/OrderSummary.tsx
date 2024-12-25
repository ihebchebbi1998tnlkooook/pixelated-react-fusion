import React, { useRef } from 'react';
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
    filename: `order-summary-${Date.now()}.pdf`,
    page: { margin: 20 }
  });

  const handleDownloadPDF = () => {
    toPDF()
      .then(() => {
        toast({
          title: "PDF téléchargé avec succès",
          description: "Votre résumé de commande a été téléchargé",
          style: {
            backgroundColor: '#700100',
            color: 'white',
            border: '1px solid #590000',
          },
        });
      })
      .catch(() => {
        toast({
          title: "Erreur lors du téléchargement",
          description: "Une erreur est survenue lors de la génération du PDF",
          variant: "destructive",
        });
      });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 mb-6"
      ref={targetRef}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-[#471818]">Résumé de la commande</h2>
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
        <div className="mb-6 space-y-4">
          <h3 className="font-medium text-[#471818] mb-2">Articles commandés</h3>
          {items.map((item, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-[#471818]">{item.name}</h4>
                  <div className="text-sm text-gray-600 mt-1">
                    {item.size && <span className="mr-3">Taille: {item.size}</span>}
                    <span>Quantité: {item.quantity}</span>
                  </div>
                  {item.personalization && (
                    <div className="mt-2 text-sm bg-gray-50 p-2 rounded-md">
                      <span className="font-medium">Personnalisation:</span> {item.personalization}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-medium text-[#700100]">
                    {(item.price * item.quantity).toFixed(2)} TND
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {giftNote && (
        <div className="mb-6 bg-[#F8F8F8] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-4 h-4 text-[#700100]" />
            <h3 className="font-medium text-[#471818]">Message du Pack Cadeau</h3>
          </div>
          <p className="text-gray-600 italic">{giftNote}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Sous-total</span>
            <span>{subtotal.toFixed(2)} TND</span>
          </div>
          
          {hasNewsletterDiscount && newsletterDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Réduction newsletter (-5%)</span>
              <span>-{newsletterDiscount.toFixed(2)} TND</span>
            </div>
          )}

          <div className="flex justify-between text-gray-600">
            <span>Livraison</span>
            <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} TND`}</span>
          </div>
          
          <div className="flex justify-between font-medium text-lg pt-3 border-t border-gray-100">
            <span>Total</span>
            <span className="text-[#700100]">{finalTotal.toFixed(2)} TND</span>
          </div>
        </div>

        {userDetails && (
          <div className="bg-[#F8F8F8] rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-[#471818] mb-2">Informations de livraison</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{userDetails.firstName} {userDetails.lastName}</p>
              <p>{userDetails.address}</p>
              <p>{userDetails.city}, {userDetails.postalCode}</p>
              <p>Tél: {userDetails.phone}</p>
              <p>Email: {userDetails.email}</p>
            </div>
          </div>
        )}

        <div className="bg-[#F8F8F8] rounded-lg p-4 space-y-3">
          <h3 className="font-medium text-[#471818] mb-2">Informations importantes</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#700100]" />
              <span>Livraison gratuite à partir de 500 TND</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#700100]" />
              <span>Livraison express disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#700100]" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#700100]" />
              <span>Retours gratuits sous 14 jours</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;