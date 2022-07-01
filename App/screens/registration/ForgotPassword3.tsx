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
import {ChangePassword} from '../../api/ForgotPassword/forgotPassword';

export const ForgotPassword3 = () => {
  const [currentPosition, setCurrentPosition] = useState(2);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [visibleData, setVisibleData] = useState(false);
  const [gender, setGender] = useState(null);
  const global = useSelector(({account}) => account);
  const navigation = useNavigation<any>();
  const [code, setCode] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const verticalStaticData = [
    {
      id: 0,
      text: 'male',
      style: {
        textDecoration: 'none',
      },
      iconStyle: {
        borderColor: '#CCC',
      },
      fillColor: 'transparent',
      unfillColor: 'transparent',
      textStyle: {textDecorationLine: 'none'},
    },
    {
      id: 1,
      text: 'female',
      style: {
        marginLeft: 20,
        textDecorationLine: 'none',
      },
      iconStyle: {
        borderColor: '#CCC',
      },
      fillColor: 'transparent',
      unfillColor: 'transparent',
      textStyle: {textDecorationLine: 'none'},
    },
  ];
  useEffect(() => {
    navigation.setParams({
      hide: true,
    });
  }, []);
  const HandleChangePassword = () => {
    ChangePassword(
      navigation.getState().routes[2].params?.email,
      code,
      confirmCode,
    )
      .then(data => {
        console.log('i am here', data);
      })
      .catch(err => {
        if (err.response.data.message) {
          Alert.alert(err.response.data.message);
          console.log(err.response.data.message);
        } else if (err.response.data.errors) {
          Alert.alert(err.response.data.errors);
        }
      });
  };
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.container}>
        <View style={{paddingTop: 30, paddingBottom: 10}}>
          <Text style={{fontSize: 19, color: '#26669E'}}>Forgot Password</Text>
        </View>
        <CustomInput
          value={code}
          onChangeText={item => setCode(item)}
          styling={styles.input}
          text={'Password'}
        />
        {/* <CustomInput
          value={name}
          onChangeText={name => setName(name)}
          styling={styles.input}
          text={'Password'}
        /> */}
        <CustomInput
          value={confirmCode}
          onChangeText={confirmCode => setConfirmCode(confirmCode)}
          styling={styles.input}
          text={'Confirm Password'}
        />
      

        <TouchableOpacity
          onPress={HandleChangePassword}
          style={styles.buttonDown}>
          <View>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
              Done
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
