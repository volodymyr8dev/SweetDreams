import React from 'react';
import {Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Account} from '../../screens/Account/Account';
import {Settings} from '../../screens/Account/Settings';
import childIcon from '../../assets/images/homeIcon/child.png';
import personIcon from '../../assets/images/homeIcon/person.png';
import graphic from '../../assets/images/homeIcon/graphic2.png';
import document from '../../assets/images/homeIcon/document.png';
import documentActive from '../../assets/images/homeIcon/docActive.png';
import {Graphics} from '../../screens/Account/Graphics';
import {Document} from '../../screens/Account/Document';
import {Location} from '../../screens/Account/Location';

const Tab = createBottomTabNavigator();

const customTabBarStyle = {
  activeTintColor: '#707070',
  inactiveTintColor: 'gray',
  tabStyle: {
    paddingTop: 25,
  },
  labelStyle: {
  },

  style: {backgroundColor: '#707070', },
};
export const MyTabs = () => {
  return (
    <Tab.Navigator activeColor="#707070" tabBarOptions={customTabBarStyle}>
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: '#707070',
          },

          tabBarIcon: ({color, focused}) => <Image source={graphic} />,
        }}
      />
      <Tab.Screen
        name="graphics"
        component={Graphics}
        options={{
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: '#707070',
          },

          tabBarIcon: ({color, focused}) => (
            <Image source={focused ? documentActive : document} />
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={Account}
        options={{
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: '#707070',
          },

          tabBarIcon: ({color}) => <Image source={childIcon} />,
        }}
      />
      <Tab.Screen
        name="document"
        component={Document}
        options={{
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: '#707070',
          },

          tabBarIcon: ({color}) => <Image source={personIcon} />,
        }}
      />
      <Tab.Screen
        name="location"
        component={Location}
        options={{
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
