import { Button, Form, Input, Modal } from 'antd';
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
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
      open={isShow}
      onCancel={onClose}
    >
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};