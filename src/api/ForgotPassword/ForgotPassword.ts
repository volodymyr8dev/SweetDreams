import axiosInstance from '../apiAxios';

export const ForgotPassword = async email => {
  const body = {
    email,
  };

  console.log('[FORGOT PASSWORD] Forgot password request', body);

  return await axiosInstance.post('/api/forgot-password', body);
};

export const VerifyEmailResetPassword = async (email, code) => {
  const body = {
    email,
    code_changing_password: code,
  };

  console.log('[FORGOT PASSWORD] Check changing password code request', body);

  return await axiosInstance.post('/api/check-changing-password-code', body);
};
  
export const ChangePassword = async (email, code, password, confirmPassword) => {
  const body = {
    email,
    code,
    password,
    password_confirmation: confirmPassword,
  };

  console.log('[FORGOT PASSWORD] Change password request', body);
  
  return await axiosInstance.patch('/api/change-password', body);
};
