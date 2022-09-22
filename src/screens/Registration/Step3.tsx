import React, {useState, useEffect} from 'react';
import moment                       from 'moment';
import BouncyCheckboxGroup          from 'react-native-bouncy-checkbox-group';
import StepIndicator                from 'react-native-step-indicator';
import DatePicker                   from 'react-native-date-picker';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  ImageBackground
} from 'react-native';

import {getCombinedNavigation} from '../../hooks/useUpdateNavigationHeaderOptions';
import {CustomInput}           from '../../components/CustomInput/CustomInput';
import {customStyles}          from '../../components/StepIndicator/StepIndicator';
import {PostCaregiver}         from '../../api/CreateAccount/CreateAccount';
import {Loader}                from '../../components/Loader/Loader';
import {COLORS}                from '../../styles/Constants';

import checkButton             from '../../assets/images/checkButton.png';
import background              from '../../assets/images/homeIcon/backgroundHome.png';

export const Step3 = ({navigation}) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState(null);
  const [open, setOpen] = useState(false);
  const [visibleData, setVisibleData] = useState(false);
  
  const [loaderSavingProfileData, setLoaderSavingProfileData] = useState(false);

  const verticalStaticData = [
    {
      id: 0,
      text: 'male',
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
      text: 'female',
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
        headerRightText:   'next',
        headerRightMethod: () => {
          handleSaveProfileData(name, date, gender);
        },
      })
    )
  }, [navigation]);

  const handleSaveProfileData = (name, date, gender) => {
    setLoaderSavingProfileData(true);
    
    if (!gender) {
      setLoaderSavingProfileData(false);

      Alert.alert('Gender field is required');
    }

    if (gender) {
      PostCaregiver(name, date, gender).then(res => {
        console.log('[CAREGIVER PROFILE] Caregiver profile response', res);

        setLoaderSavingProfileData(false);

        navigation.navigate('Step4');
      })
      .catch(rej => {
        console.error('[CAREGIVER PROFILE] Caregiver profile request failed', rej);

        setLoaderSavingProfileData(false);

        Alert.alert(rej?.response?.data?.message ? rej?.response?.data?.message : 'Server Error');
      });
    }
  };

  /* Update options on update */
  const refreshNavigation = (name, date, gender) => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'create new account',
        headerRightText:   'next',
        headerRightMethod: () => {
          handleSaveProfileData(name, date, gender);
        },
      })
    )
  }

  return (
    <ImageBackground source={background} style={{flex: 1, backgroundColor: COLORS.backGround}}>
      <View style={{paddingTop: 10, paddingLeft: 19, paddingRight: 29, height: '100%'}}>
        <StepIndicator customStyles={customStyles} currentPosition={2} />
        <View style={{paddingTop: 30}}>
          <Text style={{fontSize: 19, color: '#26669E', fontFamily: 'AntagometricaBT-Bold'}}>
            Caregiver Information
          </Text>
          <View style={{marginTop: 5, marginBottom: 15}}>
            <Text style={{color: '#26669E', fontFamily: 'AntagometricaBT-Regular'}}>
              Please enter the details of the guardian who created the account and completed the registration. The information given will be used to help improve the product through statistics and analytics
            </Text>
          </View>
        </View>
        <CustomInput value={name} onChangeText={currentName => {setName(currentName); refreshNavigation(currentName, date, gender);}} text={'Your Name'} />
        <TouchableOpacity onPress={() => { setVisibleData(true); setOpen(true); }}>
          <View style={styles.darkWrapper}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 19, color: '#2371AB', fontFamily: 'AntagometricaBT-Regular'}}>
                Your Date of Birth
              </Text>
            </View>
            <Text style={{color: '#fff', fontSize: 18, fontFamily: 'AntagometricaBT-Regular'}}>
              {visibleData ? moment(date).format('DD MMMM YYYY') : 'DD MM YYYY'}
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
            refreshNavigation(name, currentDate, gender);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={styles.darkWrapper}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 19, color: '#2371AB', fontFamily: 'AntagometricaBT-Regular'}}>
              <Text style={{color: 'red'}}>*</Text>Gender
            </Text>
          </View>
          <BouncyCheckboxGroup
            fillColor="red"
            data={verticalStaticData}
            style={{flexDirection: 'row'}}
            onChange={selectedItem => {
              setGender(selectedItem.text);
              refreshNavigation(name, date, selectedItem.text);
            }}
            textStyle={{
              textDecorationLine: 'none',
            }}
          />
        </View>
        <TouchableOpacity style={styles.buttonDown} onPress={() => {handleSaveProfileData(name, date, gender);}}>
          <View>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', fontFamily: 'AntagometricaBT-Bold'}}>
              next
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {loaderSavingProfileData && <Loader text={'saving profile...'} />}
    </ImageBackground>
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
