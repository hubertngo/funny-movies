import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import { login, loginPayload } from 'src/apis/users';
import { useAuthStore } from 'src/stores/useAuthStore';
import { setValue } from 'src/utils/auth-storage';

interface Props {
  isShow: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LoginForm = ({ isShow, onClose, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const [form] = Form.useForm();

  const onFinish = useCallback(
    async ({ email, password }: loginPayload) => {
      try {
        setLoading(true);
        const authInfo = await login({ email, password });

        setValue({
          token: authInfo?.id,
          userId: authInfo?.userId,
          role: authInfo?.role,
        });
        setAuth(authInfo.user);
        onSuccess();
      } catch (err) {
      } finally {
        setLoading(false);
      }
    },
    [setAuth, onSuccess],
  );

  return (
    <Modal
      footer={null}
      open={isShow}
      onCancel={onClose}
    >
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="text-center mb-5">
          <Image src="/logo/logo.png" alt="Logo" width={80} height={80} />
          <h1 className="text-xl">Welcome to Funny Movie!</h1>
        </div>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Button type="primary" block htmlType="submit" className="login-form-button" loading={loading}>
          Login
        </Button>
      </Form>
    </Modal>
  );
};