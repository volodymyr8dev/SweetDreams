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

export const DeviceCertificate = async () => {
  const body = {
    password: "mistypwd",
  };
  return await axiosInstance.post(`/api/setup/misty/device-certificate`, body);
};

// /api/setup/{type}/device-certificate
