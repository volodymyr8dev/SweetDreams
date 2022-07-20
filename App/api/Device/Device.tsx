import React from 'react';
import axiosInstance from '../index';

export const ConnectDevice = async (accountId, serialNumber) => {
  const body = {
    serial_number: serialNumber,
  };
  return await axiosInstance.post(`/api/accounts/${accountId}/device`, body);
};

export const GetSalt = async type => {
  return await axiosInstance.get(`/api/setup/${type}/wifi-salt`);
};
