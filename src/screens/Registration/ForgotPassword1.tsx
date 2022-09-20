import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  ImageBackground
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducerState}         from '../../redux';
import {getCombinedNavigation}    from '../../hooks/useUpdateNavigationHeaderOptions';

import {CustomInput}              from '../../components/CustomInput/CustomInput';
import {Loader}                   from '../../components/Loader/Loader';
import {ForgotPassword}           from '../../api/ForgotPassword/ForgotPassword';
import {setEmail}                 from '../../redux/slices/forgotPassword';
import {COLORS}                   from '../../styles/Constants';

import background                 from '../../assets/backOrigin.png';

export const ForgotPassword1 = ({navigation}) => {
  const dispatch = useDispatch();
  const {forgotPassword} = useSelector((state: RootReducerState) => state);
  const [loaderCodeGeneration, setLoaderCodeGeneration] = useState(false);

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'forgot password',
        headerLeftMethod: () => {
          navigation.goBack();
        },
        headerRightText:   'send',
        headerRightMethod: () => {
          sendResetEmailCode(forgotPassword.email);
        },
      })
    )
  }, [navigation]);

  /* Update options on update */
  const changeEmail = (email) => {
    dispatch(setEmail(email));

    navigation.setOptions(
      getCombinedNavigation({
        title: 'forgot password',
        headerLeftMethod: () => {
          navigation.goBack();
        },
        headerRightText:   'send',
        headerRightMethod: () => {
          sendResetEmailCode(email);
        },
      })
    )
  }

  const sendResetEmailCode = (email) => {
    if (email) {
      setLoaderCodeGeneration(true);

      ForgotPassword(email).then(res => {
        console.info('[FORGOT PASSWORD] Forgot password response', res);

        setLoaderCodeGeneration(false);

        navigation.navigate('ForgotPassword2');
      })
      .catch(rej => {
        console.error('[FORGOT PASSWORD] Forgot password request failed', rej);

        setLoaderCodeGeneration(false);

        Alert.alert(rej?.response?.data?.message ? rej?.response?.data?.message : 'Server Error');
      });
    } else {
      console.error('[FORGOT PASSWORD] Forgot password request failed');

      setLoaderCodeGeneration(false);

      Alert.alert('Please, enter the email to reset the password');
    }
  };

  return (
    <ImageBackground source={background} style={{flex: 1, backgroundColor: COLORS.backGround}}>
      <View style={{paddingTop: 10, paddingLeft: 19, paddingRight: 29, height: '100%'}}>
        <View style={{paddingTop: 10, paddingBottom: 15}}>
          <Text style={{fontSize: 14, color: '#26669E', fontFamily: 'AntagometricaBT-Regular'}}>
            Forgotten your password? No problem, please enter your email below
            and we'll send you a recovery link
          </Text>
        </View>
        <CustomInput value={forgotPassword.email} onChangeText={forgotPasswordEmail => { changeEmail(forgotPasswordEmail) }} text={'Your Email'} />
        <View style={{marginBottom: 10}}></View>
      </View>
      
      {loaderCodeGeneration && <Loader text={'generating a code...'} />}
    </ImageBackground>
  );
};