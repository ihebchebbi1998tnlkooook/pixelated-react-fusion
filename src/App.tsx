
import { useState } from 'react';
import { PreloadingScreen } from './components/PreloadingScreen';
import { ClientTypeModal } from './components/ClientTypeModal';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import { Contact } from './pages/Contact';
import Home from './pages/Home';
import About from './pages/About';
import Revendeurs from './pages/Revendeurs';
import Certifications from './pages/Certifications';
import Products from './pages/Products';
import type { ClientType } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [clientType, setClientType] = useState<ClientType>(null);
  const [currentPage, setCurrentPage] = useState('home');

  // Loading screen effect
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  });

  if (isLoading) {
    return <PreloadingScreen />;
  }

  const renderPage = () => {
    // First check if it's a product page
    if (currentPage.startsWith('produits/')) {
      return <Products clientType={clientType} />;
    }

    // Then check other pages
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'resellers':
        return <Revendeurs />;
      case 'certifications':
        return <Certifications />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {clientType === null ? (
        <ClientTypeModal onSelect={setClientType} />
      ) : (
        <>
          <Navbar 
            clientType={clientType} 
            onPageChange={setCurrentPage} 
            currentPage={currentPage}
            onClientTypeChange={setClientType}
          />
          {renderPage()}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
