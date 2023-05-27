import { create } from 'zustand';

import { VideoType, listResponse } from 'src/apis/videos';

type VideoStoreType = {
  data: VideoType[];
  total: number;
  skip: number;
  setData: (list: listResponse) => void;
  loadMoreData: (list: listResponse) => void;
};

export const useVideoStore = create<VideoStoreType>((set, get) => ({
  data: [],
  total: 0,
  skip: 0,
  setData: (list) => {
    set({ data: list.data });
    set({ total: list.total });
    set({ skip: 0 });
  },
  loadMoreData: (list) => {
    const prevData = get().data;
    set({ data: prevData.concat(list.data) });
    set({ total: list.total });
    set({ skip: list.skip });
  },
}));
