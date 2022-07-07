import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import {CustomButton} from '../../components/CustomButton/CustomButton';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import owl from '../../assets/images/owl2.png';
import back from '../../assets/images/back.png';
import {LogIn} from '../../api/Login/Login';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../redux/slice/slice';
import {Loader} from '../../components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountSelector} from '../../redux/selectors/AccountSelector';
type Nav = {
  navigate: (value: string, obj: any) => void;
};

export const Login = () => {
  const navigation = useNavigation<Nav>();
  const [loginEmail, setLogonEmail] = useState('');
  const [loginPassword, setLogonPassword] = useState('');
  const dispatch = useDispatch();
  const global = useSelector(AccountSelector);
  const goToCreateAccount = () => {
    navigation.navigate('CreateNewAccount', {title: 'create new account'});
    // navigation.navigate('account');
  };

  const LoginUser = () => {
    dispatch(setLoader(true));
    if (loginEmail && loginPassword) {
      LogIn(loginEmail, loginPassword)
        .then(async ({data}) => {
          await AsyncStorage.setItem('@storage_Key', data.success.token).catch(
            err => console.log('token error', err),
          );
          navigation.navigate('account');
          // console.log(data.succes.token, 'date');
          dispatch(setLoader(false));
        })
        .catch(err => {
          dispatch(setLoader(false));
          console.log('aaaaa', err.response.data);
          if (err.response.data.error) {
            Alert.alert(err.response.data.error);
          } else if (err.response.data.message)
            Alert.alert(err.response.data.message);
        });
    } else {
      dispatch(setLoader(false));
      Alert.alert('Please, fill in all the required fields');
    }
  };
  const handleForgotPassword = () => {
    navigation.setParams({
      hide: false,
      title: 'recovery password',
    });
    navigation.navigate('forgotPassword', {title: 'recovery password'});
  };
  return (
    <>
      <ImageBackground style={styles.container} source={back}>
        <View style={{marginTop: -80}}>
          <View style={styles.title}>
            <Image
              style={{width: 150, height: 190, resizeMode: 'contain'}}
              source={owl}></Image>
            <Text
              style={{
                fontSize: 27,
                color: '#fff',
                fontFamily: 'AntagometricaBTLight-Regular',
              }}>
              Misty The Cloud <Text style={{fontWeight: 'bold', fontFamily: 'AntagometricaBT-Bold'}}>App</Text>
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <CustomInput
              colorOfText="#BDC2CE"
              text={'Username'}
              value={loginEmail}
              onChangeText={loginEmail => setLogonEmail(loginEmail)}
            />
            <CustomInput
              colorOfText="#BDC2CE"
              text={'Password'}
              value={loginPassword}
              onChangeText={loginPassword => setLogonPassword(loginPassword)}
              secure={true}
            />
          </View>
            <TouchableOpacity onPress={handleForgotPassword} style={styles.YepContainer}>
                <Text style={styles.forgotPassword}>
                  yep... i forgot password
                </Text>
            </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <CustomButton
              handleOnSubmit={LoginUser}
              text={'login'}
              styles={undefined}></CustomButton>
            <CustomButton
                handleOnSubmit={goToCreateAccount}
                text={'register'}
                styles={undefined}></CustomButton>
          </View>
        </View>
      </ImageBackground>
      {global?.loader && <Loader text={'Please wait ...'} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    objectFit: 'cover',
    // paddingHorizontal: Dimensions.get('window').width / 6,
    justifyContent: 'center',
    backgroundColor: '#1F1933',
    height: '100%',
    flex: 1,
  },
  YepContainer:{
    marginTop: -3,
    marginBottom: 24,
    marginLeft: '21%',
    width: '40%'
  },
  title: {
    alignItems: 'center',
    fontSize: 27,
    marginBottom: 17,
  },
  forgotPassword: {
    color: '#CE9B51',
  },
});
