import React, {useEffect, useState}           from 'react';
import {createNativeStackNavigator}           from '@react-navigation/native-stack';
import {Alert, TouchableOpacity, Image, Text} from 'react-native';
import { useDispatch, useSelector }           from 'react-redux';
import {Step3} from '../../screens/registration/Step3';
import {Step4} from '../../screens/registration/Step4';
import {Step5} from '../../screens/registration/Step5';
import {Connection} from '../../screens/conection/Connection';
import {ConnectionStep1} from '../../screens/conection/ConnectionStep1';
import {ConnectionStep2} from '../../screens/conection/ConnectionStep2';
import {ConnectionStep3} from '../../screens/conection/ConnectionStep3';

import {MyTabs} from './BottomTabRoutes';
import {SettingsAccount} from '../../screens/Account/Settings/SettingsAccount';
import {ChangeFamilyMembers} from '../../screens/Account/ProfileSettings/ChangeFamilyMembers';
import {ChangePassword} from '../../screens/Account/ProfileSettings/ChangePassword';
import {PrivacyPolicy} from '../../screens/Account/ProfileSettings/PrivacyPolicy';
import {TermsConditions} from '../../screens/Account/ProfileSettings/TermsConditions';

import {RegistrationUser} from '../../api/CreateAccount/CreateAccount';
import {
  setLoader,
  setUserInformation,
  updateVerifiedEmail,
} from '../../redux/slice';
import SettingsRoutes from './Settings/SettingsRoutes';
import GraphicRoutes from './Graphics/GraphicsRoutes';
import {NurseryRoutes} from './Nursery/NurseryRoutes';
import backButton from '../../assets/images/backButton.png';
import ConfirmConnection from '../../screens/Account/ConfirmConnection';
import {Account} from '../../screens/Account/Account';
import {DiaryRoutes} from './Diary/DiaryRoutes';
import {} from 'react-redux';

export const navigationOptions = navigation => ({
  title: navigation.route?.params?.title
    ? navigation.route?.params.title
    : 'App',
  headerShown: true,
  headerTintColor: '#2371AB',
  headerTitleStyle: {
    fontFamily: 'AntagometricaBT-Bold',
    fontSize: 20,
  },
  headerStyle: {
    backgroundColor: '#2A305A',
  },

  // headerBackTitle: 'sss',

  gestureEnabled: false,
  // headerLeft: () => null,
  headerLeft: () => {
    const params = navigation.route?.params;
    return (
      params?.connectionStep !== 0 &&
      !params?.hide && (
        <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
          <Image style={{width: 12.3, height: 18.86}} source={backButton} />
        </TouchableOpacity>
      )
    );
  },

  headerRight: () => {
    const params = navigation.route?.params;
    return params?.title == 'connection'
      ? params?.show && (
          <TouchableOpacity
            onPress={() => {
              // navigation.navigation.navigate(
              //   `conectionStep${params?.connectionStep + 1}`,
              // );
              navigation.navigation.navigate('Accountt');
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 19,
                fontFamily: 'AntagometricaBT-Regular',
              }}>
              done
            </Text>
          </TouchableOpacity>
        )
      : params?.show && (
          <TouchableOpacity
            onPress={() => {
              if (params.firstScreen) {
                if (params.error) {
                  Alert.alert(`${params.error}`);
                } else if (
                  params.email &&
                  params.password &&
                  params.citizen !== null &&
                  params.terms &&
                  params.privacy
                ) {
                  if (!params.verified) {
                    params.dispatch(setLoader(true));
                    RegistrationUser({...params})
                      .then(({data}) => {
                        console.log('---------', data.user);
                        params.dispatch(setUserInformation(data.user));
                        params.dispatch(updateVerifiedEmail(true));
                        params.dispatch(setLoader(false));
                        params.setPosition(params.position + 1);
                        navigation.navigation.navigate(
                          `step${params.position + 1}`,
                          {
                            email: params.email,
                          },
                        );
                      })
                      .catch(error => {
                        console.log('err', error.response.data.message);
                        params.dispatch(setLoader(false));
                        Alert.alert(error.response.data.message);
                      });
                  } else {
                    navigation.navigation.navigate(
                      `step${params.position + 1}`,
                      {
                        email: params.email,
                      },
                    );
                  }
                } else if (
                  !params.email ||
                  !params.password ||
                  params.citizen == null ||
                  !params.terms ||
                  !params.privacy
                ) {
                  Alert.alert('Please, fill in all the required fields');
                }
              } else {
                params.setPosition(params.position + 1);
                navigation.navigation.navigate(`step${params.position + 1}`);
              }
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 19,
                fontFamily: 'AntagometricaBT-Regular',
              }}>
              done
            </Text>
          </TouchableOpacity>
        );
  },
});

const AuthStackRoutes = ({navigation, user}) => {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();

  let nextScreen = null;
  if (!user.gender) {
    nextScreen = 'Step3';
  } else if (!user.accounts[0]?.baby_name || !user.accounts[0]?.baby_gender) {
    nextScreen = 'Step4';
  } else if (!user.accounts[0]?.device?.id) {
    nextScreen = 'Step5';
  } else {
    nextScreen = 'Tabs';
  }

  return (
    <Stack.Navigator initialRouteName={nextScreen} screenOptions={{
      headerTintColor: '#2371AB',
      headerTitleStyle: {
        fontFamily: 'AntagometricaBT-Bold',
        fontSize:   20,
      },
      headerStyle: {
        backgroundColor: '#2A305A',
      },
      gestureEnabled: false,
    }}>
      <Stack.Screen name="Step3"      component={Step3} />
      <Stack.Screen name="Step4"      component={Step4} />
      <Stack.Screen name="Step5"      component={Step5} />
      <Stack.Screen name="Connection" component={Connection} options={{title: "connect misty"}} />

      <Stack.Screen name="ConnectionStep1" component={ConnectionStep1} options={{title: "connect misty"}} />
      <Stack.Screen name="ConnectionStep2" component={ConnectionStep2} options={{title: "connect misty"}} />
      <Stack.Screen name="ConnectionStep3" component={ConnectionStep3} options={{title: "connect misty"}} />  

      <Stack.Screen name="Tabs" component={MyTabs} options={{headerShown: false, contentStyle: {backgroundColor: '#000'}}} />

      <Stack.Screen name="SettingsAccount" component={SettingsAccount} />
      <Stack.Screen name="ManageFamilyMembers" component={ChangeFamilyMembers} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />

      <Stack.Screen
        name="Account"
        component={Account}
        options={navigationOptions}
      />
      <Stack.Screen
        name="ConfirmConnection"
        component={ConfirmConnection}
        options={{headerShown: false}}
      />
      {DiaryRoutes()}
      {SettingsRoutes()}
      {GraphicRoutes()}
      {NurseryRoutes()}
    </Stack.Navigator>
  );
};

export default AuthStackRoutes;
