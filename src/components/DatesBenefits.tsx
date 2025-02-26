
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Battery, Apple, Heart, Zap, Activity } from 'lucide-react';
import BenefitModal from './BenefitModal';

const benefits = [
  { 
    id: 1, 
    title: "Riche en fibre", 
    icon: <Leaf className="w-6 h-6 text-[#96cc39]" />,
    top: "0%",
    left: "40%",
    content: `
      <p>Les dattes sont exceptionnellement riches en fibres alimentaires, avec environ 7 grammes de fibres pour 100 grammes de dattes. Ces fibres sont essentielles pour :</p>
      <ul>
        <li>La santé digestive et le transit intestinal</li>
        <li>Le contrôle de la glycémie</li>
        <li>La sensation de satiété</li>
        <li>La réduction du cholestérol</li>
      </ul>
      <p>Les fibres solubles et insolubles présentes dans les dattes contribuent à maintenir un système digestif sain et à prévenir diverses maladies digestives.</p>
    `
  },
  { 
    id: 2, 
    title: "Source de potassium", 
    icon: <Battery className="w-6 h-6 text-[#96cc39]" />,
    top: "20%",
    left: "80%",
    content: `
      <p>Les dattes sont une excellente source de potassium, contenant environ 696 mg pour 100 grammes. Le potassium est crucial pour :</p>
      <ul>
        <li>La régulation de la pression artérielle</li>
        <li>Le fonctionnement musculaire</li>
        <li>La transmission nerveuse</li>
        <li>L'équilibre hydrique du corps</li>
      </ul>
      <p>Une alimentation riche en potassium aide à maintenir une bonne santé cardiovasculaire et à prévenir l'hypertension.</p>
    `
  },
  { 
    id: 3, 
    title: "Boosteur d'énergie", 
    icon: <Zap className="w-6 h-6 text-[#96cc39]" />,
    top: "60%",
    left: "80%",
    content: `
      <p>Les dattes sont un excellent boosteur d'énergie naturel grâce à :</p>
      <ul>
        <li>Leur teneur élevée en glucides naturels</li>
        <li>Leur index glycémique modéré</li>
        <li>Leur richesse en vitamines B</li>
        <li>Leur contenu en minéraux essentiels</li>
      </ul>
      <p>Idéales pour les sportifs et les personnes actives, les dattes fournissent une énergie durable sans pic glycémique important.</p>
    `
  },
  { 
    id: 4, 
    title: "Super aliment", 
    icon: <Apple className="w-6 h-6 text-[#96cc39]" />,
    top: "80%",
    left: "40%",
    content: `
      <p>Les dattes sont considérées comme un super aliment en raison de leur profil nutritionnel exceptionnel :</p>
      <ul>
        <li>Riches en antioxydants</li>
        <li>Source de minéraux essentiels</li>
        <li>Contiennent des composés anti-inflammatoires</li>
        <li>Apportent des fibres et des vitamines</li>
      </ul>
      <p>Leur consommation régulière contribue à une alimentation équilibrée et saine.</p>
    `
  },
  { 
    id: 5, 
    title: "Anti-oxydants", 
    icon: <Heart className="w-6 h-6 text-[#96cc39]" />,
    top: "60%",
    left: "0%",
    content: `
      <p>Les dattes sont riches en antioxydants, notamment :</p>
      <ul>
        <li>Les flavonoïdes</li>
        <li>Les caroténoïdes</li>
        <li>Les composés phénoliques</li>
        <li>La vitamine E</li>
      </ul>
      <p>Ces antioxydants aident à lutter contre le stress oxydatif et les radicaux libres, contribuant ainsi à la prévention de nombreuses maladies chroniques.</p>
    `
  },
  { 
    id: 6, 
    title: "Vitamines B1, B2, B3", 
    icon: <Activity className="w-6 h-6 text-[#96cc39]" />,
    top: "20%",
    left: "0%",
    content: `
      <p>Les dattes sont une source importante de vitamines B :</p>
      <ul>
        <li>B1 (Thiamine) : essentielle pour le métabolisme énergétique</li>
        <li>B2 (Riboflavine) : importante pour la production d'énergie cellulaire</li>
        <li>B3 (Niacine) : cruciale pour la santé du système nerveux</li>
      </ul>
      <p>Ces vitamines sont essentielles pour le bon fonctionnement du métabolisme et du système nerveux.</p>
    `
  },
];

const DatesBenefits = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<typeof benefits[0] | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair text-[#700100] mb-4">
          Les Bénéfices de Nos Dattes
        </h2>
        <div className="w-16 md:w-24 h-1 bg-[#96cc39] mx-auto"></div>
      </motion.div>

      <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[760px] lg:h-[632px]">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute left-[30%] top-[29%] -translate-x-1/2 -translate-y-1/2 
                     w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-72 lg:h-72 
                     rounded-full overflow-hidden border-4 border-[#96cc39] shadow-xl z-10"
        >
          <img
            src="https://lh3.googleusercontent.com/p/AF1QipOPKVFIo-1nEWX3sPtQLjcHEhyXMcHtfv7d0d39=s1360-w1360-h1020"
            alt="Dates"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.id}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1 * index,
              type: "spring",
              stiffness: 100
            }}
            className="absolute"
            style={{
              top: benefit.top,
              left: benefit.left
            }}
          >
            <div 
              className="absolute left-1/2 top-1/2 h-[2px] bg-gradient-to-r from-[#96cc39]/20 to-[#96cc39] origin-left"
              style={{
                width: '30px',
                transform: 'rotate(45deg)',
              }}
            />

            <motion.div
              whileHover={{ 
                scale: 1.1,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="w-[4.5rem] h-[4.5rem] sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
                         rounded-full bg-white/90 shadow-lg border border-[#96cc39]/20 
                         flex flex-col items-center justify-center p-2 sm:p-3 lg:p-4
                         cursor-pointer group hover:bg-[#96cc39] hover:border-[#96cc39] 
                         transition-all duration-300 backdrop-blur-sm"
              onClick={() => setSelectedBenefit(benefit)}
            >
              <div className="text-[#96cc39] group-hover:text-white transition-colors duration-300">
                {benefit.icon}
              </div>
              <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-gray-700 
                           group-hover:text-white mt-1 sm:mt-2 
                           transition-colors duration-300 whitespace-pre-line 
                           text-center leading-tight">
                {benefit.title}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <BenefitModal
        isOpen={!!selectedBenefit}
        onClose={() => setSelectedBenefit(null)}
        title={selectedBenefit?.title ?? ''}
        content={selectedBenefit?.content ?? ''}
        icon={selectedBenefit?.icon}
      />
    </div>
  );
};

export default DatesBenefits;
