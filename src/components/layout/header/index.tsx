import { Button, Layout, Modal } from 'antd';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import { useAuthStore } from 'src/stores/useAuthStore';
import { destroy } from 'src/utils/auth-storage';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { LoginForm } from 'src/components/Forms/LoginForm';
import { RegisterForm } from 'src/components/Forms/RegisterForm';
import { ShareMovieForm } from 'src/components/Forms/ShareMovieForm';
import { AvatarDropDown } from 'src/components/layout/AvatarDropDown';
import { NotificationBtn } from 'src/components/Notification/NotificationBtn';

const { Header } = Layout;

export const HeaderSection: React.FC = () => {
  const [isShowLoginForm, setIsShowLoginForm] = useState(false);
  const [isShowRegisterForm, setIsShowRegisterForm] = useState(false);
  const [isShowShareMovieForm, setIsShowShareMovieForm] = useState(false);
  const { auth, logout } = useAuthStore();

  const handleFinishRegister = () => {
    setIsShowRegisterForm(false);
    setIsShowLoginForm(true);
  };

  const handleLogout = React.useCallback(async () => {
    Modal.confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          await logout();
        } catch (err) {
        } finally {
          destroy();
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }, [logout]);

  const handleLoginSuccess = useCallback(() => {
    setIsShowLoginForm(false);
  }, []);

  const handleShareMovieSuccess = useCallback(() => {
    setIsShowShareMovieForm(false);
  }, []);

  return (
    <Header className="bg-white shadow-sm fixed w-full z-10">
      <LoginForm isShow={isShowLoginForm} onClose={() => setIsShowLoginForm(false)} onSuccess={handleLoginSuccess} />
      <RegisterForm
        isShow={isShowRegisterForm}
        onClose={() => setIsShowRegisterForm(false)}
        onSuccess={handleFinishRegister}
      />
      <ShareMovieForm
        isShow={isShowShareMovieForm}
        onClose={() => setIsShowShareMovieForm(false)}
        onSuccess={handleShareMovieSuccess}
      />
      <div className="container mx-auto px-2">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="px-1">
              <Image src="/logo/logo.png" alt="logo" width={50} height={50} />
            </div>
            <h1 className="text-sm">Funny Movies</h1>
          </div>
          {!auth?.id && (
            <div className="hidden md:block">
              <Button onClick={() => setIsShowLoginForm(true)} className="mr-4">
                Log In
              </Button>
              <Button onClick={() => setIsShowRegisterForm(true)} type="primary">
                Sign Up
              </Button>
            </div>
          )}
          {auth?.id && (
            <div className="hidden md:flex md:flex-row items-center">
              <Button danger onClick={() => setIsShowShareMovieForm(true)} className="mr-4">
                Share a movie
              </Button>
              <AvatarDropDown />
              <NotificationBtn />
            </div>
          )}
        </div>
      </div>
    </Header>
  );
};
