"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Product } from '../../../../../types/product';
import api from '../../../../../lib/api';
import ProductForm from '../../../../../components/ProductForm';

export default function EditProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data)).catch(() => router.push('/products'));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600 }}>
      <h1>Edit Product</h1>
      <ProductForm initial={product} mode="edit" />
    </div>
  );
}
