import React from 'react';
import axiosInstance from '../index';

export const SettingsDevice = async (data, accountId) => {
  const body = {
    ...data,
  };
  console.log(body, accountId);
  return await axiosInstance.patch(
    `/api/accounts/${accountId}/device/configuration`,
    body,
  );
};

export const getSettingsDevice = async (accountId) => {
  return await axiosInstance.get(
    `/api/accounts/${accountId}/device/configuration`,
  );
};