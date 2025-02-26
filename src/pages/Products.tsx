
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Leaf, Award, Eye } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  icon: JSX.Element;
  active: boolean;
}

const Products = () => {
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([
    { id: 'organic', label: 'Bio', icon: <Leaf className="w-4 h-4" />, active: false },
    { id: 'fairTrade', label: 'Commerce Équitable', icon: <Award className="w-4 h-4" />, active: false },
  ]);

  const toggleFilter = (id: string) => {
    setActiveFilters(filters =>
      filters.map(filter =>
        filter.id === id ? { ...filter, active: !filter.active } : filter
      )
    );
  };

  const handleConsult = (productId: number) => {
    // Navigate to product detail page
    window.location.href = `/product/${productId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F0]/50 to-white/50 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-playfair text-[#700100] mb-4">
            Nos Produits
          </h1>
          <div className="w-24 h-1 bg-[#96cc39] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de dattes premium et produits dérivés, 
            soigneusement sélectionnés pour leur qualité exceptionnelle.
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -left-3 -top-3 w-20 h-20 bg-[#96cc39]/10 rounded-full blur-xl"></div>
            <div className="absolute -right-3 -bottom-3 w-20 h-20 bg-[#700100]/10 rounded-full blur-xl"></div>
            
            <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#700100]/90 backdrop-blur-md p-2 rounded-lg">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-playfair text-xl text-[#700100]">Affiner votre recherche</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {activeFilters.map((filter) => (
                  <motion.button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative w-full group ${
                      filter.active 
                        ? 'bg-[#96cc39]/80 backdrop-blur-md' 
                        : 'bg-white/30 backdrop-blur-sm'
                    } rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-300
                    border border-white/50 hover:border-white/80`}
                  >
                    <div className={`relative z-10 p-2 rounded-full 
                      ${filter.active 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white/10 text-[#700100] group-hover:bg-[#96cc39]/10'
                      } transition-colors duration-300`}>
                      {filter.icon}
                    </div>
                    <span className={`relative z-10 text-sm font-medium
                      ${filter.active ? 'text-white' : 'text-[#700100]'}`}>
                      {filter.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item * 0.1 }}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl">
                <div className="relative">
                  <img
                    src={`https://source.unsplash.com/800x600/?dates,fruits/${item}`}
                    alt="Product"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-[#96cc39]/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Leaf className="w-3 h-3" />
                      Bio
                    </span>
                    <span className="bg-[#700100]/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Équitable
                    </span>
                  </div>
                </div>
                
                <div className="pt-6 pb-4 px-2">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-playfair text-[#700100]">
                      Dattes Premium
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConsult(item)}
                      className="text-[#700100] flex items-center gap-2 hover:text-[#96cc39] transition-colors duration-300"
                    >
                      <span className="text-sm font-medium">Consulter</span>
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Des dattes d'exception, cultivées avec passion et récoltées à la main 
                    pour préserver toute leur saveur.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
