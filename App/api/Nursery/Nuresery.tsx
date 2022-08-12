import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import axiosInstance from '../index';

export const NureseryGetChartsApi = (account, nursery,start,end) => {
  return axiosInstance.get(
    `/api/accounts/${account}/nursery/${nursery}/temperature/charts?starts_at=${start}&ends_at=${end}`,
  );
};

export const NureseryTemperatureApi = (accountId, start?, end?) => {
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
export const NureseryTemperatureGetApi = (accountId, nurseryId) => {
  return axiosInstance.patch(
    `/api/accounts/${accountId}/nursery/${nurseryId}/temperature/charts`,
  );
};
