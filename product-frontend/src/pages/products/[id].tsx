import { GetServerSideProps } from 'next';
import { Product } from '../../../types/product';
import ProductDetailsClient from '../../../components/ProductDetailsClient';
import api from '../../../lib/api';
import AntdLayout from '../../../components/AntdLayout';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const res = await api.get(`/products/${params?.id}`);
    return { props: { product: res.data } };
  } catch {
    return { notFound: true };
  }
};

export default function ProductDetailsPage({ product }: { product: Product }) {
  return (
    <AntdLayout>
      <ProductDetailsClient product={product} />
    </AntdLayout>
  );
}
