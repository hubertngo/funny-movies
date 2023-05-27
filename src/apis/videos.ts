import { UserType } from './users';

import apiBaseUrlAxios from '../utils/apiBaseUrlAxios';
import applyURIFilter from '../utils/apply-url-filter';

const MODEL_PLURAL = 'videos';

export type ThumbnailType = {
  height: number;
  width: number;
  url: string;
}

export type EmbedType = {
  height: number;
  width: number;
  iframeUrl: string;
}

export type VideoType = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  description?: string;
  videoLink?: string;
  thumbnails?: ThumbnailType[];
  embed?: EmbedType;
  creator?: UserType;
};

export type listResponse = {
  data: VideoType[];
  skip: number;
  total: number;
  limit: number;
};

export const count = (params: any) =>
  apiBaseUrlAxios.get<any, { count: number }>(`/${MODEL_PLURAL}/count${applyURIFilter(params, 'where')}`);

export const create = (payload: VideoType) =>
  apiBaseUrlAxios.post<VideoType, VideoType>(`/${MODEL_PLURAL}`, payload);

export const update = (payload: VideoType) => {
  const { id, ...rest } = payload;

  return apiBaseUrlAxios.patch<VideoType, VideoType>(`/${MODEL_PLURAL}/${id}`, rest);
};

export const getOne = (params: any) => {
  const { id, filter } = params;

  return apiBaseUrlAxios.get<any, VideoType>(`/${MODEL_PLURAL}/${id || 'findOne'}${applyURIFilter(filter)}`);
};

export const getList = (filter: any) =>
  apiBaseUrlAxios.get<undefined, listResponse>(`/${MODEL_PLURAL}${applyURIFilter(filter)}`);

export const remove = (id: string) => apiBaseUrlAxios.delete(`/${MODEL_PLURAL}/${id}`);

export const shareVideo = (videoLink: string) => {

  return apiBaseUrlAxios.post<{ videoLink: string }, VideoType>(`/${MODEL_PLURAL}/shareVideo`, { videoLink });
};