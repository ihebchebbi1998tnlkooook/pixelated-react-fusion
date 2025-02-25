
import { Users, Award, Globe, Leaf } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#f6f7f9] pt-32">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
            alt="Tazart Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-playfair mb-6">À propos de Tazart</h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Un peu de plus à propos Tazart
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introduction Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-24 animate-scale-in">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Tazart est une entreprise sociale de séchage et de conditionnement de fruits, spécialisée dans les dattes et les figues séchées. Des figues et des dattes qui sont produites dans les meilleures conditions en Tunisie pour garantir à nos clients un gout et une qualité supérieurs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Tazart revisite nos produits locaux pour offrir à ses consommateurs une expérience culinaire à la fois authentique et exceptionnelle.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843"
              alt="Traditional Production"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Heritage Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-24 animate-scale-in">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6 text-center text-[#67000D]">
            BIEN PLUS QU'UN SIMPLE FRUIT
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                La figue fait partie intégrante de la culture berbère et est appelée dans tout l'ensemble berbérophone Tazart, d'où vient le nom de notre entreprise.
              </p>
              <p className="text-gray-700 leading-relaxed">
                C'est au cœur de la production traditionnelle et authentique Tunisienne que la marque TAZART a été créée offrant au consommateur une expérience culinaire exceptionnelle à base de dattes et de figues séchées.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Pour les figues, la récolte passe au séchage via des techniques modernes et adaptées aux normes d'hygiène en vigueur pour passer par la suite à l'étape du conditionnement à l'instar de nos dattes naturelles "Deglet Nour", en vue d'être commercialisées sur plusieurs formes dans un réseau de plus de 70 distributeurs.
              </p>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-xl shadow-lg animate-slide-in">
            <Globe className="w-12 h-12 text-[#67000D] mb-4" />
            <h3 className="text-xl font-semibold mb-4">Responsabilité sociale</h3>
            <p className="text-gray-600">
              Accompagnement des agriculteurs du sud tunisien depuis la plantation jusqu'à la cueillette.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <Leaf className="w-12 h-12 text-[#67000D] mb-4" />
            <h3 className="text-xl font-semibold mb-4">Valorisation locale</h3>
            <p className="text-gray-600">
              Valorisation des produits locaux et méthodes traditionnelles de production.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <Award className="w-12 h-12 text-[#67000D] mb-4" />
            <h3 className="text-xl font-semibold mb-4">Valeur alimentaire</h3>
            <p className="text-gray-600">
              Séchage via des techniques modernes adaptées aux normes d'hygiène en vigueur.
            </p>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-[#67000D] text-white p-12 rounded-xl shadow-xl animate-scale-in">
          <h2 className="text-3xl md:text-4xl font-playfair mb-12 text-center">NOS VALEURS</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="leading-relaxed mb-8">
                Comme la richesse est avant tout humaine, Tazart rassemble un groupe de femmes et des hommes construisant chaque jour son succès, travaillant en synergie tout en étant attachés aux valeurs qui concrétisent leur réussite.
              </p>
              <p className="leading-relaxed">
                En un seul mot "l'humain" est placé au cœur du fonctionnement de Tazart, commençant par les producteurs, passant par les collaborateurs jusqu'à arriver aux clients.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6" />
                  <span>Respect de l'autre</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6" />
                  <span>Partage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-6 h-6" />
                  <span>Engagement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Leaf className="w-6 h-6" />
                  <span>Richesse collective</span>
                </div>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027"
              alt="Our Heritage"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
