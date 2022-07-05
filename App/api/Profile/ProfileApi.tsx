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
  // const body = {
  //   ...(user.email && {email: user.email}),
  //   ...(user.name && {name: user.name}),
  //   ...(user.date_of_birth && {date_of_birth: user.date_of_birth}),
  //   ...(user.gender && {gender: user.gender}),
  // };
  console.log('ProfileApi', user)
  const body = {
    email: user.email,
    name: user.name,
    date_of_birth: user.date,
    gender: user.gender,
  };
  return await axiosInstance.patch('/api/me', body);
};
