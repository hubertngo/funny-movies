import type { AppProps } from 'next/app';

import { MainLayout } from 'src/components/layout/main';
import { withDataProvider } from 'src/hoc/withDataProvider';

import 'src/styles/globals.css';

interface Props extends AppProps {
  Component: any;
}

function App({ Component, pageProps }: Props) {
  const Layout = Component?.Layout || MainLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}


export default withDataProvider(App);