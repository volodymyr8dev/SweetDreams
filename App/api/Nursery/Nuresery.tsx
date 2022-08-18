import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import axiosInstance from '../index';
import moment from 'moment';

export const NureseryGetChartsApi = (account, nursery,start,end) => {
  return axiosInstance.get(
    `/api/accounts/${account}/nursery/${nursery}/temperature/charts?start=${start}&end=${end}`,
  );
};

export const NureseryTemperatureApi = (accountId, start?, end?) => {
  console.log('accId',accountId,start,end)
  if (start) {
    return axiosInstance.get(
      `/api/accounts/${accountId}/nursery?starts_at=${start}&ends_at=${end}`,
    );
  }
  return axiosInstance.get(`/api/accounts/${accountId}/nursery`);
};

export const NureseryTemperaturePostApi = (accountId, start, end) => {
  return axiosInstance.post(`/api/accounts/${accountId}/nursery`, {
    starts_at: start,
    ends_at: end,
  });
};

export const NureseryTemperaturePatchApi = accountId => {
  return axiosInstance.patch(`/api/accounts/${accountId}/nursery/{nurseryId}`);
};

export const NureseryTemperatureGetApi = (accountId, nurseryId, start, end) => {
  let startF = moment(start).format('YYYY-MM-DD')
  let endF = moment(end).format('YYYY-MM-DD');
  console.log('startF',startF)
  console.log('endF', endF);
  return axiosInstance.get(
    `/api/accounts/${accountId}/nursery/${nurseryId}/temperature/charts?start=${startF}&end=${endF}`,
  );
};
