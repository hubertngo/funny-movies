import React from 'react';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';

import { Waypoint } from 'react-waypoint';
import { useAuthStore } from 'src/stores/useAuthStore';

import { NotificationItem } from 'src/components/Notification/NotificationItem';

import { getList, updateAllNoti } from 'src/apis/notification';
import { useNotificationStore } from 'src/stores/useNotificationStore';

import { FaBell, FaBellSlash } from 'react-icons/fa';

import classes from './style.module.less';

type Props = {
  onToggle: (value: boolean) => void;
};

const NotiList = (props: Props) => {
  const { onToggle } = props;

  const [loadingMore, setLoadingMore] = React.useState(false);
  const { notificationLists, setNotificationList, setUnread } = useNotificationStore();
  const { auth } = useAuthStore();

  const filter = React.useMemo(() => {
    return {
      limit: 6,
      skip: 0,
      page: 1,
      order: 'createdAt DESC',
      include: [
        {
          relation: 'creator',
          scope: {
            fields: ['id', 'avatar', 'name'],
          },
        },
        {
          relation: 'receiver',
          scope: {
            fields: ['id', 'avatar', 'name', 'role'],
          },
        },
        {
          relation: 'video',
        },
      ],
      where: {
        receiverId: auth.id,
      },
    };
  }, [auth.id]);

  const { loading } = useAsyncRetry(async () => {
    if (!auth.id) return;

    const response = await getList(filter);
    setNotificationList(response);

    return response;
  }, [filter, auth.id]);

  const handleLoadMore = React.useCallback(async () => {
    setLoadingMore(true);

    try {
      filter.skip = filter.limit * filter.page;

      await getList(filter);
      filter.page += 1;
    } catch (error) {
      console.log('DEV ~ file: index.js ~ line 102 ~ handleLoadMore ~ error', error);
    } finally {
      setLoadingMore(false);
    }
  }, [filter]);

  const handleReadAll = React.useCallback(async () => {
    await updateAllNoti({ data: { updatedAt: new Date(), isRead: true }, where: { receiverId: auth.id, isRead: false } });
    setUnread(0);
    onToggle?.(false);
  }, [auth.id, setUnread, onToggle]);

  if (!loading && notificationLists.total === 0) {
    return (
      <div className={classes.content}>
        <div className={classes.title}>
          <h4>
            <FaBell /> Notifications
          </h4>
          <a>Mark all as read</a>
        </div>
        <div className={classes.contentWrapper}>
          <div className={classes.notFound}>
            <FaBellSlash />
            No new notification
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.content}>
      <div className={classes.title}>
        <h4>
          <FaBell />
          Notifications
        </h4>
        <a onClick={handleReadAll}>Mark all as read</a>
      </div>
      <div className={classes.contentWrapper}>
        {!loading
          ? notificationLists?.data.map((noti) => {
            return <NotificationItem key={noti.id || ''} notiData={noti} onToggle={onToggle} />;
          })
          : [0, 0, 0, 0].map((noti, i) => {
            return <NotificationItem key={i} loading />;
          })}
        {loadingMore && [<NotificationItem key={1} loading />, <NotificationItem key={2} loading />]}
        {!loading && !loadingMore && filter.limit * filter.page < notificationLists.total && (
          <Waypoint onEnter={handleLoadMore} />
        )}
      </div>
    </div>
  );
};

export default NotiList;
