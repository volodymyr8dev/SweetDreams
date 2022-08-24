import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DeleteAccount, Logout} from '../../api/Login/Login';

export const AlertComp = (
  title,
  buttonTextLeft,
  buttonTextRight,
  navigation?,
  handle?,
) => {
  return Alert.alert(`${title}`, '', [
    {
      text: `${buttonTextLeft}`,
      onPress: () => {
        if (handle == 'delete') {
          navigation &&
          DeleteAccount()
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
