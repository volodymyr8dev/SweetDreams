import React from 'react';
import {Text, Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Account} from '../../screens/Account/Account';
import {Settings} from '../../screens/Account/SettingsAccount/Settings';
import childActive from '../../assets/images/controlChild/childActive.png';
import personIcon from '../../assets/images/homeIcon/person.png';
import graphActive from '../../assets/images/graph/Group1.png';
import graphGroup from '../../assets/images/graph/graphGroup.png';
import graphUnActive from '../../assets/images/graph/graphUnActive.png';
import document from '../../assets/images/homeIcon/document.png';
import documentActive from '../../assets/images/documents/groupdocument.png';
import location from '../../assets/images/homeIcon/location.png';
import childUnActive from '../../assets/images/controlChild/childUnActive.png';
import niple from '../../assets/images/niple/niple.png'
import {Graphics} from '../../screens/Account/Graphics';
import {Document} from '../../screens/Account/Document';
import {Location} from '../../screens/Account/Location';
import {COLORS} from '../../styles/Constants';

const iconGr = (focused, iconActive, icon, size = 30) => {
  return (
    <View>
      <View>
        <Image
          resizeMode="contain"
          style={[{width: size, height: size}]}
          source={focused ? iconActive : icon}
        />
      </View>
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
          tabBarIcon: ({color, focused}) =>
            iconGr(focused, graphActive, graphUnActive),
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
          tabBarIcon: ({color, focused}) =>
            iconGr(focused, documentActive, document),
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
          tabBarIcon: ({color, focused}) =>
            iconGr(focused, childActive, childUnActive, 45),
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
          tabBarIcon: ({color, focused}) => iconGr(focused, niple, niple),
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
