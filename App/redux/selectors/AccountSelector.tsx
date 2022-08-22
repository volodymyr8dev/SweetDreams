import React from 'react';
import {RootState} from '../interfaceRootState';

export const AccountSelector = ({account}: RootState) => account;
export const UserInformationSelector = ({account}: RootState) =>
  account.userInformation;
export const ChildInformation = ({account}: RootState) =>
  account.userInformation.user.accounts[0];
export const SettingsPower = ({power}: RootState) => power;
