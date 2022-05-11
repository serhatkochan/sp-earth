import moment from 'moment';
import dayjs from 'services/dayjs';

export const dateDifferenceAsDay = (startDate, endDate) => {
  let result = '0';
  if (endDate && startDate) {
    const duration = moment.duration(moment(endDate).diff(moment(startDate))).asDays();
    result = Math.round(duration);

    if (result < 0) {
      result = '0';
    }
  }

  return result;
};

export const getTableDate = (date, format = 'DD.MM.YYYY') => {
  return dayjs(date).format(format);
};

export const getEndOfDay = (date) => {
  return moment(date).endOf('day').toISOString();
};

export const getStartOfDay = (date) => {
  return moment(date).startOf('day').toISOString();
};
