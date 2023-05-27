
import Router from 'next/router';

import NotiItemContent from 'src/components/Notification/NotificationItem/Content';

import classes from './style.module.less';

type Props = {
  loading: boolean;
  notiData: any;
};

const NotiItem = ({ loading, notiData = {} }: Props) => {
  const { data = {} } = notiData;

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

  const handleItemClick = (url: string) => {
    Router.push(url);
  };

  return (
    <div
      className={classes.item}
    >
      <NotiItemContent
        notiData={{ ...notiData, ...data }}
        onRead={handleItemClick}
      />
    </div>
  );
};

export default NotiItem;
