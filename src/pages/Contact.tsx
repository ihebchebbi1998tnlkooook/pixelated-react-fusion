import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Send, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Wrapper component to access map instance
const MapController = ({ onMapReady }: { onMapReady: (map: L.Map) => void }) => {
  const map = useMap();
  
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  
  return null;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const BEN_AROUS_POSITION: [number, number] = [36.7533, 10.2222];

const BUSINESS_HOURS = [
  { day: 'Lundi - Vendredi', hours: '8h30 - 18h30', isOpen: true },
  { day: 'Samedi', hours: '9h00 - 13h00', isOpen: true },
  { day: 'Dimanche', hours: 'Fermé', isOpen: false },
];

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [map, setMap] = useState<L.Map | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMapReady = useCallback((map: L.Map) => {
    setMap(map);
  }, []);

  const validateForm = () => {
    const errors: Partial<FormData> = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) errors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) errors.email = 'L\'email est requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) errors.phone = 'Le téléphone est requis';
    else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      errors.phone = 'Numéro de téléphone invalide';
    }
    if (!formData.message.trim()) errors.message = 'Le message est requis';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setFormErrors({});
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div 
            className={`text-center mb-16 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-gray-900 relative inline-block">
              Contactez-nous
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#96cc39] transform origin-left transition-transform duration-1000 delay-500 scale-x-100"></span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              Notre équipe est à votre écoute pour répondre à toutes vos questions.
              N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Phone,
                title: 'Téléphone',
                subtitle: 'Service client disponible',
                info: '+216 12 345 678',
                link: 'tel:+21612345678',
                color: '#96cc39',
                delay: 200,
              },
              {
                icon: Mail,
                title: 'Email',
                subtitle: 'Réponse sous 24h',
                info: 'contact@example.com',
                link: 'mailto:contact@example.com',
                color: '#64381b',
                delay: 400,
              },
              {
                icon: MapPin,
                title: 'Adresse',
                subtitle: 'Showroom & Bureau',
                info: 'Ben Arous, Tunisia',
                color: '#96cc39',
                delay: 600,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-500 transform hover:-translate-y-1 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <div className={`w-12 h-12 bg-opacity-10 rounded-full flex items-center justify-center mb-4`}
                     style={{ backgroundColor: `${item.color}20` }}>
                  <item.icon style={{ color: item.color }} />
                </div>
                <h3 className="font-playfair text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-3">{item.subtitle}</p>
                {item.link ? (
                  <a
                    href={item.link}
                    className="hover:underline transition-colors"
                    style={{ color: item.color }}
                  >
                    {item.info}
                  </a>
                ) : (
                  <span style={{ color: item.color }}>{item.info}</span>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Contact Form */}
            <div 
              className={`bg-white rounded-xl p-8 shadow-lg transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <h2 className="text-2xl font-playfair mb-6 flex items-center">
                <Send className="mr-3 text-[#96cc39]" />
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        formErrors.firstName ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#96cc39] focus:border-transparent transition-all`}
                      placeholder="Votre prénom"
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        formErrors.lastName ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#96cc39] focus:border-transparent transition-all`}
                      placeholder="Votre nom"
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        formErrors.email ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#96cc39] focus:border-transparent transition-all`}
                      placeholder="votre@email.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        formErrors.phone ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-2 focus:ring-[#96cc39] focus:border-transparent transition-all`}
                      placeholder="+216 XX XXX XXX"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#96cc39] focus:border-transparent transition-all"
                    placeholder="Le sujet de votre message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formErrors.message ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-[#96cc39] focus:border-transparent transition-all resize-none`}
                    placeholder="Votre message..."
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#96cc39] to-[#7ba32f] text-white font-medium
                    flex items-center justify-center space-x-2
                    transform transition-all duration-300
                    ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:translate-y-[-2px] hover:shadow-lg'}
                  `}
                >
                  <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                  <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
                </button>

                {submitted && (
                  <div className="bg-green-50 text-green-800 rounded-lg p-4 animate-scale-in flex items-center">
                    <CheckCircle2 className="text-green-500 mr-2" size={20} />
                    <span>Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Map & Hours */}
            <div 
              className={`space-y-8 transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {/* Map */}
              <div className="bg-white rounded-xl p-8 shadow-lg relative">
                <h2 className="text-2xl font-playfair mb-6 flex items-center">
                  <MapPin className="mr-3 text-[#96cc39]" />
                  Notre localisation
                </h2>
                
                <div className="h-[300px] w-full rounded-lg overflow-hidden mb-6 shadow-inner relative z-10">
                  <MapContainer 
                    center={BEN_AROUS_POSITION} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                  >
                    <MapController onMapReady={handleMapReady} />
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={BEN_AROUS_POSITION}>
                      <Popup>
                        <div className="font-medium">Premium Dates</div>
                        <div className="text-sm text-gray-600">Ben Arous, Tunisia</div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="space-y-4">
                  {BUSINESS_HOURS.map((schedule, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                        schedule.isOpen ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{schedule.day}</span>
                      <span
                        className={
                          schedule.isOpen ? 'text-[#96cc39]' : 'text-gray-500'
                        }
                      >
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
