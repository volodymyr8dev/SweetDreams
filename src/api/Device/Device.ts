import axiosInstance from '../apiAxios';
import deviceAxios   from '../deviceAxios';

export const GetSalt = async type => {
  console.log('[DEVICE CONFIGURATION] Salt request', type);

  return await axiosInstance.get(`/api/setup/${type}/wifi-salt`);
};

export const GenerateCredentials = async (serialNumber) => {
  const body = {
    device_id: serialNumber,
    password:  'O3vFv98j81NtBFVV3v961',
  };

  console.log('[DEVICE CONFIGURATION] Generate credentials request', body);

  return await axiosInstance.post(`/api/setup/mqtt-device`, body);
};

export const GetServerCredentials = async (serialNumber) => {
  console.log('[DEVICE CONFIGURATION] Get server credentials request');

  return await axiosInstance.get(`/api/setup/mqtt-server-credentials`);
};

export const ConnectDevice = async (accountId, serialNumber, mqttUser, mqttPassword) => {
  const body = {
    serial_number: serialNumber,
    mqttUser:      mqttUser,
    authpass:      mqttPassword
  };

  console.log('[DEVICE CONFIGURATION] Add device request', body);

  return await axiosInstance.post(`/api/accounts/${accountId}/device`, body);
};

export const DeviceCertificate = async () => {
  const body = {
    password: 'mistypwd',
  };

  console.log('[DEVICE CONFIGURATION] Certificate request', body);

  return await axiosInstance.post('/api/setup/misty/device-certificate', body);
};

export const PublishConfiguration = async data => {
  const body = data

  console.log('[DEVICE CONFIGURATION] Configuration request', body);

  return await deviceAxios.post('/', body);
};