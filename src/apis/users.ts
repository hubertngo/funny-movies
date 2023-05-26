import apiBaseUrlAxios from '../utils/apiBaseUrlAxios';
import applyURIFilter from '../utils/apply-url-filter';

const MODEL_PLURAL = 'users';

export type UserType = {
  fullName?: string;
  gender?: string;
  avatar?: string;
  id?: string;
  status?: string;
  birthDate?: string;
  createdAt?: Date;
  updatedAt?: Date;
  phone?: string;
  email?: string;
  lastCheckIn?: Date;
};

type listResponse = {
  data: UserType[];
  skip: number;
  total: number;
  limit: number;
};

export type changePasswordProps = {
  oldPassword: string;
  newPassword: string;
};

export type loginPayload = {
  email?: string;
  password?: string;
};

export interface loginResponse {
  id: string;
  role: string;
  userId: string;
  ttl: number;
  user: UserType;
}

export type resetPasswordParams = {
  token?: string;
  newPassword?: string;
};

export const count = (params: any) =>
  apiBaseUrlAxios.get<any, { count: number }>(`/${MODEL_PLURAL}/count${applyURIFilter(params, 'where')}`);

export const create = (payload: UserType) => apiBaseUrlAxios.post<UserType, UserType>(`/${MODEL_PLURAL}`, payload);

export const update = (payload: UserType) => {
  const { id, ...rest } = payload;
  return apiBaseUrlAxios.patch<UserType, UserType>(`/${MODEL_PLURAL}/${id}`, rest);
};

export const getOne = (params: any) => {
  const { id, filter } = params;
  return apiBaseUrlAxios.get<any, UserType>(`/${MODEL_PLURAL}/${id || 'findOne'}${applyURIFilter(filter)}`);
};

export const getList = (filter: any) =>
  apiBaseUrlAxios.get<undefined, listResponse>(`/${MODEL_PLURAL}${applyURIFilter(filter)}`);

export const remove = (id: string) => apiBaseUrlAxios.delete(`/${MODEL_PLURAL}/${id}`);

export const getUserAuth = (userId: string) => apiBaseUrlAxios.get<undefined, UserType>(`/${MODEL_PLURAL}/${userId}`);

export const checkIn = () => apiBaseUrlAxios.get<undefined, UserType>(`/${MODEL_PLURAL}/checkin`);

export const updateProfile = (userId: string, payload = {}) =>
  apiBaseUrlAxios.post<UserType, UserType>(`/${MODEL_PLURAL}/${userId}`, payload);

export const login = (payload: loginPayload) => {
  return apiBaseUrlAxios.post<loginPayload, loginResponse>(`/${MODEL_PLURAL}/login`, payload);
};

export const logout = () => apiBaseUrlAxios.post(`/${MODEL_PLURAL}/logout`);

export const forgotPassword = (email: string) => apiBaseUrlAxios.post(`/${MODEL_PLURAL}/reset`, { email });

export const resetPassword = (payload: resetPasswordParams) => {
  const { token, newPassword } = payload;
  return apiBaseUrlAxios.post(`/${MODEL_PLURAL}/reset-password?access_token=${token}`, { newPassword });
};

export const changePassword = (payload: changePasswordProps) => {
  return apiBaseUrlAxios.post(`/${MODEL_PLURAL}/change-password`, payload);
};

export const register = (userData: UserType) => {
  return apiBaseUrlAxios.post<undefined, UserType>(`/${MODEL_PLURAL}`, userData);
};
