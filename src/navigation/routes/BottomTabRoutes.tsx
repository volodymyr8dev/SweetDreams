import React, {useEffect} from 'react';
import { RootReducerState } from '../redux';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Account} from '../../screens/Account/Account';
import {ProfileSettings} from '../../screens/Account/ProfileSettings/ProfileSettings';
import {NurseryData} from '../../screens/Account/Nursery/NurseryData';
import {Document} from '../../screens/Account/Diary/Document';
import {Feed} from '../../screens/Account/Feed/Feed';
import backButton from '../../assets/images/backButton.png';
import Schedule from '../../assets/images/svg/Schedule';
import ScheduleActive from '../../assets/images/svg/ScheduleActive';
import Child from '../../assets/images/svg/Child';
import ChildActive from '../../assets/images/svg/ChildActive';
import Bottle from '../../assets/images/svg/Bottle';
import BottleActive from '../../assets/images/svg/BottleActive';
import SettingsAccount from '../../assets/images/svg/Settings';
import SettingsActive from '../../assets/images/svg/SettingsActive';
import Search from '../../assets/images/svg/diary/Search';
import Plus from '../../assets/images/svg/diary/Plus';
import BottomIcon from '../../assets/images/svg/diary/BottomIcon';
import BottomUnActive from '../../assets/images/svg/diary/BottomUnActive';
import {useDispatch, useSelector} from 'react-redux';
import ConfirmConnection from '../../screens/Account/ConfirmConnection';
import {RootState} from '../../redux/configureStore';
import {useNavigation} from '@react-navigation/native';

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
  },
  headerTitleStyle: {
    fontFamily: 'AntagometricaBT-Bold',
    fontSize: 19,
  },
  tabBarStyle: {
    elevation: 0,
    backgroundColor: 'rgba(52, 52, 90, 0.97)',
  },
  headerLeft: () => {
    return (
      <TouchableOpacity style={{paddingLeft: 15.44}} onPress={() => navigation.navigation.goBack()}>
        <Image style={{width: 12.3, height: 18.86}} source={backButton} />
      </TouchableOpacity>
    );
  },
  headerRight: () => {
    const params = navigation.route?.params;

    return (
      <TouchableOpacity  onPress={() => { params.test(); }} style={{paddingRight: 17.45}}>
        <Text style={{color: '#fff', fontSize: 19, fontFamily: 'AntagometricaBT-Regular' }}>
          save
        </Text>
      </TouchableOpacity>
    );
  },
  tabBarLabel: '',
  tabBarIcon: ({focused}) => focused ? <SettingsActive /> : <SettingsAccount />,
});

const navigationDocument = ({navigation, route}) => ({
  headerTitle: "baby's diary",

  headerRight: () => {
    return (
      <View style={{marginRight: 18.58, flexDirection: 'row'}}>
        <TouchableOpacity
          style={{paddingRight: 23.5, paddingLeft: 5, paddingVertical: 5.5}}
          onPress={() => {
            route.params?.searchClicked();
          }}>
          <Search style={{width: 15, height: 15}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: 5}}
          onPress={() => {
            route?.params.addEvent();
          }}>
          <Plus style={undefined} />
        </TouchableOpacity>
      </View>
    );
  },
  headerShown: true,
  tabBarLabel: '',
  headerTintColor: '#2371AB',
  headerStyle: {
    backgroundColor: '#242247',
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerTitleStyle: {fontSize: 20},
  tabBarStyle: {
    backgroundColor: 'rgba(52, 52, 90, 0.97)',
  },
  // tabBarIcon: ({color, focused}) => iconGr(focused, documentActive, document),
  tabBarIcon: ({focused}) => (focused ? <BottomIcon /> : <BottomUnActive />),
});

const feedOptions = () => ({
  headerShown: true,
  headerTitle: 'new feed entry',
  headerTintColor: '#2371AB',
  headerStyle: {
    backgroundColor: '#242247',
    shadowColor: 'transparent',
  },
  headerTitleStyle: {
    fontSize: 18,
  },
  headerRight: () => {
    return (
      <TouchableOpacity style={{marginRight: 18.58, flexDirection: 'row'}}>
        <Text style={{color: '#fff', fontSize: 18}}>save</Text>
      </TouchableOpacity>
    );
  },
  tabBarLabel: '',
  tabBarStyle: {
    backgroundColor: 'rgba(52, 52, 90, 0.97)',
  },
  tabBarIcon: ({focused}) => (focused ? <BottleActive /> : <Bottle />),
});

const Tab = createBottomTabNavigator();
const customTabBarStyle = {
  borderBottomWidth: 0,
  tabStyle: {paddingTop: 25},
  labelStyle: {},
};
export const MyTabs = ({navigation}) => {
  const { loadingCheckLogin, user, verified } = useSelector((state: RootReducerState) => state.auth);

  useEffect(() => {
    navigation.navigate('Accountt');
  }, []);

  return (
    <Tab.Navigator tabBarOptions={customTabBarStyle}>
      <Tab.Screen
        name="graphics"
        component={NurseryData}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: 'rgba(52, 52, 90, 0.97)',
          },
          tabBarIcon: ({focused}) =>
            focused ? <ScheduleActive /> : <Schedule />,
        }}
      />
      <Tab.Screen
        name="document"
        component={Document}
        options={navigationDocument}
      />
      <Tab.Screen
        name="Accountt"
        component={
          user.accounts[0].device === null ? ConfirmConnection : Account
        }
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarStyle: {
            backgroundColor: 'rgba(52, 52, 90, 0.97)',
          },
          tabBarIcon: ({focused}) => (focused ? <ChildActive /> : <Child />),
        }}
      />
      <Tab.Screen name="feed" component={Feed} options={feedOptions} />
      <Tab.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={navigationOptions}
      />
    </Tab.Navigator>
  );
};
