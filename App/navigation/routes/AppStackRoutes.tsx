import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../../screens/Login';
import {CreateNewAccount} from '../../screens/CreateNewAccount';
import {BackHandler, TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
const navigationOptions = () => ({
  title: 'My App',
  headerShown: true,
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#2A305A',
  },
  
  headerBackTitle: '',
  // headerLeft:
  //   // <HeaderBarItem to='InfoScreen' title='App info' />,
  //   'back',

  headerRight: () => (
    <TouchableOpacity onPress={() => {}}>
      <Text style={{color: '#fff', fontSize: 19}}>done</Text>
    </TouchableOpacity>
  ),
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
    </Stack.Navigator>
  );
};
export default AppStackRoutes;
