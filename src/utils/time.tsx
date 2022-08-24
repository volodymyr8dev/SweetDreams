import moment from 'moment';

export const dateFormat = date => moment(date).format('YYYY-MM-DD');
export const dateTimeFormat = date => moment(date).format('YYYY-MM-DD HH:mm:ss');
