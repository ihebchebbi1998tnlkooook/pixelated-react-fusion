
import { useState, useEffect } from 'react';
import { Layout } from './Layout';
import LoadingScreen from './LoadingScreen';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('PageWrapper: Loading started');
    // Reset loading state when children (content) changes
  }, [children]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    console.log('PageWrapper: Loading completed');
  };

  return (
    <Layout>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        children
      )}
    </Layout>
  );
};

export default PageWrapper;
