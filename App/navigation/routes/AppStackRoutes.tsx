import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../../screens/registration/Login';
import {CreateNewAccount} from '../../screens/registration/CreateNewAccount';
import {Alert, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native';
import {Step2} from '../../screens/registration/Step2';
import {Step3} from '../../screens/registration/Step3';
import {Step4} from '../../screens/registration/Step4';
import {Step5} from '../../screens/registration/Step5';
import {Connection} from '../../screens/conection/Connection';
import {ConnectionStep1} from '../../screens/conection/ConnectionStep1';
import {ConnectionStep2} from '../../screens/conection/ConnectionStep2';
import {ConnectionStep3} from '../../screens/conection/ConnectionStep3';
import {Account} from '../../screens/Account/Account';
import {MyTabs} from './BottomTabRoutes';
import {SettingsAccount} from '../../screens/Account/Settings/SettingsAccount';
import {
  RegistrationUser,
  VerifyEmail,
  SendEmailVerificationCode,
} from '../../api/CreateAccount/CreateAccount';
import {
  setLoader,
  setUserInformation,
  updateVerifiedEmail,
} from '../../redux/slice/slice';
import SettingsRoutes from './Settings/SettingsRoutes';
import {SettingsTemperature} from '../../screens/Account/Settings/SettingsTemperature';
import SettingsAccountStackRoutes from './Settings/SettingsAccountRouter';
import GraphicRoutes from './Graphics/GraphicsRoutes';
import backButton from '../../assets/images/backButton.png';
import {ForgotPassword} from '../../screens/registration/ForgotPassword';
import {ForgotPassword2} from '../../screens/registration/ForgotPassword2';
import {ForgotPassword3} from '../../screens/registration/ForgotPassword3';
import AsyncStorage from '@react-native-async-storage/async-storage';
export type RootStackParamList = {
  step2: {
    position: any;
    setPosition: any;
  };
};

export type registerScreenProp = StackNavigationProp<RootStackParamList>;

const customTabBarStyle = {
  activeTintColor: '#0091EA',
  inactiveTintColor: 'gray',
  style: {backgroundColor: '#000'},
};
// const navigationOptionAccount = () => ({

//   // headerShown: true,
//   tabBarColor: '#ddd',
//   tabBarLabel: '',
//   headerTintColor: '#000',
//   style: {
//     backgroundColor: '#000',
//   },
//   tabBarOptions: {customTabBarStyle},
// });
export const navigationOptions = navigation => ({
  title: 'My App',
  headerShown: true,
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#2A305A',
  },

  // headerBackTitle: 'sss',

  gestureEnabled: false,
  // headerLeft: () => null,
  headerLeft: () => {
    const params = navigation.route?.params;
    console.log('params',params);
    return (
      !params?.hide && (
        <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
          <Image style={{width: 17, height: 17}} source={backButton} />
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
              navigation.navigation.navigate(
                `conectionStep${params?.connectionStep + 1}`,
              );
            }}>
            <Text style={{color: '#fff', fontSize: 19}}>done</Text>
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
                  params.dispatch(setLoader(true));
                  console.log('vvvvv', params.verified);
                  if (!params.verified) {
                    RegistrationUser({...params})
                      .then(({data}) => {
                        console.log('---------', data.user);
                        params.dispatch(setUserInformation(data.user));
                        params.dispatch(updateVerifiedEmail(true));

                        SendEmailVerificationCode(params.email)
                          .then(data => {
                            console.log('VerifyEmail', data.data);
                            params.dispatch(setLoader(false));

                            params.setPosition(params.position + 1);
                            navigation.navigation.navigate(
                              `step${params.position + 1}`,
                              {
                                email: params.email,
                              },
                            );
                          })
                          .catch(err => {
                            console.log('err', err.response);
                            params.dispatch(setLoader(false));
                            Alert.alert(err.response.error);
                          });
                      })
                      .catch(error => {
                        // console.log('err', error.response.data.message);
                        Alert.alert(error.response.data.message);
                        params.dispatch(setLoader(false));
                      });
                  } else {
                    SendEmailVerificationCode(params.email)
                      .then(data => {
                        console.log('VerifyEmail', data.data);
                        params.dispatch(setLoader(false));

                        params.setPosition(params.position + 1);
                        navigation.navigation.navigate(
                          `step${params.position + 1}`,
                          {
                            email: params.email,
                          },
                        );
                      })
                      .catch(err => {
                        params.dispatch(setLoader(false));
                        console.log('err', err.response.data);
                        Alert.alert(err.response.data.error);
                      });
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
            <Text style={{color: '#fff', fontSize: 19}}>done</Text>
          </TouchableOpacity>
        );
  },
});

const AppStackRoutes = () => {
  let value;
  const navigation = useNavigation();
  const [token, setToken] = useState();
  const Stack = createNativeStackNavigator<registerScreenProp>();
  const getToken = async () => {
    value = await AsyncStorage.getItem('@storage_Key');
    setToken(value);
    console.log('valueeee', value);
    // navigation.navigate('account');
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <Stack.Navigator
      // initialRouteName="Login"
      initialRouteName={token ? 'account' : 'Login'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        // options={{title: 'Welcome'}}
      />
      <Stack.Screen
        name="CreateNewAccount"
        component={CreateNewAccount}
        options={navigationOptions}
        // options={{headerLeft: props => null}}
      />
      <Stack.Screen
        name="step1"
        component={Step2}
        options={navigationOptions}
      />
      <Stack.Screen
        name="step2"
        component={Step3}
        options={navigationOptions}
      />
      <Stack.Screen
        name="step3"
        component={Step4}
        options={navigationOptions}
      />
      <Stack.Screen
        name="step4"
        component={Step5}
        options={navigationOptions}
      />
      <Stack.Screen
        name="connection"
        component={Connection}
        options={navigationOptions}
      />

      <Stack.Screen
        name="conectionStep1"
        component={ConnectionStep1}
        options={navigationOptions}
      />
      <Stack.Screen
        name="conectionStep2"
        component={ConnectionStep2}
        options={navigationOptions}
      />
      <Stack.Screen
        name="conectionStep3"
        component={ConnectionStep3}
        options={navigationOptions}
      />
      <Stack.Screen
        name="settingsAccount"
        component={SettingsAccount}
        options={navigationOptions}
      />
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={navigationOptions}
      />
      <Stack.Screen
        name="ForgotPassword2"
        component={ForgotPassword2}
        options={navigationOptions}
      />
      <Stack.Screen
        name="ForgotPassword3"
        component={ForgotPassword3}
        options={navigationOptions}
      />
      {/* <Stack.Screen
        name="settingstemperature"
        component={SettingsTemperature}
        options={navigationOptions}
      /> */}
      <Stack.Screen
        name="account"
        component={MyTabs}
        options={{headerShown: false}}
      />
      {SettingsRoutes()}
      {SettingsAccountStackRoutes()}
      {GraphicRoutes()}
    </Stack.Navigator>
  );
};

export default AppStackRoutes;
