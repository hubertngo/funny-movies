import { ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Modal } from 'antd';
import React from 'react';

import Avatar from 'src/components/Avatar';
import { useAuthStore } from 'src/stores/useAuthStore';
import { destroy } from 'src/utils/auth-storage';

import classes from './style.module.less';

export const AvatarDropDown = () => {
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
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }, [logout]);

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
        <Button icon={<LogoutOutlined />} danger type="primary" className="w-full" onClick={handleLogout}>
          Logout
        </Button>
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
