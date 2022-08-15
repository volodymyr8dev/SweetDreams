import React from 'react';
import axiosInstance from '../index';
import axiosInstance2 from '../index2';

export const ConnectDevice = async (accountId, serialNumber, mqttUser, mqttPassword) => {
  const body = {
    serial_number: serialNumber,
    mqttUser: mqttUser,
    mqttPassword: mqttPassword,
  };
  return await axiosInstance.post(`/api/accounts/${accountId}/device`, body);
};

export const GetSalt = async type => {
  return await axiosInstance.get(`/api/setup/${type}/wifi-salt`);
};

export const DeviceCertificate = async () => {
  const body = {
    password: 'mistypwd',
  };
  return await axiosInstance.post('/api/setup/misty/device-certificate', body);
};

export const ConnectHomeWifi = async data => {
  const body = {
    data: [...data],
  };
  console.log(body);

  return await axiosInstance2.post('', body);
};

// /api/setup/{type}/device-certificate
