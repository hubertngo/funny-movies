
import { Badge, Popover } from 'antd';
import React from 'react';
import { FaBell } from 'react-icons/fa';

import NotiList from 'src/components/Notification/List';
import { useNotificationStore } from 'src/stores/useNotificationStore';

import classes from './style.module.less';


export const NotificationBtn = () => {
  const { unread } = useNotificationStore();

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [visible]);

  const content = (
    <div className={classes.content}>
      <NotiList onToggle={setVisible} />
    </div>
  );

  const title = null;

  return (
    <Popover
      content={content}
      title={title}
      trigger="click"
      placement="bottomRight"
    >
      <div className={classes.wrapper}>
        <Badge count={unread} className={classes.badge}>
          <FaBell className="text-3xl" />
        </Badge>
      </div>
    </Popover>
  );
};