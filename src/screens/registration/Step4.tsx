import React, {useState, useEffect} from 'react';
import moment                       from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerState }         from '../../redux';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';

import BouncyCheckboxGroup       from 'react-native-bouncy-checkbox-group';
import StepIndicator             from 'react-native-step-indicator';
import DatePicker                from 'react-native-date-picker';
import { getCombinedNavigation } from '../../hooks/useUpdateNavigationHeaderOptions';
import {CustomInput}             from '../../components/CustomInput/CustomInput';
import {customStyles}            from '../../components/StepIndicator/StepIndicator';
import {PostChild}               from '../../api/CreateAccount/CreateAccount';
import {Loader}                  from '../../components/Loader/Loader';

import checkButton               from '../../assets/images/checkButton.png';

export const Step4 = ({navigation}) => {
  const { loadingCheckLogin, user } = useSelector((state: RootReducerState) => state.auth);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [visibleData, setVisibleData] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState(null);

  const [loaderSavingBabyData, setLoaderSavingBabyData] = useState(false);

  const verticalStaticData = [
    {
      id: 0,
      value: 'male',
      text: 'boy',
      iconStyle: {
        borderColor: '#CCC',
        borderWidth: 3,
        height: 44,
        width: 44,
        borderRadius: 50,
      },
      fillColor: 'transparent',
      unfillColor: 'transparent',
      textStyle: {
        textDecorationLine: 'none',
        color: '#2371AB',
        fontSize: 19,
        fontFamily: 'AntagometricaBT-Regular',
      },
      checkIconImageSource: checkButton,
      iconImageStyle:{height: 17.2,width: 20.36},
    },
    {
      id: 1,
      value: 'female',
      text: 'girl',
      iconStyle: {
        borderColor: '#CCC',
        borderWidth: 3,
        height: 44,
        width: 44,
        borderRadius: 50,
        marginLeft: 20
      },
      fillColor: 'transparent',
      unfillColor: 'transparent',
      textStyle: {
        textDecorationLine: 'none',
        color: '#2371AB',
        fontSize: 19,
        fontFamily: 'AntagometricaBT-Regular',
      },
      checkIconImageSource: checkButton,
      iconImageStyle:{height: 17.2,width: 20.36},
    },
  ];

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'create new account',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
        headerRightText:   'next',
        headerRightMethod: () => {
          handleSaveBabyData(user?.accounts[0]?.id, name, date, gender);
        },
      })
    )
  }, [navigation]);

  const handleSaveBabyData = (account, name, date, gender) => {
    setLoaderSavingBabyData(true);
    
    if (!name) {
      setLoaderSavingBabyData(false);

      Alert.alert('Name field is required');
    }

    if (!gender) {
      setLoaderSavingBabyData(false);

      Alert.alert('Gender field is required');
    }

    if (name && gender) {
      PostChild(account, name, date, gender).then(res => {
        console.log('[BABY PROFILE] Baby profile response', res);

        setLoaderSavingBabyData(false);

        navigation.navigate('Step5');
      })
      .catch(rej => {
        console.error('[BABY PROFILE] Baby profile request failed', rej);

        setLoaderSavingBabyData(false);

        Alert.alert(rej?.response?.data?.message ? rej?.response?.data?.message : 'Server Error');
      });
    }
  };

  /* Update options on update */
  const refreshNavigation = (account, name, date, gender) => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'create new account',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
        headerRightText:   'next',
        headerRightMethod: () => {
          handleSaveBabyData(account, name, date, gender);
        },
      })
    )
  }

  return (
    <>
      <View style={{ paddingTop: 10, paddingLeft: 19, paddingRight: 29, backgroundColor: '#272A57', height: '100%' }}>
        <StepIndicator customStyles={customStyles} currentPosition={3} />
        <View style={{paddingTop: 30}}>
          <Text style={{ fontSize: 19, color: '#26669E', fontFamily: 'AntagometricaBT-Bold'}}>
            Baby Profile
          </Text>
          <View style={{marginTop: 5, marginBottom: 15}}>
            <Text  style={{color: '#26669E', fontFamily: 'AntagometricaBT-Regular'}}>
              Please enter the details of the guardian who created the account and completed the registration.The information given will be used to help improve the product through statistics and analytics
            </Text>
          </View>
        </View>
        <CustomInput value={name} onChangeText={currentName => {setName(currentName); refreshNavigation(user?.accounts[0]?.id, currentName, date, gender);}} text={'Baby\'s Nickname'} />
        <TouchableOpacity onPress={() => { setOpen(true); setVisibleData(true); }}>
          <View style={styles.darkWrapper}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ fontSize: 19, color: '#2371AB', fontFamily: 'AntagometricaBT-Regular' }}>
                Baby's Date of birth
              </Text>
            </View>
            <Text style={{ color: '#fff', fontSize: 17, fontFamily: 'AntagometricaBT-Regular'}}>
              { visibleData ? moment(date).format('DD-MM-YYYY') : 'DD MM YYYY' }
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{marginBottom: 10}}></View>
        <DatePicker
          maximumDate={new Date()}
          mode="date"
          theme="dark"
          textColor={Platform.OS === 'ios' ? '#fff' : '#000'}
          modal
          open={open}
          date={date}
          onConfirm={currentDate => {
            setOpen(false);
            setDate(currentDate);
            refreshNavigation(user?.accounts[0]?.id, name, currentDate, gender);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <View style={styles.darkWrapper}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{ fontSize: 19, color: '#2371AB', fontFamily: 'AntagometricaBT-Regular'}}>
              <Text style={{color: 'red'}}>*</Text>Gender
            </Text>
          </View>
          <BouncyCheckboxGroup
            fillColor="red"
            data={verticalStaticData}
            style={{flexDirection: 'row'}}
            onChange={selectedItem => {
              setGender(selectedItem.value);
              refreshNavigation(user?.accounts[0]?.id, name, date, selectedItem.value);
            }}
            textStyle={{
              textDecorationLine: 'none',
            }}
          />
        </View>
        <TouchableOpacity onPress={() => {handleSaveBabyData(user?.accounts[0]?.id, name, date, gender);}} style={styles.buttonDown}>
          <View>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', fontFamily: 'AntagometricaBT-Bold'}}>
              next
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {loaderSavingBabyData && <Loader text={`Saving baby's data...`} />}
    </>
  );
};

const styles = StyleSheet.create({
  darkWrapper: {
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
