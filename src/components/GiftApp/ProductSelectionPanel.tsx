import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { Input } from "@/components/ui/input";
import { Product } from '@/types/product';
import { Search, Package2, GripVertical } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductSelectionPanelProps {
  onItemDrop: (item: Product) => void;
}

const ProductSelectionPanel = ({ onItemDrop }: ProductSelectionPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [draggedItem, setDraggedItem] = useState<Product | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts
  });

  const categories = ['tous', 'costume', 'veste', 'chemise', 'accessoire'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'tous' || product.category_product.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Product) => {
    e.dataTransfer.setData('product', JSON.stringify(item));
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-gray-100"
    >
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/50 border-gray-200 focus:border-[#700100] focus:ring-[#700100]/20 transition-all duration-300"
          />
        </div>

        <ScrollArea className="h-[50px]">
          <div className="flex gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-[#700100] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className="h-[500px]">
          <div className="grid grid-cols-2 gap-4 pr-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                draggable
                onDragStart={(e) => handleDragStart(e, product)}
                onDragEnd={handleDragEnd}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group bg-white rounded-lg shadow-sm p-4 cursor-grab active:cursor-grabbing border border-gray-100/50 hover:shadow-md transition-all ${
                  draggedItem?.id === product.id ? 'opacity-50' : ''
                }`}
              >
                <div className="relative">
                  <GripVertical className="absolute top-0 right-0 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                  <motion.div className="relative h-32 mb-2">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </motion.div>
                  <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-[#700100] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#700100] font-medium mt-1">{product.price} TND</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
};

export default ProductSelectionPanel;