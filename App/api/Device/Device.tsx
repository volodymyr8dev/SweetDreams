import axiosInstance from '../apiAxios';
import deviceAxios   from '../deviceAxios';

export const GetSalt = async type => {
  console.log('[DEVICE CONFIGURATION] Salt request', type);

  return await axiosInstance.get(`/api/setup/${type}/wifi-salt`);
};

export const ConnectDevice = async (accountId, serialNumber, mqttUser, authpass) => {
  const body = {
    serial_number: serialNumber,
    mqttUser: mqttUser,
    authpass: authpass
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
  const body = {
    data: [...data],
  };

  console.log('[DEVICE CONFIGURATION] Configuration request', body);

  return await deviceAxios.post('', body);
};