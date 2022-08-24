import React, {useState} from 'react';
import { checkLogin }    from '../../redux/slices/auth';
import AsyncStorage      from '@react-native-async-storage/async-storage';
import {useDispatch}     from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';

import {CustomButton} from '../../components/CustomButton/CustomButton';
import {CustomInput}  from '../../components/CustomInput/CustomInput';
import owl            from '../../assets/images/owl2.png';
import background     from '../../assets/images/back.png';

import {LogIn}        from '../../api/Login/Login';
import {Loader}       from '../../components/Loader/Loader';

export const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [loginEmail,    setLogonEmail]    = useState('');
  const [loginPassword, setLogonPassword] = useState('');
  const [loaderLogin,   setLoaderLogin]   = useState(false);
  
  const handleRegisterAccount = () => {
    navigation.navigate('CreateNewAccount');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword1');
  };

  const LoginUser = () => {
    setLoaderLogin(true);

    if (loginEmail && loginPassword) {
      LogIn(loginEmail, loginPassword).then(async (res) => {
        console.log('[LOGIN] Login response', res.data.success.token);

        await AsyncStorage.setItem('_login_token', res.data.success.token);

        setLoaderLogin(false);

        dispatch(checkLogin());
      })
      .catch(rej => {
        if (rej.response.data.error == 'Your account has not yet been verified.') {
          console.warn('[LOGIN] Account is not verified');

          setLoaderLogin(false);

          navigation.navigate('Step2', {email: loginEmail});
        } else {
          console.error('[LOGIN] Login request failed', JSON.stringify(rej.response.data.error));

          setLoaderLogin(false);

          Alert.alert(rej?.response?.data?.error ? rej?.response?.data?.error : 'Server Error');
        }
      });
    } else {
      console.error('[LOGIN] Credentials are not entered');

      setLoaderLogin(false);

      Alert.alert('Please, enter your email and password');
    }
  };

  return (
    <>
      <ImageBackground source={background} style={{objectFit: 'cover', justifyContent: 'center', backgroundColor: '#1F1933', height: '100%', flex: 1}}>
        <View style={{marginTop: -80}}>
          <View style={{alignItems: 'center', fontSize: 27, marginBottom: 17}}>
            <Image style={{width: 150, height: 190, resizeMode: 'contain'}} source={owl} />

            <Text style={{fontSize: 27, color: '#fff', fontFamily: 'AntagometricaBTLight-Regular'}}>
              Misty The Cloud <Text style={{fontWeight: 'bold', fontFamily: 'AntagometricaBT-Bold'}}>App</Text>
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <CustomInput
              colorOfText="#BDC2CE"
              text={'Email'}
              value={loginEmail}
              onChangeText={loginEmail => setLogonEmail(loginEmail)}
              styling={{ marginLeft: 0, width: 269.59, borderRadius: 40, backgroundColor: '#213358', height: 53.92, color: '#FFF' }}
            />
            <CustomInput
              colorOfText="#BDC2CE"
              text={'Password'}
              value={loginPassword}
              onChangeText={loginPassword => setLogonPassword(loginPassword)}
              styling={{ marginLeft: 0, width: 269.59, borderRadius: 40, backgroundColor: '#213358', height: 53.92, color: '#FFF' }}
              secure={true}
            />

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={{color: '#CE9B51', fontFamily: 'AntagometricaBTLight-Regular', paddingLeft: 25, width: 269.59, marginBottom: 24}} numberOfLines={1}>
                yep... i forgot my password
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{alignItems:'center'}}>
            <CustomButton handleOnSubmit={LoginUser} text={'login'} />
            <CustomButton handleOnSubmit={handleRegisterAccount} text={'register'} />
          </View>
        </View>
      </ImageBackground>

      {loaderLogin && <Loader text={'Please wait...'} />}
    </>
  );
};