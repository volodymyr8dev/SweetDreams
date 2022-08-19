import axiosInstance from '../apiAxios';

export const SettingsDevice = async (data, accountId) => {
  const body = {
    ...data,
  };

  console.log('[DEVICE SETTINGS] Patch configuration request', body);

  return await axiosInstance.patch(`/api/accounts/${accountId}/device/configuration`, accountId, body);
};

export const getSettingsDevice = async (accountId) => {
  console.log('[DEVICE SETTINGS] Retrieve configuration request', accountId);

  return await axiosInstance.get(`/api/accounts/${accountId}/device/configuration`);
};
