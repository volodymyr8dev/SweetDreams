import React from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Account} from '../../screens/Account/Account';
import {Settings} from '../../screens/Account/SettingsAccount/Settings';
import childActive from '../../assets/images/controlChild/childActive.png';
import personIcon from '../../assets/images/homeIcon/person.png';
import graphActive from '../../assets/images/graph/Group1.png';
import graphGroup from '../../assets/images/graph/graphGroup.png';
import graphUnActive from '../../assets/images/graph/graphUnActive.png';
import document from '../../assets/images/documents/document1.png';
import documentActive from '../../assets/images/documents/documentActive.png';
import location from '../../assets/images/homeIcon/location.png';
import childUnActive from '../../assets/images/controlChild/childUnActive.png';
import niple from '../../assets/images/niple/niple.png';
import {Graphics} from '../../screens/Account/Graphics';
import {Document} from '../../screens/Account/Diary/Document';
import {Location} from '../../screens/Account/Location';
import {COLORS} from '../../styles/Constants';
import backButton from '../../assets/images/backButton.png';
import Schedule from '../../assets/images/svg/Schedule';
import ScheduleActive from '../../assets/images/svg/ScheduleActive';
import Calendar from '../../assets/images/svg/Calendar';
import CalendarActive from '../../assets/images/svg/CalendarActive';
import Child from '../../assets/images/svg/Child';
import ChildActive from '../../assets/images/svg/ChildActive';
import Bottle from '../../assets/images/svg/Bottle';
import BottleActive from '../../assets/images/svg/BottleActive';
import SettingsAccount from '../../assets/images/svg/Settings';
import SettingsActive from '../../assets/images/svg/SettingsActive';
import plus from '../../assets/images/documents/plus.png';
import search from '../../assets/images/documents/search.png';

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

const navigationOptions = navigation => ({
  title: 'profile / preferences',
  headerShown: true,
  headerTintColor: '#2371AB',
  headerStyle: {
    backgroundColor: '#2A305A',
    shadowColor: 'transparent', // this covers iOS
    elevation: 0,
    headerTransparent: true,
    // borderBottomWidth:2,
    // borderBottomColor: COLORS.backGround
  },
  headerTitleStyle: {
    fontFamily: 'AntagometricaBT-Bold',
    fontSize: 19,
  },
  tabBarStyle: {
    elevation: 0,
  },
  headerLeft: () => {
    return (
      <TouchableOpacity
        style={{paddingLeft: 15.44}}
        onPress={() => navigation.navigation.goBack()}>
        <Image style={{width: 12.3, height: 18.86}} source={backButton} />
      </TouchableOpacity>
    );
  },
  headerRight: () => {
    const params = navigation.route?.params;
    console.log('parapms', params);
    return (
      <TouchableOpacity
        onPress={() => {
          params.test();
        }}
        style={{paddingRight: 17.45}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 19,
            fontFamily: 'AntagometricaBT-Regular',
          }}>
          save
        </Text>
      </TouchableOpacity>
    );
  },
  // headerShown: false,
  tabBarLabel: '',
  tabBarStyle: {
    backgroundColor: 'rgba(52, 52, 90, 0.97)',
  },
    tabBarIcon: ({focused}) => (focused ? <SettingsActive/> : <SettingsAccount/>)
});

const navigationDocument =({navigation,route}) =>({
          headerTitle: "baby's diary",
          headerRight: () => {
            return (
              <View style={{marginRight: 18.58, flexDirection: 'row'}}>
                <TouchableOpacity>
                  <Image
                    style={{width: 18.58, height: 18.58}}
                    source={search}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                   console.log('route', route?.params.addEvent);
                   route?.params.addEvent();
                  }}
                  style={{marginLeft: 13.76}}>
                  <Image style={{width: 18.58, height: 18.58}} source={plus} />
                </TouchableOpacity>
              </View>
            );
          },
          tabBarLabel: '',
          headerTintColor: '#2371AB',
          headerStyle: {
            backgroundColor: '#242247',
            shadowColor: 'transparent',
            elevation: 0,
          },

          headerTitleStyle: {
            fontSize: 20,
          },
          tabBarStyle: {
            backgroundColor: 'rgba(52, 52, 90, 0.97)',
          },
          tabBarIcon: ({color, focused}) =>
            iconGr(focused, documentActive, document),
})
const Tab = createBottomTabNavigator();
// const TabNav = createTabNavigator()
const customTabBarStyle = {
  borderBottomWidth: 0,
  // activeTintColor: '#707070',
  // inactiveTintColor: 'gray',
  tabStyle: {
    paddingTop: 25,
  },
  labelStyle: {},
  // style: {backgroundColor: '#707070'},
};
export const MyTabs = () => {
  return (
    <Tab.Navigator tabBarOptions={customTabBarStyle}>
      <Tab.Screen
        name="graphics"
        component={Graphics}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: 'rgba(52, 52, 90, 0.97)',
          },
          tabBarIcon: ({focused}) => ( focused ? <ScheduleActive/> : <Schedule />)
          // iconGr(focused, graphActive, graphUnActive),
        }}
      />
      <Tab.Screen
        name="document"
        component={Document}
        options={navigationDocument}
      />
      <Tab.Screen
        name="account"
        component={Account}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: 'rgba(52, 52, 90, 0.97)',
          },
          tabBarIcon: ({focused}) => (focused ? <ChildActive/> : <Child/>)
          // iconGr(focused, childActive, childUnActive, 45),
        }}
      />
      <Tab.Screen
        name="location"
        component={Location}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: 'rgba(52, 52, 90, 0.97)',
          },
          tabBarIcon: ({ focused}) => (focused ? <BottleActive/> : <Bottle/>)
          // iconGr(focused, niple, niple),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={navigationOptions}
      />
    </Tab.Navigator>
  );
};
