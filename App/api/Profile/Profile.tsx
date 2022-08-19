import axiosInstance from '../apiAxios';

export const UpdateProfile = async user => {
  const body = {
    email:                 user.email,
    password_old:          user.password,
    password:              user.password,
    password_confirmation: user.password_confirmation,
    name:                  user.name,
    date_of_birth:         user.date,
    gender:                user.gender,
  };

  console.log('[PROFILE] Patch profile request', body);

  return await axiosInstance.patch('/api/me', user);
};

export const UpdateProfileChild = async user => {
  const body = {
    baby_name:          user.baby_name,
    baby_date_of_birth: user.baby_date_of_birth,
    baby_gender:        user.baby_gender,
  };
  
  console.log('[PROFILE] Patch baby request', body);

  return await axiosInstance.patch(`/api/accounts/${user.id}/baby`, body);
};

export const getProfile = async () => {
  console.log('[PROFILE] Retrieve profile request');

  return await axiosInstance.get('api/me');
};
