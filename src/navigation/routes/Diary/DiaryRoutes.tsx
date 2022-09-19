import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NewEvent}                   from '../../../screens/Account/Diary/NewEvent';
import {EventInformation}           from '../../../screens/Account/Diary/EventInformation';
import {Location}                   from '../../../screens/Account/Diary/Location';

export const DiaryRoutes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Screen
        name="NewEvent"
        component={NewEvent}
      />
      <Stack.Screen
        name="entry details"
        component={EventInformation}
      />
      <Stack.Screen
        name="Location event"
        component={Location}
      />
    </>
  );
};
