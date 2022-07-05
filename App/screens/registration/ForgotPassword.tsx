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

export const ForgotPassword = () => {
  const [currentPosition, setCurrentPosition] = useState(2);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [email, setemail] = useState('');
  const [visibleData, setVisibleData] = useState(false);
  const [gender, setGender] = useState(null);
  const global = useSelector(({account}) => account);
  const navigation = useNavigation<any>();

  useEffect(() => {
    navigation.setParams({
      hide: true,
    });
  }, []);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const handleGoTo2 = () => {
    if (!Validation('email', email)) {
      dispatch(setLoader(true));
      forgotPassword(email)
        .then(data => {
          console.log('data', data);
          dispatch(setLoader(false));
          navigation.navigate('ForgotPassword2', {email: email});
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

  return (
    <>
      <View style={styles.container}>
        {/* <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          onPress={() => setCurrentPosition(currentPosition + 1)}
        /> */}
        <View style={{paddingTop: 30, paddingBottom: 10}}>
          <Text style={{fontSize: 19, color: '#26669E'}}>Forgot Password</Text>
          {/* <View style={{marginTop: 5, marginBottom: 15}}>
            <Text style={{color: '#26669E'}}>
              Please enter the details of the guardian who created the account
              and completed the registration.The information given will be used
              to help improve the product through statistics and analytics
            </Text>
          </View> */}
        </View>
        <CustomInput
          value={email}
          onChangeText={email => setemail(email)}
          styling={styles.input}
          text={'Your Email'}
        />
        <TouchableOpacity
          onPress={() => {
            setVisibleData(true);
            setOpen(true);
          }}></TouchableOpacity>
        <View style={{marginBottom: 10}}></View>

        <TouchableOpacity onPress={handleGoTo2} style={styles.buttonDown}>
          <View>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
              next
            </Text>
          </View>
        </TouchableOpacity>
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
