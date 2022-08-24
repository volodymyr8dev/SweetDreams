import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingsTemperature} from '../../../screens/Account/Settings/SettingsTemperature';
import {SettingsTime} from '../../../screens/Account/Settings/SettingsTime';
import {SettingsWakeUpTime} from '../../../screens/Account/Settings/SettingsWakeUpTime';
import {SettingsColourPicker} from '../../../screens/Account/Settings/SettingsColourPicker';
import {SettingsDomeBrightness} from '../../../screens/Account/Settings/SettingsDomeBrightness';
import {SettingsDisplayBrightness} from '../../../screens/Account/Settings/SettingsDisplayBrightness';
import {SettingsSmartCRY} from '../../../screens/Account/Settings/SettingsSmartCRY';
import {SettingsRecording} from '../../../screens/Account/Settings/SettingsRecording';
import {SettingsNewRecording} from '../../../screens/Account/Settings/SettingsNewRecording';
import {SettingsTimePlaying} from '../../../screens/Account/Settings/SettingsTimePlaying';
import {SettingsVolume} from '../../../screens/Account/Settings/SettingsVolume';

const customTabBarStyle = {
  activeTintColor: '#0091EA',
  inactiveTintColor: 'gray',
  style: {backgroundColor: '#000'},
};
const navigationOptionAccount = () => ({
  // headerShown: true,
  // tabBarColor: '#ddd',
  tabBarLabel: '',
  headerTintColor: '#000',
  style: {
    backgroundColor: '#000',
  },
  tabBarOptions: {customTabBarStyle},
});

const navigationOptions = navigation => {
  let params = navigation.route?.params;
  return {
    title: `${params.title}`,
    headerShown: true,
    headerTintColor: '#2371AB',
    headerTitleStyle: {
      fontFamily: 'AntagometricaBT-Bold',
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: '#2A305A',
    },
    headerLeft: () => {
      if (params.record) {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigation.goBack();
            }}>
            <Text
              style={{
                fontSize: 19,
                color: 'white',
                fontFamily: 'AntagometricaBT-Regular',
                paddingBottom: 4,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigation.goBack();
            }}
            style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/images/backButton.png')}
                style={{width: 12.3, height: 18.86, marginRight: 10}}
              />
              <Text
                style={{
                  fontSize: 19,
                  color: 'white',
                  fontFamily: 'AntagometricaBT-Regular',
                  paddingBottom: 4,
                }}>
                settings
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    },
    headerRight: () => {
      if (params.record) {
        return (
          <TouchableOpacity
            onPress={() => {
              params.sendRecord();
            }}>
            <Text
              style={{
                fontSize: 19,
                color: 'white',
                fontFamily: 'AntagometricaBT-Regular',
                paddingBottom: 4,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        );
      }
    },
  };
};
const StackRoutes = () => {

  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Screen
        name="Temperature"
        component={SettingsTemperature}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Time"
        component={SettingsTime}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Wake Up Time"
        component={SettingsWakeUpTime}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Colour Picker"
        component={SettingsColourPicker}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Dome Brightness"
        component={SettingsDomeBrightness}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Display Brightness"
        component={SettingsDisplayBrightness}
        options={navigationOptions}
      />
      <Stack.Screen
        name="smartCRY Sensor Sensitivity"
        component={SettingsSmartCRY}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Sound Playing Time"
        component={SettingsTimePlaying}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Custom Recording"
        component={SettingsRecording}
        options={navigationOptions}
      />
      <Stack.Screen
        name="Volume"
        component={SettingsVolume}
        options={navigationOptions}
      />
      <Stack.Screen
        name="New Recording"
        component={SettingsNewRecording}
        options={navigationOptions}
      />
    </>
  );
};

export default StackRoutes;
