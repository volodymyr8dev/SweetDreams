import {useNavigation, useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Button,
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

export const Step3 = () => {
  const [currentPosition, setCurrentPosition] = useState(2);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [visibleData, setVisibleData] = useState(false);
  const [gender, setGender] = useState(null);

  const navigation = useNavigation();

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

  const isFocused = useIsFocused();

  const handleGoTo4 = () => {
    if (!Validation('date', date)) {
      navigation.navigate('step3');
    }else {
      Alert.alert(Validation('date', date))
    }
  };

  useEffect(() => {
    navigation.setParams({
      position: currentPosition,
      setPosition: setCurrentPosition,
    });
  }, [currentPosition, isFocused]);

  return (
    <View style={styles.container}>
      <>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          // onPress={() => setCurrentPosition(currentPosition + 1)}
        />
        <View style={{paddingTop: 30}}>
          <Text style={{fontSize: 19, color: '#26669E'}}>
            Caregiver Information
          </Text>
          <View style={{marginTop: 5, marginBottom: 15}}>
            <Text style={{color: '#26669E'}}>
              Please enter the details of the guardian who created the account
              and completed the registration.The information given will be used
              to help improve the product through statistics and analytics
            </Text>
          </View>
        </View>
        <CustomInput
          value={name}
          onChangeText={name => setName(name)}
          styling={styles.input}
          text={'Your Name'}
        />
        <TouchableOpacity
          onPress={() => {
            setVisibleData(true);
            setOpen(true);
          }}>
          <View style={styles.citizen}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 19,
                  color: '#2371AB',
                }}>
                {visibleData
                  ? moment(date).format('DD-MM-YYYY')
                  : 'Baby`s Date of Birth'}
              </Text>
            </View>
            <Text style={{color: '#fff', fontSize: 17}}>DD MM YYYY</Text>
          </View>
        </TouchableOpacity>
        <View style={{marginBottom: 10}}></View>
        <DatePicker
          maximumDate={new Date()}
          mode="date"
          theme="dark"
          textColor="#fff"
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={styles.citizen}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 19,
                color: '#2371AB',
              }}>
              <Text style={{color: 'red'}}>*</Text>Gender
            </Text>
          </View>
          <BouncyCheckboxGroup
            fillColor="red"
            data={verticalStaticData}
            style={{flexDirection: 'row'}}
            onChange={selectedItem => {
              setGender(selectedItem.text);
            }}
            textStyle={{
              textDecorationLine: 'none',
            }}
          />
        </View>
        <TouchableOpacity onPress={handleGoTo4} style={styles.buttonDown}>
          <View>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
              next
            </Text>
          </View>
        </TouchableOpacity>
      </>
    </View>
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
