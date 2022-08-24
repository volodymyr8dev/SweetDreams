import axiosInstance from '../apiAxios';
import moment        from 'moment';

export const NurseryGetChartsApi = (account, nursery, start, end) => {
  console.log('[NURSERY] Retrieve nursery request', account, nursery, start, end);

  return axiosInstance.get(`/api/accounts/${account}/nursery/${nursery}/temperature/charts?start=${start}&end=${end}`);
};

export const NurseryTemperatureApi = (accountId, start?, end?) => {
  console.log('[NURSERY] Retrieve temperature request', accountId, start, end);

  if (start) {
    return axiosInstance.get(`/api/accounts/${accountId}/nursery?starts_at=${start}&ends_at=${end}`);
  }

  return axiosInstance.get(`/api/accounts/${accountId}/nursery`);
};

export const NurseryTemperatureGetApi = (accountId, nurseryId, start, end) => {
  let startF = moment(start).format('YYYY-MM-DD'),
      endF   = moment(end).format('YYYY-MM-DD');
      
  console.log('[NURSERY] Retrieve temperature request', accountId, nurseryId, start, end);

  return axiosInstance.get(`/api/accounts/${accountId}/nursery/${nurseryId}/temperature/charts?start=${startF}&end=${endF}`);
};
