import moment from 'moment';
import axiosInstance from '../apiAxios';

interface IEvent {
  accoundId: number;
  title: string;
  location: string;
  type: string;
  breast?: string;
  all_day: boolean;
  starts_at: string;
  ends_at: string;
  notes: string;
}

export const NewEventApi = async (
  accoundId,
  title,
  location,
  type,
  all_day,
  starts_at,
  ends_at,
  notes,
  breast?,
): Promise<IEvent> => {
  const body = {
    title,
    location: JSON.stringify(location),
    type,
    ...(type =='regular'&&{all_day}),
    starts_at: moment(starts_at).format('YYYY-MM-DD hh:mm:ss'),
    ends_at: moment(ends_at).format('YYYY-MM-DD hh:mm:ss'),
    notes,
    breast,
  };
  return await axiosInstance.post(`/api/accounts/${accoundId}/diary`, body);
};

export const GetEventApi = async accoundId => {
  return await axiosInstance.get(`/api/accounts/${accoundId}/diary`);
};
export const EditEventApi = async (accountId, diaryId, newEvent) => {
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
