import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';

import type { AppProps } from 'next/app';
import { StyleProvider } from '@ant-design/cssinjs';

export default function MyApp({ Component, pageProps, cssinjsCache }: AppProps & { cssinjsCache: any }) {
  return (
    <StyleProvider cache={cssinjsCache}>
      <Component {...pageProps} />
    </StyleProvider>
  );
}
