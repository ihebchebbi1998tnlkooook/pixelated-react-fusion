import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Certifications = () => {
  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-32 pb-16">
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

      {/* Certifications Grid */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* ISO Certification */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="ISO Certification"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <Shield className="absolute top-4 right-4 w-8 h-8 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-playfair text-[#700100] mb-3">Certification ISO 22000</h3>
              <p className="text-gray-600 leading-relaxed">
                Notre certification ISO 22000 témoigne de notre engagement envers la sécurité alimentaire 
                et la qualité de nos produits. Nous suivons rigoureusement les normes internationales 
                pour garantir l'excellence à chaque étape de notre production.
              </p>
            </div>
          </motion.div>

          {/* Bio Certification */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Bio Certification"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <Award className="absolute top-4 right-4 w-8 h-8 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-playfair text-[#700100] mb-3">Agriculture Biologique</h3>
              <p className="text-gray-600 leading-relaxed">
                Notre certification Bio garantit des produits 100% naturels, cultivés dans le respect 
                de l'environnement. Nous sélectionnons méticuleusement nos ingrédients pour vous 
                offrir le meilleur de la nature.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

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
            Chaque produit qui sort de nos ateliers est le fruit d'un savoir-faire traditionnel conjugué aux 
            normes de qualité les plus strictes.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Notre processus de production est régulièrement audité et certifié par des organismes indépendants, 
            garantissant ainsi la qualité exceptionnelle de nos produits. C'est cette quête permanente de 
            l'excellence qui nous permet de vous offrir des produits authentiques et de première qualité.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Certifications;
