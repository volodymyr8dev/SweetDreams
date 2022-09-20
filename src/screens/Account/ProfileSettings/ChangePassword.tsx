import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ImageBackground
} from 'react-native';

import {getCombinedNavigation} from '../../../hooks/useUpdateNavigationHeaderOptions';
import {COLORS}                from '../../../styles/Constants';
import {InputUnit}             from '../../../components/InputUnit/InputUnit';
import {UpdateProfile}         from '../../../api/Profile/Profile';
import {Loader}                from '../../../components/Loader/Loader';

import background              from '../../../assets/backOrigin.png';

export const ChangePassword = ({navigation, route}) => {
  const [loaderUpdatingPassword, setLoaderUpdatingPassword] = useState(false);

  const [oldPassword,             setOldPassword]             = useState('');
  const [newPassword,             setNewPassword]             = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'change password',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
        headerRightText:   'save',
        headerRightMethod: () => {
          handleChangePassword(oldPassword, newPassword, newPasswordConfirmation);
        },
      })
    )
  }, [navigation]);

  const handleChangePassword = (oldPassword, newPassword, newPasswordConfirmation) => {
    setLoaderUpdatingPassword(true);

    if (oldPassword && newPassword && newPasswordConfirmation) {
      UpdateProfile({
        password_old:          oldPassword,
        password:              newPassword,
        password_confirmation: newPasswordConfirmation,
      }).then(res => {
        console.log('[PROFILE] Profile response', res);

        setLoaderUpdatingPassword(false);

        Alert.alert('Profile settings are updated');
      }).catch(rej => {
        console.error('[PROFILE] Profile request failed', rej);

        setLoaderUpdatingPassword(false);

        Alert.alert(rej?.response?.data?.message ? rej?.response?.data?.message : 'Server Error');
      });
    } else {
      setLoaderUpdatingPassword(false);
      
      Alert.alert('You haven\'t completed the form');
    }
  };

  /* Update options on update */
  const refreshNavigation = (oldPassword, newPassword, newPasswordConfirmation) => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'change password',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
        headerRightText:   'save',
        headerRightMethod: () => {
          handleChangePassword(oldPassword, newPassword, newPasswordConfirmation);
        },
      })
    )
  }

  return (
    <ImageBackground source={background} style={{backgroundColor: COLORS.back, flex: 1}}>
      <View style={styles.container}>
        <View style={{paddingHorizontal: 20, marginVertical: 15}}>
          <Text style={{color: COLORS.text, fontFamily: 'AntagometricaBT-Regular'}}>
            Please enter the old password
          </Text>
        </View>
        <InputUnit
          title={'Old Password'}
          nameOfBox={'input'}
          placeholder={'Old Password'}
          nameField={'************'}
          security={true}
          value={oldPassword}
          setValueName={currentOldPassword => {
            setOldPassword(currentOldPassword);
            refreshNavigation(currentOldPassword, newPassword, newPasswordConfirmation);
          }}
        />
        <View style={{paddingHorizontal: 20, marginVertical: 15}}>
          <Text
            style={{color: COLORS.text, fontFamily: 'AntagometricaBT-Regular'}}>
            Please enter the new password 8-64 charapters (letters, numbers AND special characters)
          </Text>
        </View>
        <InputUnit
          title={'New Password'}
          nameOfBox={'input'}
          placeholder={'New Password'}
          nameField={'************'}
          security={true}
          value={newPassword}
          setValueName={currentNewPassword => {
            setNewPassword(currentNewPassword);
            refreshNavigation(oldPassword, currentNewPassword, newPasswordConfirmation);
          }}
        />

        <InputUnit
          title={'Confirm New Password'}
          nameOfBox={'input'}
          placeholder={'Confirm New Password'}
          nameField={'************'}
          security={true}
          value={newPasswordConfirmation}
          setValueName={currentNewPasswordConfirmation => {
            setNewPasswordConfirmation(currentNewPasswordConfirmation);
            refreshNavigation(oldPassword, newPassword, currentNewPasswordConfirmation);
          }}
        />
      </View>
      {loaderUpdatingPassword && <Loader text={'updating password...'} />}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    height: '100%',
  },
  box: {
    height: 66,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.backGround,
    width: '100%',
    marginBottom: 7,
  },
  input: {
    marginBottom: 7,
    height: 66,
    width: '100%',
    borderRadius: 0,
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
