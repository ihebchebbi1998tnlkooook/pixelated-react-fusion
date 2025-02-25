
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Award, CheckCircle, X } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useState } from 'react';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const certifications = [
    {
      id: 1,
      title: "Certification ISO 22000",
      image: "/lovable-uploads/72f91537-d0c3-4173-95e8-7d864598b156.png",
      description: "Notre certification ISO 22000 témoigne de notre engagement envers la sécurité alimentaire et la qualité de nos produits."
    },
    {
      id: 2,
      title: "Agriculture Biologique",
      image: "/lovable-uploads/72f91537-d0c3-4173-95e8-7d864598b156.png",
      description: "Notre certification Bio garantit des produits 100% naturels, cultivés dans le respect de l'environnement."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-32 pb-16 relative">
      <Helmet>
        <title>Nos Certifications | Tazart - Qualité Certifiée</title>
        <meta name="description" content="Découvrez les certifications de qualité de Tazart, garantissant l'excellence de nos produits traditionnels tunisiens." />
      </Helmet>

      {/* Header with Logo */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 text-center mb-16"
      >
        <img 
          src="https://i.ibb.co/Rp6QnpS/logo.webp" 
          alt="Tazart Logo" 
          className="mx-auto h-32 w-auto mb-8"
        />
        <h1 className="text-4xl font-playfair text-[#700100] mb-4">Nos Certifications</h1>
        <div className="w-24 h-1 bg-[#96cc39] mx-auto"></div>
      </motion.div>

      {/* 3D Frames Grid */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => setSelectedCert(cert.id)}
              className="group relative cursor-pointer perspective"
            >
              <div className="relative transform transition-transform duration-700 preserve-3d group-hover:rotate-y-5 group-hover:rotate-x-5">
                {/* Frame */}
                <div className="absolute inset-0 bg-white rounded-lg shadow-2xl transform translate-z-0">
                  <div className="absolute inset-2 border-8 border-[#f8f7f4] rounded-lg">
                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                      <img 
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
                    </div>
                  </div>
                </div>
                
                {/* 3D Effect Elements */}
                <div className="absolute inset-0 rounded-lg bg-[#96cc39]/20 transform translate-z-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-lg shadow-lg transform -translate-z-2" />
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg transform transition-transform duration-500 group-hover:translate-y-2">
                <h3 className="text-xl font-playfair text-[#700100]">{cert.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Expanded View */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#700100] text-white hover:bg-[#96cc39] transition-colors"
              >
                <X size={24} />
              </button>
              
              {certifications.find(c => c.id === selectedCert) && (
                <div className="space-y-6">
                  <img
                    src={certifications.find(c => c.id === selectedCert)?.image}
                    alt={certifications.find(c => c.id === selectedCert)?.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                  <div className="text-center">
                    <h2 className="text-2xl font-playfair text-[#700100] mb-4">
                      {certifications.find(c => c.id === selectedCert)?.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {certifications.find(c => c.id === selectedCert)?.description}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quality Statement */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container mx-auto px-4 max-w-4xl text-center"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <CheckCircle className="w-12 h-12 text-[#96cc39] mx-auto mb-6" />
          <h2 className="text-3xl font-playfair text-[#700100] mb-6">
            L'Excellence au Cœur de Notre Tradition
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Chez Tazart, la qualité n'est pas simplement une promesse, c'est notre engagement quotidien. 
            Nos certifications témoignent de notre dévouement à l'excellence et à la satisfaction de nos clients.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Notre processus de production est régulièrement audité et certifié par des organismes indépendants, 
            garantissant ainsi la qualité exceptionnelle de nos produits.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Certifications;
