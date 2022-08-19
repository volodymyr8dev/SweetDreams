import axiosInstance from '../apiAxios';

export const LogIn = async (email, password) => {
  const body = {
    email,
    password,
  };

  console.log('[AUTH] Login requiest', body);

  return await axiosInstance.post('/api/login', body);
};

export const deleteAccount = async () => {
  console.log('[AUTH] Delete account requiest');

  return await axiosInstance.delete('/api/me');
};

export const Logout = async () => {
  console.log('[AUTH] Logout requiest');

  return await axiosInstance.post('/api/logout');
};
