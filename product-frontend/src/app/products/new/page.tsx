"use client";

import ProductForm from "../../../../components/ProductForm";

export default function NewProductPage() {
  return (
    <div style={{ maxWidth: 600 }}>
      <h1>Create Product</h1>
      <ProductForm mode="create" />
    </div>
  );
}
