import {temperatureFilter} from '../styles/Constants';

export const filterTemperature = temperature => {
  temperature.sort((a, b) => a.time.localeCompare(b.time));
  let res = [];
  temperatureFilter.forEach(filter => {
    let n = 0;
    temperature.forEach(temp => {
      if (filter.includes(temp.time.split(':')[0])) {
        res.push(temp);
      } else {
        n++;
      }
    });
    if (n == temperature.length) {
      res.push({temperature: 0});
    }
  });
  res.push({temperature: 0});
  res.push({temperature: 0});
  console.log('result', res);
  const filteredresult = res.filter((value, index, self) => {
    return value.temperature == 0
      ? true
      : index ===
          self.findIndex(
            t =>
              t.hasOwnProperty('time') &&
              value.hasOwnProperty('time') &&
              t.time.split(':')[0] === value.time.split(':')[0],
          );
  });
  return filteredresult;
};

export const handleCreateFullData = (twoDays, temperature, start, end) => {
  if (twoDays[`${start}`]) {
    Object.values(twoDays[`${start}`]).forEach((item: any): void => {
      item?.temperature ? temperature.push(item) : '';
    });
    // temperature.push({time: '15:00', temperature: 21});
    // temperature.push({time: '03:00', temperature: 12});
    // temperature.push({time: '18:00', temperature: 10});
    // temperature.push({time: '20:00', temperature: 10});
    // temperature.push({time: '09:00', temperature: 10});
  } else if (twoDays[`${end}`]) {
    Object.values(twoDays[`${end}`]).forEach((item: any): void => {
      item?.temperature ? temperature.push(item) : '';
    });
  }
};
