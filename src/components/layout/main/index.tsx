import { Layout } from 'antd';
import Head from 'next/head';
import { useAsync } from 'react-use';

import { useAuthStore } from 'src/stores/useAuthStore';
import { destroy, isLoggedIn } from 'src/utils/auth-storage';

import { checkIn } from 'src/apis/users';

import { HeaderSection } from '../header';

const { Content } = Layout;

interface LayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: LayoutProps) => {
  const { setAuth, logout } = useAuthStore();

  useAsync(async () => {
    const loggedIn = isLoggedIn();
    if (loggedIn) {
      try {
        const userAuth = await checkIn();
        setAuth(userAuth);

      } catch (error: any) {
        destroy();
        await logout();
      }
    }
  }, []);

  return (
    <Layout className="min-h-screen">
      <Head>
        <title>Funny Videos | Ninh Ngo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSection />
      <Content>
        <div className="container mx-auto px-8 py-12">{children}</div>
      </Content>
    </Layout>
  );
};
