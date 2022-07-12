import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../configureStore';

export const AccountSelector = ({account}: RootState) => account;
export const UserInformationSelector = ({account}: RootState) =>account.userInformation;
                              