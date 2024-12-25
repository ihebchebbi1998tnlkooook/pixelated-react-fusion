import { Zap, Shield, Sparkles } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized for speed and performance",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure by Default",
      description: "Built with security in mind",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Beautiful Design",
      description: "Crafted with attention to detail",
    },
  ];

  return (
    <section id="features" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Crafted for Excellence
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Every feature has been thoughtfully designed and implemented to provide the best possible experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-neutral-200/50 hover:border-neutral-300/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;