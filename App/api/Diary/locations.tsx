import axiosInstance from '../apiAxios';

export const getRecentLocation = async accountId => {
  return await axiosInstance.get(`/api/accounts/${accountId}/diary/locations`);
};
