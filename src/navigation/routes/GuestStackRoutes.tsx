import React                        from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login}                      from '../../screens/registration/Login';
import {CreateNewAccount}           from '../../screens/registration/CreateNewAccount';
import {Step2}                      from '../../screens/registration/Step2';
import {ForgotPassword1}            from '../../screens/registration/ForgotPassword1';
import {ForgotPassword2}            from '../../screens/registration/ForgotPassword2';
import {PrivacyPolicy}              from '../../screens/Account/ProfileSettings/PrivacyPolicy';
import {TermsConditions}            from '../../screens/Account/ProfileSettings/TermsConditions';

const GuestStackRoutes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'Login'} screenOptions={{
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
      <Stack.Screen name="Login"            component={Login}            options={{headerShown: false}} />
      <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} options={{headerShown: true}} />
      <Stack.Screen name="Step2"            component={Step2}            options={{headerShown: true}} />
      <Stack.Screen name="ForgotPassword1"  component={ForgotPassword1}  options={{headerShown: true}} />
      <Stack.Screen name="ForgotPassword2"  component={ForgotPassword2}  options={{headerShown: true}} />
      <Stack.Screen name="PrivacyPolicy"    component={PrivacyPolicy}    options={{headerShown: true}} />
      <Stack.Screen name="TermsConditions"  component={TermsConditions}  options={{headerShown: true}} />
    </Stack.Navigator>
  );
};

export default GuestStackRoutes;
