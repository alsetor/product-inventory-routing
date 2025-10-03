
import { Product } from '../../../../../types/product';
import api from '../../../../../lib/api';
import ProductForm from '../../../../../components/ProductForm';

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

export default async function EditProductPage({ params }: Props) {
  const product = await getProduct(params.id);
  if (!product) return <div>Product not found</div>;
  return (
    <div style={{ maxWidth: 600 }}>
      <h1>Edit Product</h1>
      <ProductForm initial={product} mode="edit" />
    </div>
  );
}
