import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAccount, Logout} from '../../api/Login/Login';
export const AlertComp = (
  title,
  buttonTextLeft,
  buttonTextRight,
  navigation?,
  handle?,
) => {
  // const navigation = useNavigation();
  // console.log(title);
  return Alert.alert(`${title}`, '', [
    {
      text: `${buttonTextLeft}`,
      onPress: () => {
        console.log('wwww');
        if (handle == 'delete') {
          navigation &&
            deleteAccount()
              .then(() => {
                console.log('success');
                navigation.navigate('Login');
                navigation && AsyncStorage.clear();
              })
              .catch(err => {
                console.log(err.response);
                Alert.alert(err.message);
              });
        } else {
          navigation &&
            Logout()
              .then(() => {
                navigation.navigate('Login');
                navigation && AsyncStorage.clear();
              })
              .catch(err => {
                console.log(err.response);
                Alert.alert(err.message);
              });
        }
      },
    },
    {text: `${buttonTextRight}`, onPress: () => console.log('OK Pressed')},
  ]);
};
