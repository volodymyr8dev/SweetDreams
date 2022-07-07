import {useNavigation, useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
  // TextInput,
} from 'react-native';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import StepIndicator from 'react-native-step-indicator';
// import {CheckBox} from '../../components/CheckBox/CheckBox';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {customStyles} from '../../components/StepIndicator/StepIndicator';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Validation} from '../../components/validation/Validation';
import {
  CreateAccount,
  PostCaregiver,
} from '../../api/CreateAccount/CreateAccount';
import {setLoader} from '../../redux/slice/slice';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../components/Loader/Loader';
import {forgotPassword} from '../../api/ForgotPassword/forgotPassword';
import {COLORS} from '../../styles/Constants';

export const ForgotPassword = () => {
  const [currentPosition, setCurrentPosition] = useState(2);
  const [email, setemail] = useState('');
  const global = useSelector(({account}) => account);
  const navigation = useNavigation<any>();

  useEffect(() => {
    navigation.setParams({
      hide: true,
      rightEl: true,
    });
  }, []);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const handleGoTo2 = () => {
    if (!Validation('email', email)) {
      dispatch(setLoader(true));
      console.log('email',email);
      forgotPassword(email)
        .then(data => {
          console.log('data', data);
          dispatch(setLoader(false));
          navigation.navigate('Change Password', {
            props: {email: email},
            email: email,
            title: 'change password',
            rightEl: true,
          });
        })
        .catch(err => {
          console.log(err);
          dispatch(setLoader(false));

          Alert.alert('something went wrong');
        });
    } else {
      Alert.alert('Email is incorect');
    }
  };

  useEffect(() => {
    navigation.setParams({
      position: currentPosition,
      setPosition: setCurrentPosition,
    });
  }, [currentPosition, isFocused]);

  useEffect(() => {
    navigation.setParams({
      sendCode: handleGoTo2,
    });
  }, [email]);
  return (
    <>
      <View style={styles.container}>
        <View style={{paddingTop: 10, paddingBottom: 15}}>
          <Text style={{fontSize: 14, color: COLORS.textLight}}>
            Forgotten your password? No problem, please enter your email below
            and we'll send you a recovery link
          </Text>
        </View>
        <CustomInput
          value={email}
          onChangeText={email => setemail(email)}
          styling={styles.input}
          text={'Your Email'}
        />
        <View style={{marginBottom: 10}}></View>

        {/* <TouchableOpacity onPress={handleGoTo2} style={styles.buttonDown}>
          <View>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
              next
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
      {global?.loader && <Loader text={'Please wait ...'} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 19,
    paddingRight: 29,
    backgroundColor: '#272A57',
    height: '100%',
  },
  input: {
    marginLeft: -20,
    width: '115%',
    borderRadius: 0,
    backgroundColor: '#201F3F',
    color: '#2371AB',
  },
  citizen: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 6,
    paddingHorizontal: 19,
    marginLeft: -20,
    backgroundColor: '#201F3F',
    width: '115%',
    height: 76,
  },
  buttonDown: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '120%',
    marginLeft: -19,
    height: 85,
    justifyContent: 'center',
    backgroundColor: '#1D1A34',
  },
});
