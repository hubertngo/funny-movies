import apiBaseUrlAxios from '../utils/apiBaseUrlAxios';
import applyURIFilter from '../utils/apply-url-filter';

import { UserType } from './users';
import { VideoType } from './videos';


const MODEL_PLURAL = 'notifications';

export type NotificationType = {
  id?: string;
  creator?: UserType;
  receiver?: UserType;
  receiverId?: string;
  videoId?: string;
  creatorId?: string;
  video?: VideoType;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type listResponse = {
  data: NotificationType[];
  skip: number;
  total: number;
  limit: number;
};

export const count = (params: any) =>
  apiBaseUrlAxios.get<any, { count: number }>(`/${MODEL_PLURAL}/count${applyURIFilter(params, 'where')}`);

export const create = (payload: NotificationType) => apiBaseUrlAxios.post<NotificationType, NotificationType>(`/${MODEL_PLURAL}`, payload);

export const update = (payload: any) => {
  const { id, ...rest } = payload;
  return apiBaseUrlAxios.patch(`/${MODEL_PLURAL}/${id}`, rest);
};

export const getOne = (params: any) => {
  const { id, filter } = params;
  return apiBaseUrlAxios.get<any, NotificationType>(`/${MODEL_PLURAL}/${id || 'findOne'}${applyURIFilter(filter)}`);
};

export const getList = (filter: any) =>
  apiBaseUrlAxios.get<undefined, listResponse>(`/${MODEL_PLURAL}${applyURIFilter(filter)}`);

export const remove = (id: string) => apiBaseUrlAxios.delete(`/${MODEL_PLURAL}/${id}`);

export const removeAll = (filter: any) => apiBaseUrlAxios.delete(`/${MODEL_PLURAL}${applyURIFilter(filter)}`);

export const updateAllNoti = (payload: any) => {
  const { where, data } = payload;
  return apiBaseUrlAxios.post(`/${MODEL_PLURAL}/update?where=${JSON.stringify(where)}`, data);
};
