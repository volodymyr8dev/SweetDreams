import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

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
      },
    },
    {text: `${buttonTextRight}`, onPress: () => console.log('OK Pressed')},
  ]);
};
