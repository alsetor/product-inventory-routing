"use client";

import { Layout } from 'antd';
import Link from 'next/link';

const { Header, Content, Footer } = Layout;

export default function AntdLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'white', fontWeight: 700 }}>Product Inventory</div>
        <nav>
          <Link href="/" style={{ color: 'white', marginRight: 12 }}>Products</Link>
          <Link href="/products/new" style={{ color: 'white' }}>Add product</Link>
        </nav>
      </Header>

      <Content style={{ padding: '24px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        {children}
      </Content>

      <Footer style={{ textAlign: 'center' }}>Example app • SSR • Ant Design</Footer>
    </Layout>
  );
}
