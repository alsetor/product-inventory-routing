
import { Product } from '../../../../types/product';
import api from '../../../../lib/api';
import ProductDetailsClient from '../../../../components/ProductDetailsClient';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch {
    return null;
  }
}

interface Props {
  params: { id: string };
}

export default async function ProductDetailsPage({ params }: Props) {
  const product = await getProduct(params.id);
  if (!product) return <div>Product not found</div>;
  return <ProductDetailsClient product={product} />;
}
