import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Modal } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { RiLogoutBoxRFill } from 'react-icons/ri';

import Avatar from 'src/components/Avatar';
import { useAuthStore } from 'src/stores/useAuthStore';
import { destroy } from 'src/utils/auth-storage';

import classes from './style.module.less';

export const AvatarDropDown = () => {
  const router = useRouter();
  const { auth, logout } = useAuthStore();

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
          router.push('/login');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }, [router, logout]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className={classes.name}>
          <Avatar size={50} src={auth.avatar} name={auth.name} />
          <div className={classes.fullName}>
            <strong>{auth.name}</strong>
            <div className="text-small">{auth.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <a className={classes.item} onClick={handleLogout}>
          <RiLogoutBoxRFill />
          <span>Logout</span>
        </a>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <div>
        <Avatar
          size={40}
          src={auth.avatar}
          name={auth.name}
          style={{
            cursor: 'pointer',
          }}
        />
      </div>
    </Dropdown>
  );
};
