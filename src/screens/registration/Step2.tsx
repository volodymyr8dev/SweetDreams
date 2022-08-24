import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { getCombinedNavigation }              from '../../hooks/useUpdateNavigationHeaderOptions';
import { checkLogin }                         from '../../redux/slices/auth';
import StepIndicator from 'react-native-step-indicator';
import {customStyles} from '../../components/StepIndicator/StepIndicator';
import emailImage from '../../assets/images/email.png';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import {
  SendEmailVerificationCode,
  VerifyEmail,
} from '../../api/CreateAccount/CreateAccount';
import {useDispatch} from 'react-redux';

import {Loader} from '../../components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Step2 = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [code,  setCode]  = useState('');

  const [loaderVerification,   setLoaderVerification]   = useState(false);
  const [loaderSendingNewCode, setLoaderSendingNewCode] = useState(false);

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'verify your email',
        headerLeftMethod: () => {
          navigation.goBack();
        },
        headerRightText:   'verify',
        headerRightMethod: () => {
          handleVerifyEmail(route.params?.email, code);
        },
      })
    )
  }, [navigation]);

  const handleVerifyEmail = (email, code) => {
    setLoaderVerification(true);

    VerifyEmail(email, code).then(async (res) => {
      console.log('[VERIFY EMAIL] Verify email response', JSON.stringify(res));


      await AsyncStorage.setItem('_login_token', res.data.token);

      setLoaderVerification(false);

      dispatch(checkLogin());
    })
    .catch(rej => {
      console.error('[VERIFY EMAIL] Change password request failed', rej);

      setLoaderVerification(false);

      Alert.alert('The confirmation code is correct');
    });
  };

  const handleResendCode = () => {
    setLoaderSendingNewCode(true);

    SendEmailVerificationCode(route.params?.email).then((res) => {
      console.log('[VERIFY EMAIL] Resend verification email code response', JSON.stringify(res));

      setLoaderSendingNewCode(false);
    })
    .catch(rej => {
      console.error('[VERIFY EMAIL] Resend verification email code request failed', rej);

      setLoaderSendingNewCode(false);

      Alert.alert('Server Error');
    });
  };

  /* Update options on update */
  const refreshNavigation = (code) => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'verify your email',
        headerLeftMethod: () => {
          navigation.goBack();
        },
        headerRightText:   'verify',
        headerRightMethod: () => {
          handleVerifyEmail(route.params?.email, code);
        },
      })
    )
  }

  return (
    <>
      <View style={styles.container}>
        <StepIndicator customStyles={customStyles} currentPosition={1} />
        <View style={{paddingHorizontal: 10, marginTop: 50, alignItems: 'center', height: '85%' }}>
          <View style={{marginBottom: 25}}>
            <Image style={{width: 80, height: 55}} source={emailImage} />
          </View>
          <View style={{marginBottom: 5}}>
            <Text style={{color: '#26679F', fontSize: 19, fontWeight: 'bold', fontFamily: 'AntagometricaBT-Bold'}}>
              Enter your verification code
            </Text>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{textAlign: 'center', color: '#26679F', fontFamily: 'AntagometricaBT-Regular'}}>
              Please, enter the verification code which is sent to your email address
            </Text>
          </View>
          <View style={{width: '110%'}}>
            <CustomInput text={'Verification Code'} value={code} onChangeText={currentCode => {setCode(currentCode); refreshNavigation(currentCode);}} />
          </View>
        </View>
        <TouchableOpacity onPress={handleResendCode}>
          <View style={styles.buttonDown}>
            <View style={{marginTop: 20}}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'AntagometricaBT-Bold'}}>
                Resend
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {loaderVerification && <Loader text={'Verifying your email...'} />}
      {loaderSendingNewCode && <Loader text={'Sending a new code...'} />}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 19,
    paddingRight: 29,
    backgroundColor: '#2B2D60',
    height: '100%',
  },
  buttonDown: {
    position: 'absolute',
    bottom: -50,
    width: '115%',
    marginLeft: -20,
    height: 95,
    justifyContent: 'flex-start',
    backgroundColor: '#1D1A34',
  },
});
