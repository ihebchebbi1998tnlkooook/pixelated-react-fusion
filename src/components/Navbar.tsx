import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Youtube, Globe, Phone, Mail, MapPin, Building2, Users } from 'lucide-react';
import type { ClientType, NavItem, Language } from '../types';
import ProductsDropdown from './navigation/ProductsDropdown';

interface NavbarProps {
  clientType: ClientType;
  onPageChange: (page: string) => void;
  currentPage: string;
  onClientTypeChange: (type: ClientType) => void;
}

const B2C_ITEMS: NavItem[] = [
  { label: 'Acceuil', href: 'home' },
  { label: 'À propos', href: 'about' },
  { label: 'Nos Revendeurs', href: 'resellers' },
  { label: 'Nos Certifications', href: 'certifications' },
  { label: 'Contact', href: 'contact' },
];

const B2B_ITEMS: NavItem[] = B2C_ITEMS.filter(item => item.label !== 'Nos Revendeurs');

const Navbar = ({ clientType, onPageChange, currentPage, onClientTypeChange }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navItems = clientType === 'B2B' ? B2B_ITEMS : B2C_ITEMS;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    onPageChange(href);
    setIsOpen(false);
  };

  const ClientTypeSwitcher = () => (
    <div className="flex items-center bg-white/5 rounded-full p-0.5 shadow-sm border border-white/10">
      <button
        onClick={() => onClientTypeChange('B2C')}
        className={`flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
          clientType === 'B2C' 
            ? 'bg-[#96cc39]/90 text-white shadow-sm' 
            : 'text-white/80 hover:text-[#96cc39] hover:bg-white/5'
        }`}
      >
        <Users size={12} className="mr-1" />
        B2C
      </button>
      <button
        onClick={() => onClientTypeChange('B2B')}
        className={`flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
          clientType === 'B2B' 
            ? 'bg-[#96cc39]/90 text-white shadow-sm' 
            : 'text-white/80 hover:text-[#96cc39] hover:bg-white/5'
        }`}
      >
        <Building2 size={12} className="mr-1" />
        B2B
      </button>
    </div>
  );

  return (
    <header className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      {/* Top Bar */}
      <div className="bg-[#64381b] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            {/* Contact Info */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="tel:+21612345678" className="flex items-center space-x-2 text-sm hover:text-[#96cc39] transition-colors">
                <Phone size={14} />
                <span>+216 12 345 678</span>
              </a>
              <a href="mailto:contact@example.com" className="flex items-center space-x-2 text-sm hover:text-[#96cc39] transition-colors">
                <Mail size={14} />
                <span>contact@example.com</span>
              </a>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin size={14} />
                <span>Ben Arous, Tunisia</span>
              </div>
            </div>
            
            {/* Social Links & Language & Client Type Switcher */}
            <div className="flex items-center space-x-6 ml-auto">
              <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="hover:text-[#96cc39] transition-all duration-300 hover:scale-110">
                  <Instagram size={16} />
                </a>
                <a href="#" className="hover:text-[#96cc39] transition-all duration-300 hover:scale-110">
                  <Facebook size={16} />
                </a>
                <a href="#" className="hover:text-[#96cc39] transition-all duration-300 hover:scale-110">
                  <Youtube size={16} />
                </a>
              </div>
              <div className="hidden md:block h-4 w-px bg-white/20" />
              <ClientTypeSwitcher />
              <div className="hidden md:block h-4 w-px bg-white/20" />
              <button
                onClick={() => setLanguage(lang => lang === 'en' ? 'fr' : 'en')}
                className="hidden md:flex items-center space-x-1 hover:text-[#96cc39] transition-all duration-300 text-sm"
              >
                <Globe size={16} />
                <span>{language.toUpperCase()}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden mr-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#96cc39] hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Logo */}
            <a href="#" onClick={(e) => handleNavClick('home', e)} className="flex items-center">
              <img
                src="https://i.ibb.co/Rp6QnpSt/logo.webp"
                alt="Logo"
                className="h-16 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              onClick={(e) => handleNavClick('home', e)}
              className={`text-gray-700 transition-all duration-300 font-medium relative group py-2
                ${currentPage === 'home' ? 'text-[#96cc39]' : 'hover:text-[#96cc39]'}`}
            >
              Accueil
            </a>
            
            {/* Products Dropdown */}
            <ProductsDropdown />
            
            {/* Other Nav Items */}
            {navItems.slice(1).map((item) => (
              <a
                key={item.href}
                href="#"
                onClick={(e) => handleNavClick(item.href, e)}
                className={`text-gray-700 transition-all duration-300 font-medium relative group py-2
                  ${currentPage === item.href ? 'text-[#96cc39]' : 'hover:text-[#96cc39]'}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#96cc39] transform transition-transform origin-left
                  ${currentPage === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <div className={`
          fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <img
                src="https://i.ibb.co/Rp6QnpSt/logo.webp"
                alt="Logo"
                className="h-12 w-auto"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#96cc39] hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href="#"
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`block text-lg font-medium transition-colors
                    ${currentPage === item.href ? 'text-[#96cc39]' : 'text-gray-700 hover:text-[#96cc39]'}`}
                >
                  {item.label}
                </a>
              ))}
              
              <hr className="border-gray-200 my-6" />
              
              <div className="flex justify-center mb-6">
                <ClientTypeSwitcher />
              </div>
              
              <div className="space-y-4">
                <a href="tel:+21612345678" className="flex items-center space-x-3 text-gray-600 hover:text-[#96cc39] transition-colors">
                  <Phone size={18} />
                  <span>+216 12 345 678</span>
                </a>
                <a href="mailto:contact@example.com" className="flex items-center space-x-3 text-gray-600 hover:text-[#96cc39] transition-colors">
                  <Mail size={18} />
                  <span>contact@example.com</span>
                </a>
              </div>
              
              <div className="flex items-center space-x-4 mt-6">
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#96cc39] hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#96cc39] hover:text-white transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#96cc39] hover:text-white transition-colors">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
