import axiosInstance from '../apiAxios';
import moment        from 'moment';

interface IEvent {
  id:       number;
  title:    string;
  location: string;
  type:     string;
  all_day?: boolean;
  starts:   string;
  ends_at:  string;
  notes:    string;
  breast?:  string;
}

export const CreateEvent = async (accountId, event): Promise<IEvent> => {
  let body = {
    title:     event.title,
    location:  JSON.stringify(event.location),
    type:      event.type,
    starts_at: moment(event.starts).format('YYYY-MM-DD HH:mm:00'),
    ends_at:   moment(event.ends).format('YYYY-MM-DD HH:mm:00'),
    notes:     event.notes,
    ...(event.type == 'regular' && {all_day: event.allDay}),
    ...(event.type == 'feed' && {breast: event.breast}),
  };

  if (event.type == 'feed' && event.breast) {
    body['breast'] = event.breast;
  }

  console.log('[EVENT] Create event request', accountId, event, body);

  return await axiosInstance.post(`/api/accounts/${accountId}/diary`, body);
};

export const RetrieveEvent = async accountId => {
  return await axiosInstance.get(`/api/accounts/${accountId}/diary`);
};

export const UpdateEvent = async (accountId, eventId, event) => {
  let body = {
    title:     event.title,
    location:  JSON.stringify(event.location),
    type:      event.type,
    starts_at: moment(event.starts).format('YYYY-MM-DD HH:mm:00'),
    ends_at:   moment(event.ends).format('YYYY-MM-DD HH:mm:00'),
    notes:     event.notes,
    ...(event.type == 'regular' && {all_day: event.allDay}),
    ...(event.type == 'feed' && {breast: event.breast}),
  };

  console.log('[EVENT] Update event request', accountId, eventId, event, body);

  return await axiosInstance.patch(`/api/accounts/${accountId}/diary/${eventId}`,body);
};

export const DeleteEvent = async (accountId, eventId) => {
  console.log('[EVENT] Delete event request', accountId, eventId);

  return await axiosInstance.delete(
    `/api/accounts/${accountId}/diary/${eventId}`,
  );
};
