import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../../screens/registration/Login';
import {CreateNewAccount} from '../../screens/registration/CreateNewAccount';
import {Alert, TouchableOpacity} from 'react-native';
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
import {SettingsAccount} from '../../screens/Account/SettingsAccount'
import {
  RegistrationUser,
  VerifyEmail,
} from '../../api/CreateAccount/CreateAccount';
import {setEmail, setLoader} from '../../redux/slice/slice';

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
// const dispatch = useDispatch()
const navigationOptions = navigation => ({
  title: 'My App',
  headerShown: true,
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#2A305A',
  },

  headerBackTitle: '',
  headerLeft: () => {},

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
                  params.citizen &&
                  params.terms &&
                  params.privacy
                ) {
                  params.dispatch(setLoader(true));
                  setTimeout(() => {
                    params.dispatch(setLoader(false));
                    navigation.navigation.navigate(
                      `step${params.position + 1}`,
                      {
                        email: params.email,
                      },
                    );
                  }, 1000);
                  RegistrationUser({...params})
                    .then(data => {
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
                      console.log('err', err);
                    });
                } else if (
                  !params.email ||
                  !params.password ||
                  !params.citizen ||
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
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="login"
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
        name="account"
        component={MyTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStackRoutes;
