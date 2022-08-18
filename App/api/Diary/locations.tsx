import axiosInstance from '../index';

export const getRecentLocation = async accountId => {
  return await axiosInstance.get(`/api/accounts/${accountId}/diary/locations`);
};
