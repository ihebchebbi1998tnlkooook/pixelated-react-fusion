import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { RESELLERS_DATA } from '../config/resellers';

const Revendeurs = () => {
  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-32 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 text-center mb-12"
      >
        <h1 className="text-4xl font-playfair text-[#700100] mb-4">Nos Revendeurs</h1>
        <div className="w-24 h-1 bg-[#96cc39] mx-auto"></div>
        <p className="text-gray-600 mt-4">
          Retrouvez nos produits authentiques chez nos revendeurs partenaires à travers la Tunisie.
        </p>
      </motion.div>

      {/* Resellers List */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {RESELLERS_DATA.map((reseller) => (
            <motion.div
              key={reseller.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={reseller.image}
                alt={reseller.name}
                className="w-full h-52 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#700100] mb-2">{reseller.name}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  {reseller.address}
                </div>
                <a
                  href={`tel:${reseller.phone}`}
                  className="text-[#96cc39] hover:text-[#700100] transition-colors duration-300 block mb-2"
                >
                  {reseller.phone}
                </a>
                <a
                  href={`mailto:${reseller.email}`}
                  className="text-[#96cc39] hover:text-[#700100] transition-colors duration-300 block"
                >
                  {reseller.email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Revendeurs;
