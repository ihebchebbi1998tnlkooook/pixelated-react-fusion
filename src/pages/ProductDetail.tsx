
import { motion } from 'framer-motion';
import { ChevronLeft, Leaf, Award } from 'lucide-react';

interface ProductDetailProps {
  onBack?: () => void;
}

const ProductDetail = ({ onBack }: ProductDetailProps) => {
  const nutritionFacts = [
    { name: 'Énergie', value: '277', unit: 'kcal' },
    { name: 'Glucides', value: '75', unit: 'g' },
    { name: 'dont Sucres', value: '63', unit: 'g' },
    { name: 'Protéines', value: '2.5', unit: 'g' },
    { name: 'Matières grasses', value: '0.4', unit: 'g' },
    { name: 'dont Acides gras saturés', value: '0.1', unit: 'g' },
    { name: 'Fibres', value: '8', unit: 'g' },
    { name: 'Sel', value: '0.01', unit: 'g' },
  ];

  const packagingData = [
    {
      designation: 'Coffret cadeau dattes naturelles 1kg en bois',
      paquetsCarton: '10',
      cartonsPalette: '64',
      poidsNetPal: '640',
      poidsBrutPal: '780',
      hteurPal: '1,8',
      palSR: '33',
      palConteneur: '10'
    },
    {
      designation: 'Coffret cadeau dattes naturelles 500g en bois',
      paquetsCarton: '20',
      cartonsPalette: '64',
      poidsNetPal: '640',
      poidsBrutPal: '780',
      hteurPal: '1,8',
      palSR: '33',
      palConteneur: '10'
    }
  ];

  const technicalSpecs = [
    { label: 'Description', value: 'Datte Deglet Nour branchée de couleur jaune à brune' },
    { label: 'Conservation', value: '12 mois – température de 0°C à 4°C HR<65%' },
    { label: 'Période de récolte', value: 'Octobre à décembre' },
    { label: 'Région', value: 'Zaafrane-Douz-Kébili' },
    { label: 'Usage', value: 'Consommation' },
    { label: 'Etat', value: 'Avec noyaux' },
    { label: 'Type', value: 'Grasse comprise entre 20% et 30%' }
  ];

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF6F0]/50 to-white/50 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
            onClick={handleBack}
            className="flex items-center text-[#700100] hover:text-[#96cc39] transition-colors bg-transparent px-4 py-2 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Retour aux produits
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
                alt="Dattes Premium"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="bg-[#96cc39] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                  <Leaf className="w-4 h-4" />
                  Bio
                </span>
                <span className="bg-[#700100] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                  <Award className="w-4 h-4" />
                  Équitable
                </span>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-playfair text-[#700100] mb-4">
                Dattes Deglet Nour Premium
              </h1>
              <p className="text-gray-600 leading-relaxed text-lg">
                Nos dattes Deglet Nour sont soigneusement sélectionnées et récoltées à la main 
                au moment optimal de leur maturité. Leur texture moelleuse et leur goût 
                équilibré en font un produit d'exception, parfait pour une collation saine 
                ou pour vos créations culinaires.
              </p>
            </div>

            {/* Nutrition Facts Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="px-6 py-4 bg-gradient-to-br from-[#64381b] to-[#4e2b15]">
                <h2 className="text-xl font-playfair text-white">
                  Valeurs Nutritionnelles
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {nutritionFacts.map((fact, index) => (
                  <motion.div
                    key={fact.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700 font-medium">{fact.name}</span>
                    <span className="text-[#700100] font-semibold">
                      {fact.value} {fact.unit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 space-y-12"
        >
          {/* Packaging Data */}
          <div>
            <h2 className="text-2xl font-playfair text-[#700100] mb-6">
              Informations de Conditionnement
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-gradient-to-br from-[#64381b] to-[#4e2b15] text-white">
                      <th className="px-6 py-4 text-left text-sm font-semibold">Désignation</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold whitespace-nowrap">Paquets/<br/>Carton</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold whitespace-nowrap">Cartons/<br/>Palette</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold whitespace-nowrap">Poids Net<br/>Pal</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold whitespace-nowrap">Poids Brut<br/>Pal</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold">Hteur Pal</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold">Pal./SR</th>
                      <th className="px-4 py-4 text-center text-sm font-semibold whitespace-nowrap">Pal. /<br/>conteneur 20'</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {packagingData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">{item.designation}</td>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{item.paquetsCarton}</td>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{item.cartonsPalette}</td>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{item.poidsNetPal}</td>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{item.poidsBrutPal}</td>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{item.hteurPal}</td>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{item.palSR}</td>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{item.palConteneur}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h2 className="text-2xl font-playfair text-[#700100] mb-6">
              Spécifications Techniques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="px-6 py-4 bg-gradient-to-br from-[#64381b] to-[#4e2b15]">
                  <h3 className="text-xl font-playfair text-white">Fiche technique</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {technicalSpecs.map((spec, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors gap-2">
                      <span className="text-sm font-medium text-[#700100]">{spec.label}</span>
                      <span className="text-sm text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition Facts Card (Desktop) */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 md:block hidden">
                <div className="px-6 py-4 bg-gradient-to-br from-[#64381b] to-[#4e2b15]">
                  <h3 className="text-xl font-playfair text-white">Valeurs Nutritionnelles</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {nutritionFacts.map((fact, index) => (
                    <motion.div
                      key={fact.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-700 font-medium">{fact.name}</span>
                      <span className="text-[#700100] font-semibold">
                        {fact.value} {fact.unit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
