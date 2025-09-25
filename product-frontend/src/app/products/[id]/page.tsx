"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from 'antd';
import api from '../../../../lib/api';
import { Product } from '../../../../types/product';

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data)).catch(() => router.push('/products'));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleDelete = async () => {
    await api.delete(`/products/${id}`);
    router.push('/products');
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h1>{product.name}</h1>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <Link href={`/products/${id}/edit`}><Button>Edit</Button></Link>
        <Button danger onClick={handleDelete}>Delete</Button>
        <Link href="/products"><Button>Back</Button></Link>
      </div>
    </div>
  );
}
