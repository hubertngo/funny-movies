
import dayjs from 'dayjs';

import { FORMAT_DATE } from 'src/constants/format';

export const formatDate = (date?: any, utc = false) => {
  if (!date) {
    return '--';
  }

  // eslint-disable-next-line no-unsafe-optional-chaining
  return (
    dayjs(date).format(FORMAT_DATE) + (utc ? ' (UTC' + dayjs(date).format('Z')?.split(':')?.[0] + ')' : '')
  ).toUpperCase();
};