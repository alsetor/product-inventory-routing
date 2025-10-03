"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Table, Button, Input, Popconfirm, message } from 'antd';
import { Product } from '../types/product';
import api from '../lib/api';

export default function ProductListClient({ products }: { products: Product[] }) {
  const [q, setQ] = useState('');
  const [data, setData] = useState(products);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      setData(data.filter(p => p.id !== id));
      message.success('Deleted');
    } catch {
      message.error('Delete failed');
    }
  };

  const filtered = data.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', render: (text: string, record: Product) => <Link href={`/products/${record.id}`}>{text}</Link> },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (v: number) => `$${v.toFixed(2)}` },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: string, record: Product) => (
        <>
          <Link href={`/products/${record.id}/edit`}><Button style={{ marginRight: 8 }}>Edit</Button></Link>
          <Popconfirm title="Delete?" onConfirm={() => handleDelete(record.id!)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <>
      <div style={{ display: 'flex', marginBottom: 12 }}>
        <Input.Search placeholder="Search" onChange={e => setQ(e.target.value)} style={{ width: 300 }} allowClear />
        <div style={{ marginLeft: 'auto' }}>
          <Link href="/products/new"><Button type="primary">Add Product</Button></Link>
        </div>
      </div>
      <Table dataSource={filtered} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
    </>
  );
}
