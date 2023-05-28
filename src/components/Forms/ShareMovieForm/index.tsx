import { Button, Form, Input, Modal, message } from 'antd';
import { useCallback, useState } from 'react';

import { VideoType, getList, shareVideo } from 'src/apis/videos';
import { LIMIT } from 'src/constants/pagination';
import { useVideoStore } from 'src/stores/useVideoStore';

interface Props {
  isShow: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ShareMovieForm = ({ isShow, onClose, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { setData } = useVideoStore();

  const onFinish = useCallback(
    async ({ videoLink }: VideoType) => {
      try {
        setLoading(true);
        if (videoLink) {
          await shareVideo(videoLink);
          const newList = await getList({ include: 'creator', limit: LIMIT });
          setData(newList);
          message.success('You have shared the movie successfully!')
          form.resetFields();
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    },
    [setData, form],
  );

  return (
    <Modal
      title="Let share a funny movie!"
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
          Share
        </Button>,
      ]}
      open={isShow}
      onCancel={onClose}
    >
      <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Youtube URL"
          name="videoLink"
          rules={[{ required: true, message: 'Please input youtube url!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
