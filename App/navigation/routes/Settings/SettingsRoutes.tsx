import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingsTemperature} from '../../../screens/Account/Settings/SettingsTemperature';
import {SettingsTime} from '../../../screens/Account/Settings/SettingsTime';
import {SettingsWakeUpTime} from '../../../screens/Account/Settings/SettingsWakeUpTime';
import { SettingsColourPicker } from '../../../screens/Account/Settings/SettingsColourPicker';
import { SettingsDomeBrihtness } from '../../../screens/Account/Settings/SettingsDomeBrihtness';

const customTabBarStyle = {
  activeTintColor: '#0091EA',
  inactiveTintColor: 'gray',
  style: {backgroundColor: '#000'},
};
const navigationOptionAccount = () => ({
  // headerShown: true,
  tabBarColor: '#ddd',
  tabBarLabel: '',
  headerTintColor: '#000',
  style: {
    backgroundColor: '#000',
  },
  tabBarOptions: {customTabBarStyle},
});
const navigationOptions = navigation => {
  console.log(navigation.route?.params?.title);
  return {
    title: `${navigation.route?.params?.title}`,
    headerShown: true,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#2A305A',
    },
  };
};
const StackRoutes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Screen
        name="settingstemperature"
        component={SettingsTemperature}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Time"
        component={SettingsTime}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Wake Up Time"
        component={SettingsWakeUpTime}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Colour Picker"
        component={SettingsColourPicker}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Dome Brightness"
        component={SettingsDomeBrihtness}
        options={navigationOptions}
      />
    </>
  );
};

export default StackRoutes;
