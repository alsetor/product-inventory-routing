import { GetServerSideProps } from 'next';
import api from '../../../../lib/api';
import ProductForm from '../../../../components/ProductForm';
import { Product } from '../../../../types/product';
import AntdLayout from '../../../../components/AntdLayout';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const res = await api.get(`/products/${params?.id}`);
    return { props: { product: res.data } };
  } catch {
    return { notFound: true };
  }
};

export default function EditProductPage({ product }: { product: Product }) {
  return (
    <AntdLayout>
      <div style={{ maxWidth: 600 }}>
        <h1>Edit Product</h1>
        <ProductForm initial={product} mode="edit" />
      </div>
    </AntdLayout>
  );
}
