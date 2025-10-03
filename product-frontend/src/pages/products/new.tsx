import AntdLayout from '../../../components/AntdLayout';
import ProductForm from '../../../components/ProductForm';

export default function NewProductPage() {
  return (
    <AntdLayout>
      <div style={{ maxWidth: 600 }}>
        <h1>Create Product</h1>
        <ProductForm mode="create" />
      </div>
    </AntdLayout>
  );
}
