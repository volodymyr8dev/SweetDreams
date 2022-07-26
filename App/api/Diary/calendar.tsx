import moment from 'moment';
import axiosInstance from '../index';

export const NewEventApi = async (
  accoundId,
  title,
  location,
  all_day,
  starts_at,
  ends_at,
  notes,
) => {
  console.log('starts_at', moment(starts_at).format('YYYY-MM-DD hh:mm:ss'));
  const body = {
    title,
    location:JSON.stringify(location),
    all_day,
    starts_at: moment(starts_at).format('YYYY-MM-DD hh:mm:ss'),
    ends_at: moment(ends_at).format('YYYY-MM-DD hh:mm:ss'),
    notes,
  };
  return await axiosInstance.post(`/api/accounts/${accoundId}/diary`, body);
};

export const GetEventApi = async accoundId => {
  return await axiosInstance.get(`/api/accounts/${accoundId}/diary`);
};
export const EditEventApi = async (accountId, diaryId,newEvent) => {

  return await axiosInstance.patch(
    `/api/accounts/${accountId}/diary/${diaryId}`,
    newEvent,
  );
};
export const DeleteEventApi = async (accountId, diaryId) => {
  return await axiosInstance.delete(
    `/api/accounts/${accountId}/diary/${diaryId}`,
  );
};
