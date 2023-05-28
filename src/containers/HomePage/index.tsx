import { Divider, List, Skeleton } from 'antd';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';


import { getList } from 'src/apis/videos';
import { LIMIT } from 'src/constants/pagination';
import { useVideoStore } from 'src/stores/useVideoStore';
import { formatDate } from 'src/utils/format-time';
import { truncate } from 'src/utils/string-utils';

import classes from './styles.module.less';

export const HomePageContainer = () => {
  const { data, total, skip, loadMoreData, setData } = useVideoStore();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMoreData = useCallback(async () => {
    try {
      if (isLoadingMore) return;
      setIsLoadingMore(true);
      const listVideo = await getList({ skip: skip + LIMIT, include: 'creator', limit: LIMIT });
      loadMoreData(listVideo);
    } catch {
      // error is handled by middleware
    } finally {
      setIsLoadingMore(false);
    }
  }, [loadMoreData, skip, isLoadingMore]);

  useEffect(() => {
    const getVideoList = async () => {
      const listVideo = await getList({ skip: 0, include: 'creator', limit: LIMIT });
      setData(listVideo);
    };
    getVideoList();
  }, [setData]);

  return (
    <div className="mx-auto py-12">
      <List
        dataSource={data}
        renderItem={(notificationItem) => (
          <List.Item key={notificationItem.id}>
            <div className="w-full grid grid-cols-2 gap-4" key={notificationItem.id}>
              <div>
                <iframe className={classNames("w-full", classes.video)} src={notificationItem.embed?.iframeUrl} />
              </div>
              <div>
                <h1 className="text-xs sm:text-base lg:text-xl">{notificationItem.title}</h1>
                <p className="text-xs"><i>{`Shared by ${notificationItem.creator?.name} at ${formatDate(notificationItem.createdAt)}`}</i></p>
                <p className="hidden sm:block text-sm">{truncate(notificationItem.description || '', 200)}</p>
              </div>
            </div>
          </List.Item>
        )}
      />
      {!isLoadingMore && data.length < total && (
        <Waypoint onEnter={handleLoadMoreData} />
      )}
      {isLoadingMore && <Skeleton avatar paragraph={{ rows: 1 }} active />}
      {data.length >= total && <Divider plain>It is all, nothing more 🤐</Divider>}
    </div>
  );
};
