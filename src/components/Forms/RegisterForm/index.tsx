import { Button, Form, Input, Modal, message } from 'antd';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

import { UserType, register } from 'src/apis/users';

interface Props {
  isShow: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RegisterForm = ({ isShow, onClose, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = useCallback(async (formValues: UserType) => {
    try {
      setLoading(true);
      console.log('formValues', formValues);
      await register(formValues);
      message.success('Your account is created successfully!');
      onSuccess();
    } catch {
      // Error message is handled by middleware
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  return (
    <Modal
      footer={null}
      okText="Submit"
      open={isShow}
      onCancel={onClose}
    >
      <Form
        form={form}
        onFinish={onFinish}
        name="basic"
        autoComplete="off"
      >
        <div className="text-center mb-5">
          <Image src="/logo/logo.png" alt="Logo" width={80} height={80} />
          <h1 className="text-xl">Welcome to Funny Movie!</h1>
        </div>
        <Form.Item
          name="name"
          tooltip="What do you want others to call you?"
          rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Your name" />
        </Form.Item>

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
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Button type="primary" block htmlType="submit" className="login-form-button" loading={loading}>
          Register a new account
        </Button>
      </Form>
    </Modal>
  );
};