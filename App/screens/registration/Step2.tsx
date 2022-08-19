import {useNavigation, useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {customStyles} from '../../components/StepIndicator/StepIndicator';
import background from '../../assets/images/background.png';
import email from '../../assets/images/email.png';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import {
  SendEmailVerificationCode,
  VerifyEmail,
} from '../../api/CreateAccount/CreateAccount';
import {useDispatch, useSelector} from 'react-redux';
import {
  setEmail,
  setLoader,
  setUserInformation,
  updateVerifiedEmail,
} from '../../redux/slice/slice';
import {Loader} from '../../components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import checkButton from '../../assets/images/checkButton.png'

export const Step2 = () => {
  const [currentPosition, setCurrentPosition] = useState(1);
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [bool, setBool] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const global = useSelector<IRootState>(({account}) => account);
  useEffect(() => {
    navigation.setParams({
      position: currentPosition,
      setPosition: setCurrentPosition,
      show: false,
      title: 'registration',
    });
  }, [currentPosition, isFocused]);

  useEffect(() => {
    currentPosition === 2 && isFocused && setCurrentPosition(1);
  }, [isFocused]);

  useEffect(() => {
    dispatch(setEmail(navigation.getState().routes[2].params?.email));
  }, []);
  useEffect(() => {
    if (code && code.length == 6 && bool === false) {
      dispatch(setLoader(true));
      VerifyEmail(global?.email, code)
        .then(async ({data}) => {
          console.log('222222222', data);
          dispatch(setLoader(false));
          dispatch(setUserInformation(data.user));
          await AsyncStorage.setItem('@storage_Key', data.token).catch(err =>
            console.log('token error', err),
          );
          dispatch(setLoader(false));
          setBool(true);

          navigation.navigate('step2',{title:"create new account"});
        })
        .catch(err => {
          console.log('Errrrr', err.response.data);
          dispatch(setLoader(false));
          Alert.alert(err.response.data.error);
        });
    }
  }, [code]);

  const navigateToStep3 = () => {
    SendEmailVerificationCode(global?.email)
      .then(data => {
        console.log(data);
        Alert.alert('Verification code sent successfully');
      })
      .catch(err => {
        console.log('err', err.response.data);
        Alert.alert(err.response.data.error);
      });
  };

  return (
    <>
      <View style={styles.container}>
        {/* <ImageBackground source={background} style={styles.container}> */}
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          // onPress={() => setCurrentPosition(prev => prev + 1)}
        />

        <View style={styles.emailContainer}>
          <View style={{marginBottom: 25}}>
            <Image style={{width: 80, height: 55}} source={email} />
          </View>
          <View style={{marginBottom: 5}}>
            <Text style={{color: '#26679F', fontSize: 19, fontWeight: 'bold', fontFamily: 'AntagometricaBT-Bold'}}>
              Enter verification code
            </Text>
          </View>
          {/* <View style={{marginBottom: 19}}>
            <Text style={{textAlign: 'center', color: '#26679F'}}>
              A verification email was sent to {'\n'}example@example.com
            </Text>
          </View> */}
          <View style={{marginBottom: 15}}>
            <Text style={{textAlign: 'center', color: '#26679F', fontFamily: 'AntagometricaBT-Regular'}}>
              Please, enter the verification code which is sent to your email address
            </Text>
          </View>
          <View style={{width: '110%'}}>
            <CustomInput
              styling={styles.input}
              text={'Verification code'}
              value={code}
              onChangeText={code => setCode(code)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={navigateToStep3}>
          <View style={styles.buttonDown}>
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontFamily: 'AntagometricaBT-Bold'
                }}>
                Resend Code
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* </ImageBackground> */}
      </View>
      {global?.loader && <Loader text={'Please wait for a verification'} />}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    // marginTop:-50,
    paddingTop: 10,
    paddingLeft: 19,
    paddingRight: 29,
    backgroundColor: '#2B2D60',
    height: '100%',
  },
  input: {
    marginLeft: -20,
    width: '115%',
    height: 76,
    borderRadius: 0,
    backgroundColor: '#201F3F',
    color: '#2371AB',
    fontFamily: 'AntagometricaBT-Regular'
  },
  emailContainer: {
    paddingHorizontal: 10,
    marginTop: 50,
    // justifyContent: 'center',
    alignItems: 'center',
    height: '85%',
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
