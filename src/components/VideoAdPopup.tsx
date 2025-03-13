
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoAdPopupProps {
  delayTime?: number; // Time in ms before showing the popup
  videoUrl: string;
}

const VideoAdPopup = ({ delayTime = 3000, videoUrl }: VideoAdPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show the popup after the delay time
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delayTime);

    return () => clearTimeout(timer);
  }, [delayTime]);

  useEffect(() => {
    // Auto play video when popup opens
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Video autoplay failed:", err);
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300 
            }}
            className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-black shadow-2xl"
          >
            {/* Close Button with animated hover effect */}
            <motion.button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/10 text-white backdrop-blur-sm"
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(255, 255, 255, 0.2)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
            
            {/* Video Container with aspect ratio */}
            <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={videoUrl}
                playsInline
                muted // Muted to allow autoplay on most browsers
                controls
              />
            </div>
            
            {/* Call to action button at bottom */}
            <motion.div 
              className="absolute bottom-4 left-0 right-0 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="px-4 py-2 rounded-full bg-[#96cc39] text-white font-medium text-sm shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleClose}
              >
                Découvrir nos produits
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoAdPopup;
