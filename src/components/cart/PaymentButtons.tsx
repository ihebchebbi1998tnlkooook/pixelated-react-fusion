import React, { useState } from 'react';
import { CreditCard, DollarSign, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { initKonnectPayment } from '@/services/konnectApi';
import { savePaymentMethod } from '@/utils/orderDataCollector';
import ReserviInfoModal from '@/components/modals/ReserviInfoModal';

interface PaymentButtonsProps {
  enabled: boolean;
  cartItems: any[];
  userDetails: any;
  total: number;
  shipping: number;
  finalTotal: number;
  hasPersonalization: boolean;
}

// Set to true to use bypass payment for testing
const BYPASS_PAYMENT = false;

const PaymentButtons = ({ 
  enabled, 
  cartItems, 
  userDetails, 
  finalTotal,
  hasPersonalization
}: PaymentButtonsProps) => {
  const navigate = useNavigate();
  const [isReserviModalOpen, setIsReserviModalOpen] = useState(false);

  const handleKonnectPayment = async (paymentType = 'card') => {
    if (!enabled || !userDetails) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir vos coordonnées d'abord",
        variant: "destructive",
      });
      return;
    }

    if (finalTotal <= 0) {
      toast({
        title: "Erreur",
        description: "Le montant du paiement doit être supérieur à 0",
        variant: "destructive",
      });
      return;
    }

    // Save the payment method
    savePaymentMethod(paymentType as 'card' | 'cash' | 'reservi');

    // For Reservi, we only charge 50% upfront
    const paymentAmount = paymentType === 'reservi' ? finalTotal * 0.5 : finalTotal;
    
    console.log(`Payment process started with amount: ${paymentAmount} (${paymentType})`);

    try {
      const orderId = `ORDER-${Date.now()}`;

      if (BYPASS_PAYMENT) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Reduced timeout

        sessionStorage.setItem('pendingOrder', JSON.stringify({
          cartItems,
          orderId,
          payUrl: 'test-mode',
          paymentType
        }));

        navigate('/payment-success');
      } else {
        console.log('Initiating real payment process with Konnect');
        const response = await initKonnectPayment({
          amount: Math.round(paymentAmount * 100) / 100,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          orderId,
        });

        console.log('Konnect payment response:', response);

        if (!response || !response.payUrl) {
          throw new Error('Invalid payment URL received from Konnect');
        }

        sessionStorage.setItem('pendingOrder', JSON.stringify({
          cartItems,
          orderId,
          payUrl: response.payUrl,
          paymentType
        }));

        window.location.href = response.payUrl;
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      
      let errorMessage = "Une erreur s'est produite lors de l'initialisation du paiement.";
      if (error.message.includes('Invalid amount')) {
        errorMessage = "Le montant du paiement est invalide.";
      }
      
      toast({
        title: "Erreur de paiement",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleCashPayment = async () => {
    if (!enabled || !userDetails) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir vos coordonnées d'abord",
        variant: "destructive",
      });
      return;
    }

    if (finalTotal <= 0) {
      toast({
        title: "Erreur",
        description: "Le montant du paiement doit être supérieur à 0",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save the payment method
      savePaymentMethod('cash');
      
      const orderId = `ORDER-${Date.now()}`;

      // Store order details without Konnect payment URL
      sessionStorage.setItem('pendingOrder', JSON.stringify({
        cartItems,
        orderId,
        payUrl: '-',  // No Konnect URL for cash payments
        paymentType: 'cash'
      }));

      // Navigate to success page
      navigate('/payment-success');
      
    } catch (error: any) {
      console.error('Cash payment error:', error);
      
      toast({
        title: "Erreur de traitement",
        description: "Une erreur s'est produite lors du traitement de votre commande.",
        variant: "destructive",
      });
    }
  };

  const handleOpenReserviModal = () => {
    setIsReserviModalOpen(true);
  };

  const handleReserviPayment = async () => {
    // Call handleKonnectPayment with 'reservi' as the payment type
    setIsReserviModalOpen(false);
    handleKonnectPayment('reservi');
  };

  return (
    <div className="space-y-3">
      {hasPersonalization && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-2">
          <p className="text-sm text-amber-700 font-medium text-center">
            Les produits personnalisés nécessitent le paiement en ligne direct
          </p>
        </div>
      )}
      
      <motion.button
        initial={{ opacity: 0.5 }}
        animate={{ opacity: enabled ? 1 : 0.5 }}
        whileHover={enabled ? { scale: 1.02 } : {}}
        onClick={() => handleKonnectPayment('card')}
        disabled={!enabled}
        className="w-full bg-[#700100] text-white px-4 py-3 rounded-md hover:bg-[#591C1C] transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
      >
        <CreditCard size={20} />
        {BYPASS_PAYMENT ? 
          `Payer (Mode Test) (${finalTotal.toFixed(2)} TND)` : 
          `Payer avec carte bancaire (${finalTotal.toFixed(2)} TND)`}
      </motion.button>

      <motion.button
        initial={{ opacity: 0.5 }}
        animate={{ opacity: enabled ? 1 : 0.5 }}
        whileHover={enabled ? { scale: 1.02 } : {}}
        onClick={handleOpenReserviModal}
        disabled={!enabled || hasPersonalization}
        className="w-full bg-[#555555] text-white px-4 py-3 rounded-md hover:bg-[#444444] transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
      >
        <ShoppingBag size={20} />
        {`Reservi by Fiori (${(finalTotal * 0.5).toFixed(2)} TND maintenant)`}
      </motion.button>

      <div className="flex items-center justify-center gap-2 p-2 rounded-md">
        <img 
          src="https://i.ibb.co/PG8cC0sd/Image-News-Get.jpg" 
          alt="Konnect Payment Provider" 
          className="h-8 object-contain"
          style={{ background: 'transparent' }}
          onError={(e) => {
            // Fallback if image URL doesn't work
            const target = e.target as HTMLImageElement;
            target.src = "https://www.konnect.network/images/konnect-logo.svg";
            target.onerror = null;
          }}
        />
        <span className="text-xs text-gray-600 font-medium">
          Paiement via Konnect 100% sécurisé
        </span>
      </div>

      <motion.button
        initial={{ opacity: 0.5 }}
        animate={{ opacity: enabled && !hasPersonalization ? 1 : 0.5 }}
        whileHover={enabled && !hasPersonalization ? { scale: 1.02 } : {}}
        onClick={handleCashPayment}
        disabled={!enabled || hasPersonalization}
        className="w-full bg-[#444444] text-white px-4 py-3 rounded-md hover:bg-[#333333] transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
      >
        <DollarSign size={20} />
        {`Payer en espèces (${finalTotal.toFixed(2)} TND)`}
      </motion.button>
      
      {hasPersonalization && (
        <p className="text-xs text-amber-600 mt-1 text-center">
          Le paiement en espèces et Reservi ne sont pas disponibles pour les articles personnalisés.
        </p>
      )}
      
      <ReserviInfoModal
        isOpen={isReserviModalOpen}
        onClose={() => setIsReserviModalOpen(false)}
        onProceed={handleReserviPayment}
        total={finalTotal}
      />
    </div>
  );
};

export default PaymentButtons;
