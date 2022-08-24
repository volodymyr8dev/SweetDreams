import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChangePassword} from '../../../screens/Account/ProfileSettings/ChangePassword';
import {PrivacyPolicy} from '../../../screens/Account/ProfileSettings/PrivacyPolicy';
import {TermsConditions} from '../../../screens/Account/ProfileSettings/TermsConditions';

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
