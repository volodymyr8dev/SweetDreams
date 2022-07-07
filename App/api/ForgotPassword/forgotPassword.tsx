import React, {useEffect} from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {setLoader} from '../../redux/slice/slice';
import axiosInstance from '../index';

export const forgotPassword = async email => {
  const body = {
    email,
  };
  return await axiosInstance.post('/api/forgot-password', body);
};

export const VerifyEmailResetPassword = async (email, code) => {
  console.log('code', code);
  const body = {
    email,
    code_changing_password: code,
  };
  return await axiosInstance.post('/api/check-changing-password-code', body);
};

export const ChangePasswordApi = async (
  email,
  code,
  password,
  confirmPassword,
) => {
  console.log('api');
  const body = {
    email,
    code,
    password,
    password_confirmation: confirmPassword,
  };
  return await axiosInstance.patch('/api/change-password', body);
};
