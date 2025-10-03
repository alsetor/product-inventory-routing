
import { Product } from '../../../types/product';
import api from '../../../lib/api';
import ProductListClient from '../../../components/ProductListClient';

async function getProducts(): Promise<Product[]> {
  const res = await api.get('/products');
  return res.data;
}

export default async function ProductListPage() {
  const products = await getProducts();
  return (
    <ProductListClient products={products} />
  );
}
