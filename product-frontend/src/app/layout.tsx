import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';
import AntdLayout from '../../components/AntdLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdLayout>{children}</AntdLayout>
      </body>
    </html>
  );
}
