import moment from 'moment';

export const COLORS = {
  backGround: 'rgba(26, 23, 45, .75)',
  text: '#2371AB',
  textLight: '#2371AB',
  back: '#292C62',
  backDark: '#1F1933',
  backView: '#1A172D',
  yellow: '#CE9B51',
};

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const time = [
  'last 24 hours',
  '2 days ago',
  '3 days ago',
  '4 days ago',
  '5 days ago',
  '6 days ago',
  '7 days ago',
  '7 days - 14',
  '7 days - 21',
  '2 weeks ago',
  '3 weeks ago',
  '4 weeks ago',
  '2 month ago',
];
const date = new Date();
export const timeIndex = [
  moment(date).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(date).subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(date).subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(date).subtract(4, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(date).subtract(5, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(date).subtract(6, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(date).subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(date).subtract(14, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(date).subtract(21, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(date).subtract(14, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(date).subtract(21, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(date).subtract(28, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(date).subtract(62, 'days').format('YYYY-MM-DD HH:mm:ss'),
];
