import { message as Alert } from 'antd';
import { getToken } from 'src/utils/auth-storage';

export const UnauthorizedHandler = (error: any) => {
  const { response } = error || {};
  const message = response?.data?.error?.message || '';

  if (message && message?.includes('Unknown "')) {
    return;
  }

  switch (message) {
    case 'Authorization Required':
      break;

    case '':
      break;
    case undefined:
      break;
    default:
      Alert.error(response?.data?.error?.message);
      break;
  }
};

export const SetSignedHeader = async (config: any) => {
  config.headers = {
    ...config.header,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const authToken = getToken();

  if (authToken) {
    config.headers = {
      ...config.headers,
      Authorization: authToken,
    };
  }

  return config;
};