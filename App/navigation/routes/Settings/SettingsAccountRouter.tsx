import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChangeFamilyMembers} from '../../../screens/Account/SettingsAccount/ChangeFamilyMembers';
import {ChangePassword} from '../../../screens/Account/SettingsAccount/ChangePassword';
import {PrivacyPolicy} from '../../../screens/Account/SettingsAccount/PrivacyPolicy';
import {TermsConditions} from '../../../screens/Account/SettingsAccount/TermsConditions';
import {Text, TouchableOpacity} from 'react-native';

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
    // headerTransparent:true,
    headerRight: () => {
      console.log('params change paswword', navigation.route?.params);
      return (
        navigation.route?.params.rightEl && (
          <TouchableOpacity
            onPress={() => {
              navigation.route?.params.onSave();
              console.log('pressed');
            }}>
            <Text style={{color: '#fff', fontSize: 18, fontFamily: 'AntagometricaBT-Regular'}}>save</Text>
          </TouchableOpacity>
        )
      );
    },
    headerStyle: {
      backgroundColor: '#2A305A',
    },
  };
};
const SettingsAccountStackRoutes = () => {
  const Stack = createNativeStackNavigator();
      
  return (
    <>
      <Stack.Screen
        name="Manage Family Members"
        component={ChangeFamilyMembers}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Privacy Policy"
        component={PrivacyPolicy}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Terms Conditions"
        component={TermsConditions}
        options={navigationOptions}
      />
    </>
  );
};
                                         
export default SettingsAccountStackRoutes;
                                                                       