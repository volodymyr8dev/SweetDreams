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

export const UpdateProfile = async user => {
  console.log('ProfileApi', user);
  const body = {
    email: user.email,
    password_old: user.password,
    password: user.password,
    password_confirmation: user.password_confirmation,
    name: user.name,
    date_of_birth: user.date,
    gender: user.gender,
  };
  return await axiosInstance.patch('/api/me', user);
};

export const UpdateProfileChild = async user => {
  // const body = {
  //   ...(user.email && {email: user.email}),
  //   ...(user.name && {name: user.name}),
  //   ...(user.date_of_birth && {date_of_birth: user.date_of_birth}),
  //   ...(user.gender && {gender: user.gender}),
  // }
  console.log('ProfileApiChild', user);
  const body = {
    baby_name: user.baby_name,
    baby_date_of_birth: user.baby_date_of_birth,
    baby_gender: user.baby_gender,
  };
  console.log('body', body);
  return await axiosInstance.patch(`/api/accounts/${user.id}/baby`, body);
};

export const getProfile = async () => {
  return await axiosInstance.get('api/me');
};
