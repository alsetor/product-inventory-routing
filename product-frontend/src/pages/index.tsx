import { GetServerSideProps } from 'next';
import AntdLayout from '../../components/AntdLayout';
import ProductListClient from '../../components/ProductListClient';
import api from '../../lib/api';
import { Product } from '../../types/product';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await api.get('/products');
  return {
    props: {
      products: res.data,
    },
  };
};

export default function ProductListPage({ products }: { products: Product[] }) {
  return (
    <AntdLayout>
      <ProductListClient products={products} />
    </AntdLayout>
  );
}
