import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingsTemperature} from '../../../screens/Account/Settings/SettingsTemperature';
import {SettingsTime} from '../../../screens/Account/Settings/SettingsTime';
import {SettingsWakeUpTime} from '../../../screens/Account/Settings/SettingsWakeUpTime';
import {SettingsColourPicker} from '../../../screens/Account/Settings/SettingsColourPicker';
import {SettingsDomeBrihtness} from '../../../screens/Account/Settings/SettingsDomeBrihtness';
import {SettingsSmartCRY} from '../../../screens/Account/Settings/SettingsSmartCRY';
import {SettingsRecording} from '../../../screens/Account/Settings/SettingsRecording';
import {SettingsNewRecording} from '../../../screens/Account/Settings/SettingsNewRecording';
import {SettingsTimePlaying} from '../../../screens/Account/Settings/SettingsTimePlaying';
import {SettingsVolume} from '../../../screens/Account/Settings/SettingsVolume';
import {ChangeFamilyMembers} from '../../../screens/Account/SettingsAccount/ChangeFamilyMembers';
import {ChangePassword} from '../../../screens/Account/SettingsAccount/ChangePassword';
import {PrivacyPolicy} from '../../../screens/Account/SettingsAccount/PrivacyPolicy';
import {TermsConditions} from '../../../screens/Account/SettingsAccount/TermsConditions';

const customTabBarStyle = {
  activeTintColor: '#0091EA',
  inactiveTintColor: 'gray',
  style: {backgroundColor: '#000'},
};
const navigationOptionAccount = () => ({
  // headerShown: true,
  // tabBarColor: '#ddd',
  tabBarLabel: '',
  headerTintColor: '#000',
  style: {
    backgroundColor: '#000',
  },
  tabBarOptions: {customTabBarStyle},
});
const navigationOptions = navigation => {
  return {
    title: `${navigation.route?.params?.title}`,
    headerShown: true,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#2A305A',
    },
  };
};
const GraphicRoutes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Screen
        name="last 24 hours"
        component={ChangePassword}
        options={navigationOptions}
      />
      <Stack.Screen
        name="last 7 days"
        component={PrivacyPolicy}
        options={navigationOptions}
      />
      <Stack.Screen
        name="last 28 days"
        component={TermsConditions}
        options={navigationOptions}
      />
    </>
  );
};

export default GraphicRoutes;
