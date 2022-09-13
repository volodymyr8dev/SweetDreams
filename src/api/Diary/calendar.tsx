import moment from 'moment';
import { dateTimeFormat } from '../../utils/time';
import axiosInstance from '../apiAxios';

interface IEvent {
  id: number;
  title: string;
  location: string;
  type: string;
  all_day: boolean;
  starts: string;
  ends_at: string;
  notes: string;
  breast?: string;
}

export const NewEventApi = async (event): Promise<IEvent> => {
  const body = {
    title: event.title,
    location: JSON.stringify(event.location),
    type: event.type,
    ...(event.type == 'regular' && {all_day: event.allDay}),
    starts_at: dateTimeFormat(event.starts),
    ends_at: dateTimeFormat(event.ends),
    notes:event.notes,
    breast:event.breast,
  };
  return await axiosInstance.post(`/api/accounts/${event.id}/diary`, body);
};

export const GetEventApi = async accoundId => {
  return await axiosInstance.get(`/api/accounts/${accoundId}/diary`);
};
export const EditEventApi = async (accountId, diaryId, event) => {
    
  const body = {
      title: event.title,
      location: JSON.stringify(event.location),
      type: event.type,
      ...(event.type == 'regular' && {all_day: event.allDay}),
      starts_at: dateTimeFormat(event.starts),
      ends_at: dateTimeFormat(event.ends),
      notes: event.notes,
      ...(event.type == 'feed' && {breast:event.breast})
    };

  return await axiosInstance.patch(`/api/accounts/${accountId}/diary/${diaryId}`,body);
};
export const DeleteEventApi = async (accountId, diaryId) => {
  return await axiosInstance.delete(
    `/api/accounts/${accountId}/diary/${diaryId}`,
  );
};
