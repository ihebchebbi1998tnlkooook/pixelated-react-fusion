
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Premium Dates</h4>
            <p className="text-gray-400">
              Nous sommes spécialisés dans l'exportation de dattes tunisiennes de qualité supérieure.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-gray-300 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-gray-300 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-gray-300 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-gray-300 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Utiles</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300 transition">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition">
                  Produits
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos Produits</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300 transition">
                  Dattes Deglet Nour
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition">
                  Dattes Medjool
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition">
                  Dattes Branchées
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition">
                  Produits Dérivés
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles et offres.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none"
              />
              <button className="bg-[#96cc39] hover:bg-[#64381b] text-white px-4 py-2 rounded-r-md transition">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Premium Dates. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
