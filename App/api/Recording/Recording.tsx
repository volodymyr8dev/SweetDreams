import axiosInstance from '../apiAxios';

interface IRecord {
  uri:  string | object;
  name: string;
  type: string;
}

export const NewRecording = async (accountId, recording2, nameFile) => {
  const formData = new FormData();

  formData.append('recording', {
    uri: recording2,
    name: `${nameFile}`,
  } as any);

  console.log('[RECORDINGS] Post recording request', accountId, recording2, nameFile, formData);

  return await axiosInstance.post(`/api/accounts/${accountId}/recordings`, formData);
};

export const GetRecord = async accountId => {
  console.log('[RECORDINGS] Get recordings request', accountId);

  return await axiosInstance.get(`/api/accounts/${accountId}/recordings`);
};

export const DeleteRecording = async (accountId, recordingId) => {
  console.log('[RECORDINGS] Delete recording request', accountId, recordingId);

  return await axiosInstance.delete(`/api/accounts/${accountId}/recordings/${recordingId}`);
};

export const PlayRecordSound = async pathName => {
  console.log('[RECORDINGS] Play recording request', pathName);

  return await axiosInstance.get(`/upload/files/recording/${pathName}`);
};