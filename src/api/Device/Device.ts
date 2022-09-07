import axiosInstance from '../apiAxios';
import deviceAxios   from '../deviceAxios';
import moment        from 'moment';

export const DeviceInit = async (accountId, serialNumber, type) => {
  const body = {
    type:          type,
    serial_number: serialNumber,
    password:      'O3vFv98j81NtBFVV3v962',
  };

  console.log('[DEVICE CONFIGURATION] Add device request', body);

  return await axiosInstance.post(`/api/accounts/${accountId}/device/init`, body);
};

export const ConnectDevice = async (accountId, serialNumber) => {
  const body = {
    serial_number: serialNumber,
    time:          moment(new Date()).format('HH:mm')
  };

  console.log('[DEVICE CONFIGURATION] Add device request', body);

  return await axiosInstance.post(`/api/accounts/${accountId}/device`, body);
};

export const FetchLatestConfig = async (accountId, deviceId) => {
  console.log('[DEVICE CONFIGURATION] Fetch device config request');

  return await axiosInstance.get(`/api/accounts/${accountId}/device/${deviceId}`);
};

export const PatchDevice = async (accountId, deviceId, body) => {
  console.log('[DEVICE CONFIGURATION] Patch device request', body);

  return await axiosInstance.patch(`/api/accounts/${accountId}/device/${deviceId}/configuration`, body);
};

export const DisconnectDevice = async (accountId, deviceId) => {
  console.log('[DEVICE CONFIGURATION] Delete device request');

  return await axiosInstance.delete(`/api/accounts/${accountId}/device/${deviceId}`);
};

export const PublishConfiguration = async data => {
  const body = data

  console.log('[DEVICE CONFIGURATION] Configuration request', body);

  return await deviceAxios.post('/', body);
};