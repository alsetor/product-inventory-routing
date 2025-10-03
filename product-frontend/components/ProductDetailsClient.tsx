"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import { Product } from '../types/product';
import api from '../lib/api';

export default function ProductDetailsClient({ product }: { product: Product }) {
  const router = useRouter();
  const handleDelete = async () => {
    await api.delete(`/products/${product.id}`);
    router.push('/products');
  };
  return (
    <div style={{ maxWidth: 600 }}>
      <h1>{product.name}</h1>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <Link href={`/products/${product.id}/edit`}><Button>Edit</Button></Link>
        <Button danger onClick={handleDelete}>Delete</Button>
        <Link href="/products"><Button>Back</Button></Link>
      </div>
    </div>
  );
}
