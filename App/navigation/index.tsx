import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackRoutes from './routes/AppStackRoutes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const MyStack = () => {
  return (
    <NavigationContainer>
      <AppStackRoutes />
    </NavigationContainer>
  );
};
export default MyStack