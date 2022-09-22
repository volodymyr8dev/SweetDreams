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

export const startFirst = {
'last 24 hours': moment(new Date()).subtract(1,'days').format('YYYY-MM-DD'),
'last 7 days':   moment(new Date()).subtract(7,'days').format('YYYY-MM-DD'),
'last 28 days':  moment(new Date()).subtract(27,'days').format('YYYY-MM-DD'),
}

export const time = {
  'last 24 hours': [
    'last 24 hours',
    '24 hours -1 day',
    '24 hours -2 day',
    '24 hours -3 day',
    '24 hours -4 day',
    '24 hours -5 day',
    '24 hours -6 day',
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

const date = new Date();
export const startDate = {
  'last 24 hours': [
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
    moment(date).subtract(2, 'months').format('YYYY-MM-DD HH:mm:ss'),
  ],
  'last 7 days': [
    moment(date).subtract(6, 'days').format('YYYY-MM-DD HH:mm:ss'),
    moment(date).subtract(13, 'days').format('YYYY-MM-DD HH:mm:ss'),
    moment(date).subtract(20, 'days').format('YYYY-MM-DD HH:mm:ss'),
    moment(date).subtract(27, 'days').format('YYYY-MM-DD HH:mm:ss'),
  ],
  'last 28 days': [
    moment(date).subtract(27, 'days').format('YYYY-MM-DD HH:mm:ss'),
    moment(date).subtract(55, 'days').format('YYYY-MM-DD HH:mm:ss'),
  ],
};

export const EndTime = (activeTime, option) => {
  let date = new Date();
  console.log('activeTime',activeTime)
  console.log('option',option)
  if (option == 'last 24 hours') {
    switch (activeTime) {
      case 'last 24 hours':
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      case '24 hours -1 day':
        return moment(date).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '24 hours -2 day':
        return moment(date).subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '24 hours -3 day':
        return moment(date).subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '24 hours -4 day':
        return moment(date).subtract(4, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '24 hours -5 day':
        return moment(date).subtract(5, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '24 hours -6 day':
        return moment(date).subtract(6, 'days').format('YYYY-MM-DD HH:mm:ss');
    }
  } else if (option == 'last 7 days') {
    switch (activeTime) {
      case 'last 7 days':
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      case '7 days - 7':
        return moment(date).subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '7 days - 14':
        return moment(date).subtract(14, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '7 days - 21':
        return moment(date).subtract(21, 'days').format('YYYY-MM-DD HH:mm:ss');
    }
  } else if (option == 'last 28 days') {
    switch (activeTime) {
      case 'last 28 days':
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      case '28 days -28':
        return moment(date).subtract(28, 'days').format('YYYY-MM-DD HH:mm:ss');
    }
  }
};


//start Date
export const HandleStartTime = (direction, option, activeTime) =>{
  let indexActiveTime = time[option].indexOf(activeTime);

  if(direction === 'left'){
  
    return indexActiveTime == 0
    ? startDate[option][time[option].length - 1]
    : startDate[option][indexActiveTime - 1];
 
}else{
  
  return indexActiveTime == time[option].length - 1
  ? startDate[option][0]
  : startDate[option][indexActiveTime + 1];
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
