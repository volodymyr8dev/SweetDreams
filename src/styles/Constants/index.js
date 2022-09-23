import moment from 'moment';
import { dateTimeFormat } from '../../utils/time';

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

export const startFirst = {
'last 24 hours': moment(new Date()).subtract(1,'days').format('YYYY-MM-DD HH:mm:ss'),
'last 7 days':   moment(new Date()).subtract(7,'days').format('YYYY-MM-DD HH:mm:ss'),
'last 28 days':  moment(new Date()).subtract(27,'days').format('YYYY-MM-DD HH:mm:ss'),
}

export const time = {
  'last 24 hours': [
    '24 hours -6 day',
    '24 hours -5 day',
    '24 hours -4 day',
    '24 hours -3 day',
    '24 hours -2 day',
    '24 hours -1 day',
    'last 24 hours',
    
   
  ],
  'last 7 days': ['last 7 days', '7 days - 7', '7 days - 14', '7 days - 21'],
  'last 28 days': ['last 28 days', '28 days -28'],
};

export const timeWithoutActivation = {
  'last 24 hours': [
    'last 24 hours',
    '2 days ago',
    '3 days ago',
    '4 days ago',
    '5 days ago',
    '6 days ago',
    '7 days ago',
  ],
  'last 7 days': ['last 7 days', '2 weeks ago', '3 weeks ago', '4 weeks ago'],
  'last 28 days': ['last 28 days', '2 month ago'],
};


export const startDate = () => {
  return {
  'last 24 hours': [
    dateTimeFormat(moment(new Date()).subtract(7, 'days')),
    dateTimeFormat(moment(new Date()).subtract(6, 'days')),
    dateTimeFormat(moment(new Date()).subtract(5, 'days')),
    dateTimeFormat(moment(new Date()).subtract(4, 'days')),
    dateTimeFormat(moment(new Date()).subtract(3, 'days')),
    dateTimeFormat(moment(new Date()).subtract(2, 'days')),
    dateTimeFormat(moment(new Date()).subtract(1, 'days')),
  ],
  'last 7 days': [
   dateTimeFormat( moment(new Date()).subtract(6, 'days')),
    dateTimeFormat(moment(new Date()).subtract(13, 'days')),
    dateTimeFormat(moment(new Date()).subtract(20, 'days')),
    dateTimeFormat(moment(new Date()).subtract(27, 'days')),
  ],
  'last 28 days': [
    dateTimeFormat(moment(new Date()).subtract(27, 'days')),
    dateTimeFormat(moment(new Date()).subtract(55, 'days')),
  ],
 } 
};

export const EndTime = (option,start) => {

  if (option == 'last 24 hours') {
     return dateTimeFormat(moment(start).add(1,'day'));
  } else if (option == 'last 7 days') {

    return dateTimeFormat(moment(start).add(7,'day'));
  
  } else if (option == 'last 28 days') {
    
    return dateTimeFormat(moment(start).add(28,'day'));
  }else{

    return  dateTimeFormat(moment(start).add(1,'day'));
  }
};


//start Date
export const HandleStartTime = (direction, option, activeTime) =>{
  let indexActiveTime = time[option].indexOf(activeTime);

  if(direction === 'left'){
  
    return indexActiveTime == 0
    ? startDate()[option][time[option].length - 1]
    : startDate()[option][indexActiveTime - 1];
 
}else{
  
  return indexActiveTime == time[option].length - 1
  ? startDate()[option][0]
  : startDate()[option][indexActiveTime + 1];
}}

//end Date
export const HandleEndTime = (direction, option, activeTime) =>{
  let indexActiveTime = time[option].indexOf(activeTime);

  if(direction === 'left'){
  
    return indexActiveTime == 0
  ? time[option][time[option].length - 1]
  : time[option][indexActiveTime - 1];
 
}else{
  
  return indexActiveTime == time[option].length - 1
  ? time[option][0]
  : time[option][indexActiveTime + 1];
}}


// export const chooseTimeOrIndex = (timeT,type, direction, activeTime, option) => {
//   let indexActiveTime = timeT[option].indexOf(activeTime);

//   if (direction === 'left') {
  
//     if (type == 'time') {
//       return indexActiveTime == 0
//         ? timeT[option][timeT[option].length - 1]
//         : timeT[option][indexActiveTime - 1];
//     } else {
//       return indexActiveTime == 0
//         ? timeIndex[option][timeT[option].length - 1]
//         : timeIndex[option][indexActiveTime - 1];
//     }
 
//   } else {
//     if (type == 'time') {
//       return indexActiveTime == timeT[option].length - 1
//         ? timeT[option][0]
//         : timeT[option][indexActiveTime + 1];
//     } else {
//       return indexActiveTime == timeT[option].length - 1
//         ? timeIndex[option][0]
//         : timeIndex[option][indexActiveTime + 1];
//     }
//   }
// };
