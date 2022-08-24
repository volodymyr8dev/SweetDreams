import React                        from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch}                from 'react-redux';

import {Step3}                      from '../../screens/Registration/Step3';
import {Step4}                      from '../../screens/Registration/Step4';
import {Step5}                      from '../../screens/Registration/Step5';

import {Connection}                 from '../../screens/Connection/Connection';
import {ConnectionStep1}            from '../../screens/Connection/ConnectionStep1';
import {ConnectionStep2}            from '../../screens/Connection/ConnectionStep2';
import {ConnectionStep3}            from '../../screens/Connection/ConnectionStep3';

import {MyTabs}                     from './BottomTabRoutes';

import {ProfileSettings}            from '../../screens/Account/ProfileSettings/ProfileSettings';
import {ChangeFamilyMembers}        from '../../screens/Account/ProfileSettings/ChangeFamilyMembers';
import {ChangePassword}             from '../../screens/Account/ProfileSettings/ChangePassword';
import {PrivacyPolicy}              from '../../screens/Account/ProfileSettings/PrivacyPolicy';
import {TermsConditions}            from '../../screens/Account/ProfileSettings/TermsConditions';

import SettingsRoutes from './Settings/SettingsRoutes';
import GraphicRoutes from './Graphics/GraphicsRoutes';
import {NurseryRoutes} from './Nursery/NurseryRoutes';
import ConfirmConnection from '../../screens/Account/ConfirmConnection';
import {ConnectedDevice} from '../../screens/Account/ConnectedDevice';
import {DiaryRoutes} from './Diary/DiaryRoutes';

const AuthStackRoutes = ({navigation, user}) => {
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
      {/* Complete registration */}
      <Stack.Screen name="Step3" component={Step3} />
      <Stack.Screen name="Step4" component={Step4} />
      <Stack.Screen name="Step5" component={Step5} />
      

      {/* Initial connection */}
      <Stack.Screen name="Connection" component={Connection} options={{title: "connect misty"}} />
      <Stack.Screen name="ConnectionStep1" component={ConnectionStep1} options={{title: "connect misty"}} />
      <Stack.Screen name="ConnectionStep2" component={ConnectionStep2} options={{title: "connect misty"}} />
      <Stack.Screen name="ConnectionStep3" component={ConnectionStep3} options={{title: "connect misty"}} />  

      {/* Navigation */}
      <Stack.Screen name="Tabs" component={MyTabs} options={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#000'
        }
      }} />

      {/* Device screen */}

      {/* Profile screens */}
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
      <Stack.Screen name="ManageFamilyMembers" component={ChangeFamilyMembers} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />

      <Stack.Screen name="ConnectedDevice" component={ConnectedDevice} />
      <Stack.Screen name="ConfirmConnection" component={ConfirmConnection} />
      
      {DiaryRoutes()}
      {SettingsRoutes()}
      {GraphicRoutes()}
      {NurseryRoutes()}
    </Stack.Navigator>
  );
};

export default AuthStackRoutes;
