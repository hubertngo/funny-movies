import produce from 'immer';
import { listResponse } from 'src/apis/notification';
import create from 'zustand';

import { NotificationType } from 'src/apis/notification';

type NotificationStoreType = {
  unread: number;
  setUnread: (count: number) => void;
  notificationLists: listResponse;
  setNotificationList: (data: listResponse) => void;
  increaseUnread: () => void;
  addNoti: (noti: NotificationType) => void;
  updateReadItem: (id: string) => void;
};

export const useNotificationStore = create<NotificationStoreType>((set, get) => ({
  unread: 0,
  notificationLists: {
    data: [],
    skip: 0,
    total: 1,
    limit: 12,
  },
  setUnread: (count: number) => {
    set({ unread: count });
  },
  setNotificationList: (data: listResponse) => {
    set({ notificationLists: data });
  },
  increaseUnread: () => {
    const current = get().unread;
    set({ unread: current + 1 });
  },
  addNoti: (noti: NotificationType) => {
    set(
      produce((state) => {
        state.notificationLists.data = [noti, ...state.notificationLists.data];
      }),
    );
  },
  updateReadItem: (id: string) => {
    const prevData = get().notificationLists.data;
    set(
      produce((state) => {
        state.notificationLists.data = prevData.map(item => {
          if (item.id === id) {
            return { ...item, isRead: true }
          }
          return item;
        });
      }),
    );
  }
}));
