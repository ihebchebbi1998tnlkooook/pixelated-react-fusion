import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export const Contact = () => {
  const contactDetails = [
    {
      icon: <Phone className="h-6 w-6 text-gray-500" />,
      label: 'Téléphone',
      value: '+216 53 418 355',
    },
    {
      icon: <Mail className="h-6 w-6 text-gray-500" />,
      label: 'Email',
      value: 'contact@tazart.tn',
    },
    {
      icon: <Clock className="h-6 w-6 text-gray-500" />,
      label: 'Heures d\'ouverture',
      value: 'Du lundi au vendredi, 9h-17h',
    },
    {
      icon: <MapPin className="h-6 w-6 text-gray-500" />,
      label: 'Adresse',
      value: 'Sfax, Tunisie',
    },
  ];

  return (
    <div className="bg-[#F8F7F4] min-h-screen flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden md:flex"
        >
          {/* Contact Information Section */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-playfair text-[#700100] font-semibold mb-6">
              Contactez-nous
            </h2>
            <p className="text-gray-600 mb-8">
              N'hésitez pas à nous contacter pour toute question ou demande d'information.
              Notre équipe est à votre disposition pour vous répondre dans les plus brefs délais.
            </p>
            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                <div className="mr-4">{item.icon}</div>
                <div>
                  <span className="block font-medium text-gray-700">{item.label}:</span>
                  <span className="text-gray-600">{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="md:w-1/2 bg-[#F8F7F4] p-8">
            <h3 className="text-2xl font-playfair text-[#700100] font-semibold mb-6">
              Formulaire de contact
            </h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Votre nom"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Votre email"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Votre message"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-[#96cc39] hover:bg-[#7db341] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
