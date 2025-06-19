
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { CreditCard, Truck, Info } from 'lucide-react';

interface ReserviInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  total: number;
}

const ReserviInfoModal = ({ isOpen, onClose, onProceed, total }: ReserviInfoModalProps) => {
  const halfAmount = (total * 0.5).toFixed(2);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-[95vw] overflow-hidden bg-white rounded-lg shadow-lg border-0">
        <DialogHeader className="space-y-3">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto"
          >
            <Info className="h-8 w-8 text-gray-600" />
          </motion.div>
          <DialogTitle className="text-xl font-serif text-center text-[#1A1F2C]">
            Reservi by Fiori
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <p className="text-center text-gray-700">
            Reservi by Fiori vous permet de payer en deux fois :
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#f8f8f8] p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#700100] flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-black">50% maintenant</h3>
              </div>
              <p className="text-sm text-gray-600 pl-12">
                Payez <span className="font-bold">{halfAmount} TND</span> par carte bancaire aujourd'hui
              </p>
            </div>
            
            <div className="bg-[#f8f8f8] p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#555555] flex items-center justify-center">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-black">50% à la livraison</h3>
              </div>
              <p className="text-sm text-gray-600 pl-12">
                Payez le reste <span className="font-bold">{halfAmount} TND</span> en espèces à la livraison
              </p>
            </div>
          </div>
          
          <div className="text-sm text-center text-gray-500 mt-4 px-2">
            Profitez de cette option flexible pour répartir votre paiement tout en recevant rapidement votre commande.
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Annuler
          </Button>
          <Button
            onClick={onProceed}
            className="w-full sm:w-auto bg-[#555555] hover:bg-[#444444] order-1 sm:order-2"
          >
            Procéder au paiement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReserviInfoModal;
