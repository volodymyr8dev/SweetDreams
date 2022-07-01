import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AlertComp = (
  title,
  buttonTextLeft,
  buttonTextRight,
  navigation?,
) => {
  // const navigation = useNavigation();
  // console.log(title);
  return Alert.alert(`${title}`, '', [
    {
      text: `${buttonTextLeft}`,
      onPress: () => {
        console.log('wwww');
        navigation && navigation.navigate('Login');
        navigation && AsyncStorage.clear();
      },
    },
    {text: `${buttonTextRight}`, onPress: () => console.log('OK Pressed')},
  ]);
};
