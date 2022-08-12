import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NewEvent} from '../../../screens/Account/Diary/NewEvent';
import {COLORS} from '../../../styles/Constants';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {EventInformation} from '../../../screens/Account/Diary/EventInformation';
import back from '../../../assets/images/backButton.png';
import {Location} from '../../../screens/Account/Diary/Location';
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
const navigationOptionsLocation = navigation => {
  const nav = useNavigation();
  return {
    title: 'location',
    headerShown: true,
    headerTintColor: COLORS.textLight,
    headerTitleStyle: {
      fontFamily: 'AntagometricaBT-Bold',
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: '#2A305A',
    },
    headerBackTitleStyle: {
      color: '#fff',
    },
    headerLeft: () => {
      return (
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            nav.goBack();
          }}>
          <Image
            style={{width: 12.3, height: 18.86, marginRight: 7.69}}
            source={back}
          />

          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 19,
              fontFamily: 'AntagometricaBT-Regular',
            }}></Text>
        </TouchableOpacity>
      );
    },
    headerRight: () => {
      return (
        <TouchableOpacity onPress={() => {}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              fontFamily: 'AntagometricaBT-Regular',
            }}></Text>
        </TouchableOpacity>
      );
    },
  };
};
const navigationOptionsDoc = navigation => {
  const nav = useNavigation();
  // console.log('paramsDoc', navigation.route?.params);
  let param: IParam = navigation.route?.params;
  console.log(param);
  return {
    title: `${param?.title}`,
    headerShown: true,
    headerTintColor: COLORS.textLight,
    headerTitleStyle: {
      fontFamily: 'AntagometricaBT-Bold',
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: '#2A305A',
    },
    headerBackTitleStyle: {
      color: '#fff',
    },
    headerLeft: () => {
      return (
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            nav.goBack();
          }}>
          {!param.isHide && (
            <Image
              style={{width: 12.3, height: 18.86, marginRight: 7.69}}
              source={back}
            />
          )}
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 19,
              fontFamily: 'AntagometricaBT-Regular',
            }}>
            {param?.backTitle}
          </Text>
        </TouchableOpacity>
      );
    },
    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            console.log('-----here------', param.rightText);
            if (param.rightText === 'add') {
              param.addEvent();
            } else if (param.rightText == 'edit') {
              param.goToEdit();
            } else if (param.rightText == 'done') {
              param.editEvent();
            }
            // param.rightText ==="add"?
            //   ? param.editEvent()
            //   : param?.rightText == 'edit'
            //   ? param.goToEdit()
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              fontFamily: 'AntagometricaBT-Regular',
            }}>
            {param?.rightText}
          </Text>
        </TouchableOpacity>
      );
    },
  };
};
export const DiaryRoutes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Screen
        name="addEvent"
        component={NewEvent}
        options={navigationOptionsDoc}
      />
      <Stack.Screen
        name="entry details"
        component={EventInformation}
        options={navigationOptionsDoc}
      />
      <Stack.Screen
        name="Location event"
        component={Location}
        options={navigationOptionsLocation}
      />
    </>
  );
};
