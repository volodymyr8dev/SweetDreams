import React from 'react';
import {Text, Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Account} from '../../screens/Account/Account';
import {Settings} from '../../screens/Account/SettingsAccount/Settings';
import childIcon from '../../assets/images/homeIcon/child.png';
import personIcon from '../../assets/images/homeIcon/person.png';
import graphic from '../../assets/images/homeIcon/graphic2.png';
import graphActive from '../../assets/images/graph/Group1.png';
import graphActiveUp from '../../assets/images/graph/graphActiveUp.png';
import document from '../../assets/images/homeIcon/document.png';
import documentActive from '../../assets/images/documentActive.png';
import location from '../../assets/images/homeIcon/location.png';
import {Graphics} from '../../screens/Account/Graphics';
import {Document} from '../../screens/Account/Document';
import {Location} from '../../screens/Account/Location';

const iconGr = focused => {
  return (
    <View>
      {focused ? (
        <View>
          <Image style={{width: 23, height: 23}} source={graphActive} />
        </View>
      ) : (
        <View>
          <Image style={{width: 30, height: 30}} source={graphic} />
        </View>
      )}
    </View>
  );
};

const Tab = createBottomTabNavigator();
// const TabNav = createTabNavigator()

const customTabBarStyle = {
  activeTintColor: '#707070',
  inactiveTintColor: 'gray',
  tabStyle: {
    paddingTop: 25,
  },
  labelStyle: {},

  style: {backgroundColor: '#707070'},
};
export const MyTabs = () => {
  return (
    <Tab.Navigator activeColor="#707070" tabBarOptions={customTabBarStyle}>
      <Tab.Screen
        name="graphics"
        component={Graphics}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: '#707070',
          },
          tabBarIcon: ({color, focused}) => iconGr(focused),
        }}
      />
      <Tab.Screen
        name="document"
        component={Document}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: '#707070',
          },
          tabBarIcon: ({color, focused}) => <Image source={document} />,
        }}
      />
      <Tab.Screen
        name="account"
        component={Account}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: '#707070',
          },
          tabBarIcon: ({color}) => <Image source={childIcon} />,
        }}
      />
      <Tab.Screen
        name="location"
        component={Location}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: '#707070',
          },
          tabBarIcon: ({color}) => <Image source={location} />,
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          title: 'profile / preferences',
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#2A305A',
          },
          // headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: '#707070',
          },
          tabBarIcon: ({color}) => <Image source={personIcon} />,
        }}
      />
    </Tab.Navigator>
  );
};
