
import ProductDetail from './ProductDetail';
import type { ClientType } from '../types';

interface ProductsProps {
  clientType: ClientType;
}

const Products = ({ clientType }: ProductsProps) => {
  return <ProductDetail clientType={clientType} />;
};

export default Products;
