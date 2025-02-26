import { useState, useEffect, useRef } from 'react';
import { Clock, Users, ChefHat, Award, Globe, Truck, Factory } from 'lucide-react';
import { CAROUSEL_ITEMS, STATISTICS, FEATURED_RECIPES } from '../config/data';
import Recipe from './Recipe';
import DatesBenefits from '../components/DatesBenefits';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [statistics, setStatistics] = useState(STATISTICS.map(stat => ({ ...stat, current: 0 })));
  const statsRef = useRef<HTMLDivElement>(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const recipesRef = useRef<HTMLDivElement>(null);
  const [isRecipesVisible, setIsRecipesVisible] = useState(false);
  const progressInterval = useRef<number | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
      setProgress(0);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    setProgress(0);
    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    progressInterval.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval.current!);
      }
    }, 16); // ~60fps

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentSlide]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isStatsVisible) {
      statistics.forEach((stat, index) => {
        const steps = 50;
        const increment = stat.value / steps;
        let current = 0;
        
        const interval = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(interval);
          }
          
          setStatistics(prev => 
            prev.map((s, i) => 
              i === index ? { ...s, current: Math.floor(current) } : s
            )
          );
        }, 40);

        return () => clearInterval(interval);
      });
    }
  }, [isStatsVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRecipesVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (recipesRef.current) {
      observer.observe(recipesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (selectedRecipe) {
    return <Recipe recipeId={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
  }

  return (
    <main className="flex-grow ">
      <section className="relative h-screen ">
        {CAROUSEL_ITEMS.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center text-white">
                  <h1 className="text-4xl md:text-6xl font-playfair mb-6">{item.title}</h1>
                  <p className="text-xl mb-8">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-8 flex items-center space-x-2">
          {CAROUSEL_ITEMS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setProgress(0);
              }}
              className={`relative h-1 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-12 bg-white' : 'w-2 bg-white/40'
              }`}
            >
              {currentSlide === index && (
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#96cc39] to-[#64381b]"
                  style={{
                    width: `${progress}%`,
                    transition: 'width 16ms linear'
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#96cc39]/30 to-[#64381b]/30 rounded-xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
              <div className="relative">
                <div className="rounded-xl overflow-hidden shadow-2xl transform group-hover:scale-[1.2] transition duration-500">
                  <img
                    src="https://lh3.googleusercontent.com/p/AF1QipMKNuGKyFXz2ZBrKK53wJetEOfwQzVsU5XpW-9q=s1360-w1360-h1020"
                    alt="About Us"
                    className="w-50 h-50 object-contain"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl">
                  <img
                    src="https://i.ibb.co/Rp6QnpSt/logo.webp"
                    alt="Company Logo"
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-8">
              <div>
                <h4 className="text-[#96cc39] font-medium mb-2">Notre Histoire</h4>
                <h2 className="text-4xl font-playfair font-bold mb-6 text-gray-900">
                  L'Excellence des Dattes <span className="text-[#64381b]">Premium</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#96cc39] to-[#64381b] rounded-full mb-6" />
                <p className="text-gray-600 leading-relaxed mb-6">
                  Depuis plus de deux décennies, nous nous engageons à fournir les meilleures dattes 
                  de Tunisie aux quatre coins du monde. Notre passion pour la qualité et notre 
                  expertise dans la sélection des meilleures variétés nous ont permis de devenir 
                  un leader dans l'exportation de dattes premium.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Chaque datte que nous sélectionnons raconte une histoire de tradition, 
                  de qualité et d'excellence. Notre engagement envers la durabilité et 
                  l'innovation nous permet de maintenir les plus hauts standards de qualité.
                </p>
              </div>

              <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="mb-3">
                      {index === 0 && <Globe className="w-8 h-8 mx-auto text-[#96cc39] group-hover:scale-110 transition-transform" />}
                      {index === 1 && <Truck className="w-8 h-8 mx-auto text-[#96cc39] group-hover:scale-110 transition-transform" />}
                      {index === 2 && <Award className="w-8 h-8 mx-auto text-[#96cc39] group-hover:scale-110 transition-transform" />}
                      {index === 3 && <Factory className="w-8 h-8 mx-auto text-[#96cc39] group-hover:scale-110 transition-transform" />}
                    </div>
                    <div className="text-3xl font-bold text-[#64381b] mb-1">
                      {Math.floor(stat.current)}
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={recipesRef} className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-[#96cc39] font-medium mb-2">Délices Culinaires</h4>
            <h2 className="text-4xl font-playfair font-bold mb-6 text-gray-900">
              Nos <span className="text-[#64381b]">Recettes</span> Gourmandes
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#96cc39] to-[#64381b] rounded-full mx-auto mb-6" />
            <p className="text-gray-600">
              Découvrez notre sélection de recettes exclusives mettant en valeur la richesse 
              et la versatilité de nos dattes premium.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_RECIPES.map((recipe, index) => (
              <div
                key={index}
                onClick={() => setSelectedRecipe(recipe.id)}
                className={`group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-700 hover:-translate-y-2 cursor-pointer ${
                  isRecipesVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold mb-3 text-gray-900 group-hover:text-[#96cc39] transition-colors duration-300">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {recipe.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-[#96cc39]" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-[#96cc39]" />
                      <span>{recipe.servings} pers.</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ChefHat className="w-4 h-4 text-[#96cc39]" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <DatesBenefits />
        </div>
      </section>
    </main>
  );
};

export default Home;
