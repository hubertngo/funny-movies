import { useCallback, useEffect } from 'react';

import { count as countNoti, getOne } from 'src/apis/notification';
import URL from 'src/constants/urls';
import { useAuthStore } from 'src/stores/useAuthStore';
import { useNotificationStore } from 'src/stores/useNotificationStore';
import { getToken } from 'src/utils/auth-storage';

let connected = false;
const { API_URL } = URL;

export const withDataProvider = function <T>(Component: React.ComponentType<T>) {
  const Comp = (hocProps: T & {}) => {
    const { auth } = useAuthStore();
    const { setUnread, addNoti, increaseUnread } = useNotificationStore();

    const countNotiUnread = useCallback(async () => {
      const { count } = await countNoti({ receiverId: auth.id, isRead: false });
      setUnread(count);
    }, [auth.id, setUnread]);

    const addNotiListener = useCallback(() => {
      if (!connected) {
        if (typeof EventSource !== 'undefined') {
          const authToken = getToken();
          const urlToChangeStream = `${API_URL}/notifications/change-stream?_format=event-stream&access_token=${authToken}`;
          const src = new EventSource(urlToChangeStream);
          src.addEventListener('data', async (msg) => {
            const data = JSON.parse(msg.data);

            if (data.data.receiverId === auth.id && data.data.createdAt === data.data.updatedAt) {
              const newNoti = await getOne({ id: data.data.id, filter: { include: ['creator', 'receiver', 'video'] } });

              increaseUnread();
              addNoti(newNoti);
            }
          });
        }
      } else {
        alert('Sorry, your browser does not support server-sent events...');
      }
    }, [auth.id, addNoti, increaseUnread]);

    useEffect(() => {
      if (auth.id) {
        countNotiUnread();
        addNotiListener();
      }
    }, [auth.id, addNotiListener, countNotiUnread]);

    return (
      <>
        <Component {...hocProps} />
      </>
    );
  };

  Comp.displayName = 'withDataProvider';
  return Comp;
};
