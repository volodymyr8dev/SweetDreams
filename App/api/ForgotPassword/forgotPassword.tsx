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
  console.log('code',code)
  const body = {
    email,
    code_changing_password: code,
  };
  return await axiosInstance.post('/api/check-changing-password-code', body);
};

export const ChangePassword = async (email, password, confirmPassword) => {
  const body = {
    email,
    password,
    confirmPassword,
  };
  return await axiosInstance.put('/api/change-forgot-password', body);
};