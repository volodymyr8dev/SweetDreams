import React                     from 'react';
import {useSelector}              from 'react-redux';
import {RootReducerState}         from '../../redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ConfirmConnection          from '../../screens/Account/ConfirmConnection';
import {ConnectedDevice}          from '../../screens/Account/ConnectedDevice';
import {NurseryData as Nursery}   from '../../screens/Account/Nursery/NurseryData';
import {Document as Diary}        from '../../screens/Account/Diary/Document';
import {Feed}                     from '../../screens/Account/Feed/Feed';
import {ProfileSettings}          from '../../screens/Account/ProfileSettings/ProfileSettings';

import NurseryInctive             from '../../assets/images/svg/Schedule';
import NurseryActive              from '../../assets/images/svg/ScheduleActive';
import DiaryActive                from '../../assets/images/svg/diary/BottomIcon';
import DiaryInactive              from '../../assets/images/svg/diary/BottomUnActive';
import ChildInactive              from '../../assets/images/svg/Child';
import ChildActive                from '../../assets/images/svg/ChildActive';
import FeedInactive               from '../../assets/images/svg/Bottle';
import FeedActive                 from '../../assets/images/svg/BottleActive';
import ProfileSettingsInactive    from '../../assets/images/svg/Settings';
import ProfileSettingsActive      from '../../assets/images/svg/SettingsActive';

const Tab = createBottomTabNavigator();
const customTabBarStyle = {
  borderBottomWidth: 0,
  tabStyle: {
    bottom: 10,
    height: 50,
    paddingTop: 20,
    borderTopWidth:  0,
    backgroundColor: 'rgba(52, 52, 90, 1)',
    elevation: 0,
    shadowOpacity: 0,
  },
  labelStyle: {},
};

export const MyTabs = ({navigation}) => {
  const {user} = useSelector((state: RootReducerState) => state.auth);

  return (
    <Tab.Navigator tabBarOptions={customTabBarStyle} initialRouteName="Device">
      <Tab.Screen name="Nursery" component={Nursery} options={{
        tabBarLabel: '',
        tabBarStyle: {
          backgroundColor: 'rgba(52, 52, 90, 1)',
        },
        tabBarIcon: ({focused}) => focused ? <NurseryActive /> : <NurseryInctive />,
      }} />

      <Tab.Screen name="Diary" component={Diary} options={{
        tabBarLabel: '',
        tabBarStyle: {
          backgroundColor: 'rgba(52, 52, 90, 1)',
        },
        tabBarIcon: ({focused}) => (focused ? <DiaryActive /> : <DiaryInactive />),
      }} />

      <Tab.Screen name="Device" component={user.accounts[0]?.devices[0]?.is_connected ? ConnectedDevice : ConfirmConnection} options={{
        tabBarLabel: '',
        tabBarStyle: {
          backgroundColor: 'rgba(52, 52, 90, 1)',
        },
        tabBarIcon: ({focused}) => (focused ? <ChildActive /> : <ChildInactive />),
      }} />

      <Tab.Screen name="Feed" component={Feed} options={{
        tabBarLabel: '',
        tabBarStyle: {
          backgroundColor: 'rgba(52, 52, 90, 1)',
        },
        tabBarIcon: ({focused}) => (focused ? <FeedActive /> : <FeedInactive />),
      }} />

      <Tab.Screen name="ProfileSettings" component={ProfileSettings} options={{
        tabBarLabel: '',
        tabBarStyle: {
          backgroundColor: 'rgba(52, 52, 90, 1)',
        },
        tabBarIcon: ({focused}) => focused ? <ProfileSettingsActive /> : <ProfileSettingsInactive />,
      }} />
    </Tab.Navigator>
  );
};
