import React, {useEffect} from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {setLoader} from '../../redux/slice/slice';

export const RegistrationUser = async params => {
  useEffect(() => {
  }, []);
  console.log('loader');
  const body = {
    email: params.email,
    password: params.password,
    terms_and_conditions_are_accepted: params.terms,
    privacy_policy_is_accepted: params.privacy,
    eu_citizen: params.citizen,
  };
  return await axios.post('link', body);
};

export const PostCaregiver = async (name, dateOfBirdth, gender) => {
  const body = {
    name,
    date_of_birth: dateOfBirdth,
    gender,
  };
  const api = {};
  return await axios.patch('link', body);
};

export const PostChild = async (name, dateOfBirdth, gender) => {
  const body = {
    name,
    date_of_birth: dateOfBirdth,
    gender,
  };
  const api = {};
  return await axios.patch('link', body);
};
export const VerifyEmail = async (email, code) => {
  const body = {
    email,
    code,
  };
  return await axios.post('link', body);
};
