
import React from 'react';
import { Calendar, Truck, StickyNote, Clock } from 'lucide-react';
import { UserDetails } from '@/utils/userDetailsStorage';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DeliveryDetailsProps {
  userDetails: UserDetails;
}

const DeliveryDetails = ({ userDetails }: DeliveryDetailsProps) => {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  // Format the preferred delivery information if available
  const hasDeliveryPreference = userDetails.preferredDeliveryDate || userDetails.preferredDeliveryTimeSlot;
  
  // Format note with delivery preferences if any
  const getFormattedNotes = () => {
    let notes = [];
    
    // Add the user's original note if it exists and is not the default "-"
    if (userDetails.orderNote && userDetails.orderNote !== '-' && userDetails.orderNote !== '') {
      notes.push(userDetails.orderNote);
    }
    
    return notes.join('\n');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 mb-6"
    >
      <h2 className="text-xl font-medium mb-4 text-[#471818]">Détails de livraison</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2 text-black">Adresse de livraison</h3>
          <p className="text-black">
            {userDetails.firstName} {userDetails.lastName}<br />
            {userDetails.address}<br />
            {userDetails.zipCode} {userDetails.country}<br />
            {userDetails.phone}
          </p>
          {userDetails.orderNote && userDetails.orderNote !== '-' && userDetails.orderNote !== '' && (
            <div className="mt-4">
              <h3 className="font-medium mb-2 flex items-center gap-2 text-black">
                <StickyNote size={20} />
                Note de commande
              </h3>
              <p className="text-black italic">{getFormattedNotes()}</p>
            </div>
          )}
        </div>
        <div className="space-y-4">
          {hasDeliveryPreference ? (
            <>
              {userDetails.preferredDeliveryDate && (
                <div>
                  <h3 className="font-medium mb-2 text-black">Date de livraison préférée</h3>
                  <div className="flex items-center gap-2 text-black">
                    <Calendar size={20} className="text-[#700100]" />
                    <span>{format(userDetails.preferredDeliveryDate, 'dd MMMM yyyy', { locale: fr })}</span>
                  </div>
                </div>
              )}
              
              {userDetails.preferredDeliveryTimeSlot && (
                <div>
                  <h3 className="font-medium mb-2 text-black">Horaire préféré</h3>
                  <div className="flex items-center gap-2 text-black">
                    <Clock size={20} className="text-[#700100]" />
                    <span>{userDetails.preferredDeliveryTimeSlot}</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div>
              <h3 className="font-medium mb-2 text-black">Date de livraison estimée</h3>
              <div className="flex items-center gap-2 text-black">
                <Calendar size={20} />
                <span>{estimatedDelivery.toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-black">
            <Truck size={20} />
            <span>Livraison standard</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeliveryDetails;
