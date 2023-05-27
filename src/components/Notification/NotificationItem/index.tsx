import classNames from 'classnames';
import { NotificationType, count as countNotification, update } from 'src/apis/notification';

import { useNotificationStore } from 'src/stores/useNotificationStore';

import NotiItemContent from './Content';

import classes from './style.module.less';

type Props = {
  loading?: boolean;
  notiData?: NotificationType;
  onToggle?: (value: boolean) => void;
  key: string | number;
};

export const NotificationItem = ({ loading, notiData, onToggle, key }: Props) => {
  const { setUnread, updateReadItem } = useNotificationStore();

  const handleItemClick = async (id: string) => {
    if (!notiData?.isRead) {
      await update({ id, updatedAt: new Date(), isRead: true });

      const { count } = await countNotification({ receiverId: notiData?.receiverId, isRead: false });

      updateReadItem(id);
      setUnread(count);
    }
    onToggle?.(false);
  };

  if (loading) {
    return (
      <div className={classes.item}>
        <div className="loading-block" style={{ width: 50, height: 50, borderRadius: 50, margin: 0 }} />
        <div className={classes.text}>
          <div className="loading-block" />
          <div className="loading-block" />
          <div className="loading-block" style={{ width: '50%' }} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(classes.item, {
        [classes.unread]: !notiData?.isRead,
      })}
      key={key}
    >
      <NotiItemContent notiData={notiData} onRead={handleItemClick} />
    </div>
  );
};
