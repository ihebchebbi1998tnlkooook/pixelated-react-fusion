
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatedText } from '@/components/AnimatedText';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const banners = [
    {
      image: 'banner.png',
      mobileImage: 'banner2Mobile.png',
      title: 'Univers cadeau',
      cta: 'Découvrir',
      link: '/univers-cadeaux'
    },
    {
      image: 'banner2.png',
      mobileImage: 'bannerMobile.png',
      title: 'Nouvelle collection',
      cta: 'Découvrir',
      link: '#nouveaute'
    },
    {
      image: 'banner5.png',
      mobileImage: 'banner5.png',
      title: '2éme Demarque',
      cta: 'Découvrir',
      link: '/category/pret-a-porter/femme/chemises'
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const currentBanner = banners[currentIndex];
  const titleWords = currentBanner.title.split(' ');

  const handleNouvelleCollectionClick = (event: React.MouseEvent, link: string) => {
    if (link === '#nouveaute') {
      event.preventDefault();
      const nouveauteSection = document.querySelector('.products-title');
      if (nouveauteSection) {
        nouveauteSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative h-[95vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${
              isMobile ? currentBanner.mobileImage : currentBanner.image
            }')`,
            willChange: 'transform',
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        >
          <img
            src={isMobile ? currentBanner.mobileImage : currentBanner.image}
            alt={currentBanner.title}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            sizes="100vw"
            style={{ display: 'none' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black/50" /> 

      {/* Banner content */}
      <motion.div 
        className={cn(
          "absolute text-white z-10",
          isMobile 
            ? "bottom-16 left-6 text-left" 
            : "inset-0 flex flex-col items-center justify-center text-center"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        key={`content-${currentIndex}`}
      >
        <AnimatedText 
          text=""
          className={cn(
            "font-serif text-white mb-4",
            isMobile ? "text-4xl" : "text-6xl md:text-7xl"
          )}
          delay={300}
        >
          {isMobile ? (
            <h2 className="tracking-wide flex flex-col">
              {titleWords.map((word, index) => (
                <span key={index} className="block">{word}</span>
              ))}
            </h2>
          ) : (
            <h2 className="tracking-wide font-serif uppercase font-semibold tracking-wider">
              {currentBanner.title}
            </h2>
          )}
        </AnimatedText>
        
        <div className={cn(
          "flex flex-col items-center",
          isMobile ? "" : "mt-6"
        )}>
          {!isMobile && (
            <div className="border border-white rounded-md p-1 px-3.5 hover:bg-white/10 transition-all duration-300 scale-90 transform">
              <Button 
                asChild
                variant="link" 
                className={cn(
                  "group relative text-white p-0 text-base font-normal tracking-wider",
                  isMobile ? "self-start" : "self-center"
                )}
              >
                <a 
                  href={currentBanner.link} 
                  className="hover:text-white hover:decoration-white transition-colors duration-300"
                  onClick={(e) => handleNouvelleCollectionClick(e, currentBanner.link)}
                >
                  {currentBanner.cta}
                </a>
              </Button>
            </div>
          )}

          {isMobile && (
            <Button 
              asChild
              variant="link" 
              className={cn(
                "group relative text-white p-0 text-lg font-light",
                "self-start"
              )}
            >
              <a 
                href={currentBanner.link} 
                className="underline underline-offset-4 decoration-white hover:decoration-[#700100] transition-colors duration-300"
                onClick={(e) => handleNouvelleCollectionClick(e, currentBanner.link)}
              >
                {currentBanner.cta}
              </a>
            </Button>
          )}
        </div>
      </motion.div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 w-full flex justify-center">
        <div className="flex space-x-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentIndex === index ? "bg-white scale-125" : "bg-white/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
