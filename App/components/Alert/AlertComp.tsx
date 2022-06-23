import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert} from 'react-native';
export const AlertComp = (title, buttonTextLeft, buttonTextRight) => {
  console.log(title);
  const navigation = useNavigation();
  // return Alert.alert(`${title}`, '', [
  //   {
  //     text: `${buttonTextLeft}`,
  //     onPress: () => navigation.navigate('Login'),
  //   },
  //   {text: `${buttonTextRight}`, onPress: () => console.log('OK Pressed')},
  // ]);
};
