import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <span className="inline-block animate-fade-down opacity-0 mb-4 px-3 py-1 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-full">
          Welcome to the future
        </span>
        
        <h1 className="animate-fade-up opacity-0 text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
          Create something beautiful
        </h1>
        
        <p className="animate-fade-up opacity-0 delay-100 max-w-2xl mx-auto text-lg text-neutral-600 mb-8">
          Experience the perfect blend of design and functionality. Built with attention to every detail.
        </p>
        
        <button className="animate-fade-up opacity-0 delay-200 group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all duration-200">
          Get Started
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

      {/* Abstract shapes */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-neutral-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neutral-100 rounded-full blur-3xl opacity-50" />
    </div>
  );
};

export default Hero;