import { formatDate } from 'src/utils/format-time';

import { NotificationOutlined } from '@ant-design/icons';

import Avatar from 'src/components/Avatar';

import { NotificationType } from 'src/apis/notification';

import classes from './style.module.less';

type Props = {
  notiData?: NotificationType;
  onRead: (id: string) => void;
};

const NotiItemContent = ({ notiData, onRead }: Props) => {
  if (!notiData || !notiData.createdAt) {
    return null;
  }

  const handleItemClick = (id: string) => {
    onRead(id);
  };

  return (
    <a className={classes.content} onClick={() => handleItemClick(notiData?.id || '')}>
      <Avatar name={notiData?.creator?.name} src={notiData?.creator?.avatar} size={50} />
      <div className={classes.text}>
        <p>
          <strong>{notiData.video?.title}</strong>
        </p>
        <span>
          <NotificationOutlined />
          {`${notiData?.creator?.name} has shared a movie at ${formatDate(notiData.createdAt)}`}
        </span>
      </div>
    </a>
  )
};

export default NotiItemContent;
