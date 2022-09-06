import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  Alert,
  ImageBackground
} from 'react-native';

import {RootReducerState}      from '../../redux';
import {getCombinedNavigation} from '../../hooks/useUpdateNavigationHeaderOptions';

import {CustomInput}           from '../../components/CustomInput/CustomInput';
import {Loader}                from '../../components/Loader/Loader';
import {ChangePassword}        from '../../api/ForgotPassword/ForgotPassword';
import {COLORS}                from '../../styles/Constants';

import background              from '../../assets/images/homeIcon/backgroundHome.png';

export const ForgotPassword2 = ({navigation}) => {
  const {forgotPassword} = useSelector((state: RootReducerState) => state);
  const [loaderPasswordChange, setLoaderPasswordChange] = useState(false);

  const [code, setCode]                                       = useState('');
  const [newPassword, setNewPassword]                         = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'change password',
        headerLeftMethod: () => {
          navigation.goBack();
        },
        headerRightText:   'save',
        headerRightMethod: () => {
          handleChangePassword(
            forgotPassword.email,
            code,
            newPassword,
            newPasswordConfirmation
          );
        },
      })
    )
  }, [navigation]);

  /* Update options on update */
  const refreshNavigation = (email, code, password, passwordConfirmation) => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'change password',
        headerLeftMethod: () => {
          navigation.goBack();
        },
        headerRightText:   'save',
        headerRightMethod: () => {
          handleChangePassword(
            email,
            code,
            password,
            passwordConfirmation
          );
        },
      })
    )
  }
  
  const handleChangePassword = (email, code, password, passwordConfirmation) => {
    setLoaderPasswordChange(true);

    ChangePassword(email, code, password, passwordConfirmation).then((res) => {
      console.log('[CHANGE PASSWORD] Change password response', JSON.stringify(res));

      setLoaderPasswordChange(false);

      Alert.alert('Your password is changed now. Please, try to login.');

      navigation.navigate('Login');
    })
    .catch(rej => {
      console.error('[CHANGE PASSWORD] Change password request failed', rej);

      setLoaderPasswordChange(false);

      Alert.alert('The confirmation code or passwords are not correct');
    });
  };

  return (
    <ImageBackground source={background} style={{flex: 1, backgroundColor: COLORS.backGround}}>
      <View style={{paddingTop: 10, paddingLeft: 19, paddingRight: 29, height: '100%'}}>
        <CustomInput
          value={code}
          onChangeText={code => {setCode(code); refreshNavigation(forgotPassword.email, code, newPassword, newPasswordConfirmation);}}
          text={'Reset code'}
        />  
        <View style={{paddingTop: 10, paddingBottom: 15}}>
          <Text style={{fontSize: 14, color: '#26669E', fontFamily: 'AntagometricaBT-Regular'}}>
            Please, enter the reset code we recently sent to your email address supplied.
          </Text>
        </View>
        <CustomInput
          value={newPassword}
          onChangeText={currentPassword => {setNewPassword(currentPassword); refreshNavigation(forgotPassword.email, code, currentPassword, newPasswordConfirmation);}}
          text={'New Password'}
          secure={true}
        />
        <Text style={{fontSize: 14, color: '#26669E', marginBottom: 10, fontFamily: 'AntagometricaBT-Regular'}}>
            Please, enter a new password 8-64 characters (letters, numbers AND special characters)
          </Text>
        <CustomInput
          value={newPasswordConfirmation}
          onChangeText={currentPassword => {setNewPasswordConfirmation(currentPassword); refreshNavigation(forgotPassword.email, code, newPassword, currentPassword);}}
          text={'Confirm New Password'}
          secure={true}
        />
      </View>
      {loaderPasswordChange && <Loader text={'changing a password...'} />}
    </ImageBackground>
  );
};