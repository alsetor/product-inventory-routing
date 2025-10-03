"use client";

import { Form, Input, InputNumber, Button, message } from 'antd';
import { Product } from '../types/product';
import api from '../lib/api';
import { useRouter } from 'next/navigation';

type Props = {
  initial?: Product | null;
  mode: 'create' | 'edit';
};

export default function ProductForm({ initial, mode }: Props) {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: Product) => {
    try {
      if (mode === 'create') {
        await api.post('/products', values);
        message.success('Product created');
      } else {
        await api.put(`/products/${initial?.id}`, values);
        message.success('Product updated');
      }
      router.push('/');
    } catch (err) {
      message.error('Operation failed' + (err instanceof Error ? `: ${err.message}` : ''));
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initial ?? { price: 0, quantity: 0 }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item name="price" label="Price" rules={[{ required: true, type: 'number', min: 0 }]}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>

      <Form.Item name="quantity" label="Quantity" rules={[{ required: true, type: 'number', min: 0 }]}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>

      <Form.Item>
        <Button type="default" onClick={() => router.back()} style={{ marginRight: 8 }}>Cancel</Button>
        <Button type="primary" htmlType="submit">{mode === 'create' ? 'Create' : 'Update'}</Button>
      </Form.Item>
    </Form>
  );
}
