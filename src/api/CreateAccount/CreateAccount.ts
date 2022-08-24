import axiosInstance from '../apiAxios';
import moment        from 'moment';

export const RegistrationUser = async params => {
  const body = {
    email:                             params.email,
    password:                          params.password,
    terms_and_conditions_are_accepted: params.terms,
    privacy_policy_is_accepted:        params.privacy,
    eu_citizen:                        params.citizen,
  };

  console.log('[REGISTRATION] Registration request', body);

  return await axiosInstance.post('/api/register', body);
};

export const PostCaregiver = async (name, dateOfBirdth, gender) => {
  const body = {
    name,
    date_of_birth: moment(dateOfBirdth).format('YYYY-MM-DD'),
    gender,
  };

  console.log('[REGISTRATION] Save caregiver info request', body);

  return await axiosInstance.patch('/api/me', body);
};

export const PostChild = async (accountId, name, dateOfBirdth, gender) => {
  const body = {
    baby_name: name,
    baby_date_of_birth: moment(dateOfBirdth).format('YYYY-MM-DD'),
    baby_gender: gender,
  };

  console.log('[REGISTRATION] Save child info request', body);

  return await axiosInstance.patch(`/api/accounts/${accountId}/baby`, body);
};

export const VerifyEmail = async (email, code) => {
  const body = {
    email,
    code,
  };

  console.log('[REGISTRATION] Verify email request', body);

  return await axiosInstance.post('/api/verify-email', body);
};

export const SendEmailVerificationCode = async email => {
  const body = {
    email,
  };

  console.log('[REGISTRATION] Send verification email request', body);

  return await axiosInstance.post('/api/verify-email/send-code', body);
};

export const getPrivacyPolicy = async () => {
  console.log('[PRIVACY POLICY] Request');

  return await axiosInstance.get('/api/privacy-policy');
};

export const getTerms = async () => {
  console.log('[PRIVACY POLICY] Terms of Use');

  return await axiosInstance.get('/api/terms-of-use');
};
