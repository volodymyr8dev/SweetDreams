import React, {useEffect} from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {setLoader} from '../../redux/slice/slice';
import axiosInstance from '../index';

export const RegistrationUser = async params => {
  console.log('loaderssss');
  const body = {
    email: params.email,
    password: params.password,
    terms_and_conditions_are_accepted: params.terms,
    privacy_policy_is_accepted: params.privacy,
    eu_citizen: params.citizen,
  };
  // return await axios.post('link', body);
  return axiosInstance.post('/api/register', body);
};

export const PostCaregiver = async (name, dateOfBirdth, gender) => {
  const body = {
    name,
    date_of_birth: dateOfBirdth,
    gender,
  };
  return await axiosInstance.put('/api/v1/register', body);
};

export const PostChild = async (name, dateOfBirdth, gender) => {
  const body = {
    name,
    date_of_birth: dateOfBirdth,
    gender,
  };
  const api = {};
  return await axiosInstance.post('/api/v1/baby-register', body);
};
export const VerifyEmail = async (email, code) => {
  const body = {
    email,
    code,
  };
  return await axiosInstance.post('/api/verify-email', body);
};
export const SendEmailVerificationCode = async email => {
  const body = {
    email,
  };
  return await axiosInstance.post('/api/verify-email/send-code', body);
};
export const getPrivacyPolicy = async () => {
  return await axiosInstance.get('/api/privacy-policy');
};
export const getTerms = async () => {
  return await axiosInstance.get('/api/terms-of-use');
};
