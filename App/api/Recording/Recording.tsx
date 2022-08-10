import React from 'react';
import axiosInstance from '../index';

interface IRecord {
  uri: string | object;
  name: string;
  type: string;
}
export const NewRecording = async (accountId, recording2, nameFile) => {
  // const body = {
  //   recording: recording,
  // };

  const formData = new FormData();
  formData.append('recording', {
    uri: recording2,
    name: `${nameFile}`,
  } as any);
  return await axiosInstance.post(
    `/api/accounts/${accountId}/recordings`,
    formData,
  );
};

export const GetRecord = async accountId => {
  return await axiosInstance.get(`/api/accounts/${accountId}/recordings`);
};

export const DeleteRecording = async (accountId, recordingId) => {
  return await axiosInstance.delete(
    `/api/accounts/${accountId}/recordings/${recordingId}`,
  );
};

export const PlayRecordSound = async path_name => {
  return await axiosInstance.delete(`/upload/files/recording/${path_name}`);
};

// https://staging.mistythecloudserver.com/upload/files/recording/{path_name}
