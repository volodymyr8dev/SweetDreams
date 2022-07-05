import React, {useEffect} from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {setLoader} from '../../redux/slice/slice';
import axiosInstance from '../index';

export const LogIn = async (email, password) => {
  const body = {
    email,
    password,
  };
  return await axiosInstance.post('/api/login', body);
};

export const deleteAccount = async () => {
  return await axiosInstance.delete('/api/me');
};

export const Logout = async () => {
  return await axiosInstance.post('/api/logout');
};
