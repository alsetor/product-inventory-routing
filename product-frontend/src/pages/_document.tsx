import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { createCache, extractStyle } from '@ant-design/cssinjs';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) => <App {...props} cssinjsCache={cache} />,
      });

    const initialProps = await Document.getInitialProps(ctx);
    const styleText = extractStyle(cache);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style data-cssinjs dangerouslySetInnerHTML={{ __html: styleText }} />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
