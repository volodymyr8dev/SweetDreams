import React from 'react';
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
                  params.setPosition(params.position + 1);
                  navigation.navigation.navigate(`step${params.position + 1}`);
                } else if (
                  !params.email ||
                  !params.password ||
                  !params.citizen ||
                  !params.terms ||
                  !params.privacy
                ) {
                  Alert.alert('Please, fill in all the required fields');
                }
                // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                // if (reg.test(params?.email) == true) {
                //   if (params?.password.length >= 8) {
                //     if (params?.citizen !== null) {
                //       if (params?.terms) {
                //         if (params?.privacy) {
                //           params.setPosition(params.position + 1);
                //           navigation.navigation.navigate(
                //             `step${params.position + 1}`,
                //           );
                //         } else {
                //           Alert.alert('Please, agree with Privacy Policy');
                //         }
                //       } else {
                //         Alert.alert('Please, agree with Terms & Conditions');
                //       }
                //     } else {
                //       Alert.alert('Please, choose citizenship');
                //     }
                //   } else {
                //     Alert.alert('Incorect Password');
                //   }
                // } else {
                //   Alert.alert('Email Incorect');
                // }
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
        name="account"
        component={Account}
        options={navigationOptions}
      />
    </Stack.Navigator>
  );
};

export default AppStackRoutes;
