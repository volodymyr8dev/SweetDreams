import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AverageTempature} from '../../../screens/Account/Nursery/properties/AverageTempature';
import {TotalTimeComp} from '../../../screens/Account/Nursery/properties/TotalTimeComp';
import {LongestPeriod} from '../../../screens/Account/Nursery/properties/LongestPeriod';
interface IParam {
  title: string;
  isHide: boolean;
  rightText: string;
  backTitle: string;
  goToEdit: Function;
  addEvent: Function;
  editEvent: Function;
}

export const NurseryRoutes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Screen
        name="Average Temperature"
        component={AverageTempature}
      />
      <Stack.Screen
        name="Total Time Without Activation"
        component={TotalTimeComp}
      />
      <Stack.Screen
        name="Longest Period Without Activation"
        component={LongestPeriod}
      />
    </>
  );
};
