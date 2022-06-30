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
  const body = {
    email,
    code,
  };
  return await axiosInstance.post('/api/change-forgot-password', body);
};

export const ChangePassword = async (email, password, confirmPassword) => {
  const body = {
    email,
    password,
    confirmPassword,
  };
  return await axiosInstance.put('/api/check-changing-password-code', body);
};