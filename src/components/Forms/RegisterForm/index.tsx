import { Button, Form, Input, Modal, message } from 'antd';
import { useCallback, useState } from 'react';


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
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
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
        <Form.Item
          name="name"
          label="Name"
          tooltip="What do you want others to call you?"
          rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
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
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
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
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};