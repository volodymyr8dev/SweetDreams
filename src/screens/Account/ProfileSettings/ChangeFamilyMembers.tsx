import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector}   from 'react-redux';

import {  } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Alert
} from 'react-native';

import {InputUnit}             from '../../../components/InputUnit/InputUnit';

import {COLORS}                from '../../../styles/Constants';

import {RootReducerState}      from '../../../redux';
import {getCombinedNavigation} from '../../../hooks/useUpdateNavigationHeaderOptions';
import {checkLogin}            from '../../../redux/slices/auth';

import background              from '../../../assets/backOrigin.png';
import {Loader}                from '../../../components/Loader/Loader';
import {AddFamilyMember}       from '../../../api/Profile/Profile';

interface PropsBox {
  nameOfBox: string;
  title: string;
  nameField: string;
  rightEl?: string;
  placeholder?: string;
}

export const ChangeFamilyMembers = ({navigation}) => {
  const dispatch = useDispatch();
  
  const {user} = useSelector((state: RootReducerState) => state.auth);

  const [valueName,  setValueName]  = useState('');
  const [valueEmail, setValueEmail] = useState('');

  const [loaderFamilyMembers, setLoaderFamilyMembers] = useState(false);

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'invite family member',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
        headerRightText:   'invite',
        headerRightMethod: () => {
          handleSave(valueName, valueEmail);
        },
      })
    )
  }, [navigation]);

  /* Update options on update */
  const refreshNavigation = (name, email) => {
    navigation.setOptions(
      getCombinedNavigation({
        title:            'invite family member',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
        headerRightText:  'invite',
        headerRightMethod: () => {
          handleSave(name, email);
        },
      })
    )
  }

  const handleSave = (name, email) => {
    setLoaderFamilyMembers(true);
    
    AddFamilyMember(user.accounts[0].id, name, email).then(res => {
      console.log('[FAMILY MEMBERS] Add family member response', res);

      Alert.alert('Family member has been invited');

      setLoaderFamilyMembers(false);

      dispatch(checkLogin());
    }).catch(rej => {
      console.error('[FAMILY MEMBERS] Add family member request failed', rej);

      Alert.alert(rej?.response?.data?.message ? rej?.response?.data?.message : 'Server Error');

      setLoaderFamilyMembers(false);
    });
  };

  return (
    <ImageBackground source={background} style={{backgroundColor: COLORS.back}}>
      <View style={styles.container}>
        <View style={{paddingHorizontal: 20, marginVertical: 20}}>
          <Text style={{color: COLORS.text}}>
            To add a family, and share both data and control of your devices
            please enter their details below.
          </Text>
        </View>
        <InputUnit
          value={valueEmail}
          setValueName={currentEmail => {
            setValueEmail(currentEmail);
            refreshNavigation(valueName, currentEmail);
          }}
          title={'Email Address'}
          nameField={''}
          nameOfBox={'input'}
          placeholder={'Email Address'}
        />
        <InputUnit
          value={valueName}
          setValueName={currentName => {
            setValueName(currentName);
            refreshNavigation(currentName, valueEmail);
          }}
          title={'Your Name'}
          nameField={'Bernie'}
          nameOfBox={'input'}
          placeholder={'Your Name'}
        />
      </View>
      {loaderFamilyMembers && <Loader text={'adding a family member...'} />}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  box: {
    height: 60,
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
