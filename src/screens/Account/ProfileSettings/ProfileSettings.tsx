import React, {useEffect, useState} from 'react';
import DeviceInfo                   from 'react-native-device-info';
import {useDispatch, useSelector}   from 'react-redux';
import moment                       from 'moment';
import AsyncStorage                 from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';

import {
  getProfile,
  UpdateProfile,
  UpdateProfileChild,
} from '../../../api/Profile/Profile';

import {RootReducerState}      from '../../../redux';
import {getCombinedNavigation} from '../../../hooks/useUpdateNavigationHeaderOptions';
import {checkLogin}            from '../../../redux/slices/auth';

import {InputUnit}             from '../../../components/InputUnit/InputUnit';
import {COLORS}                from '../../../styles/Constants';

import {Logout, DeleteAccount} from '../../../api/Login/Login';

import background              from '../../../assets/backOrigin.png';

import {DatePickerComponent}   from '../../../components/DatePicker/DatePicker';
import {Gender}                from '../../../components/Gender/Gender';
import {Loader}                from '../../../components/Loader/Loader';

export const ProfileSettings = ({navigation}) => {
  const dispatch = useDispatch();
  
  const {user} = useSelector((state: RootReducerState) => state.auth);

  const [loaderSavingProfile,   setLoaderSavingProfile]   = useState(false);
  const [loaderSigningOut,      setLoaderSigningOut]      = useState(false);
  const [loaderDeletingAccount, setLoaderDeletingAccount] = useState(false);

  const [version, setVersion] = useState(DeviceInfo.getVersion());
  const [build, setBuild]     = useState(DeviceInfo.getBuildNumber());

  const [valueEmail,       setValueEmail]       = useState(user.email);
  const [valueName,        setValueName]        = useState<any>(user.name);
  const [valueNameChild,   setValueNameChild]   = useState<any>(user.accounts[0].baby_name);
  const [valueDate,        setValueDate]        = useState<any>(user.date_of_birth);
  const [valueDateChild,   setValueDateChild]   = useState<any>(user.accounts[0].baby_date_of_birth);
  const [valueGender,      setValueGender]      = useState<any>(user.gender);
  const [valueGenderChild, setValueGenderChild] = useState<any>(user.accounts[0].baby_gender);

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'profile / preferences',
        headerLeftMethod: undefined,
        headerRightText:   'save  ',
        headerRightMethod: () => {
          handleSave(valueName, valueEmail, valueDate, valueGender, valueNameChild, valueDateChild, valueGenderChild);
        },
      })
    )
  }, [navigation]);

  useEffect(() => {
    getProfile().then(async ({data}) => {
      setValueName(data.user.name);
      setValueNameChild(data.user.accounts[0].baby_name);
      setValueEmail(data.user.email);
      setValueDate(data.user.date_of_birth);
      setValueDateChild(data.user.accounts[0].baby_date_of_birth);
      setValueGender(data.user.gender);
      setValueGenderChild(data.user.accounts[0].baby_gender);

      refreshNavigation(
        data.user.name,
        data.user.email,
        data.user.date_of_birth,
        data.user.gender,
        data.user.accounts[0].baby_name,
        data.user.accounts[0].baby_date_of_birth,
        data.user.accounts[0].baby_gender
      )
    });
  }, []);

  const handleSignOut = () => {
    Alert.alert(
      'Are you use you\'d like to sign out of your account?',
      '',
      [{
        text: 'Sign out',
        onPress: () => {
          setLoaderSigningOut(true);

          Logout().then(async () => {
            console.log('[LOGOUT] Logout response');

            await AsyncStorage.clear();

            setLoaderSigningOut(false);

            dispatch(checkLogin());
          }).catch(async(err) => {
            console.error('[LOGOUT] There is a problem with logging out from an account');

            await AsyncStorage.clear();
            
            setLoaderSigningOut(false);

            dispatch(checkLogin());
          });
        }
      },
      {
        text: 'No', onPress: () => {}
      },
    ]);
  };

  const handleDeleteAcount = () => {
    Alert.alert(
      'Are you use you\'d like to delete your account? This action is permanent',
      '',
      [{
        text: 'Delete',
        onPress: () => {
          setLoaderDeletingAccount(true);

          DeleteAccount().then(async () => {
            console.log('[DELETE ACCOUNT] Logout response');

            await AsyncStorage.clear();

            setLoaderDeletingAccount(false);

            dispatch(checkLogin());
          }).catch(async(err) => {
            console.error('[DELETE ACCOUNT] There is a problem with deleting an account');
            
            setLoaderDeletingAccount(false);
          });
        }
      },
      {
        text: 'No', onPress: () => {}
      },
    ]);
  };

  /* Update options on update */
  const refreshNavigation = (name, email, dateOfBirth, gender, babyName, babyDateOfBirth, babyGender) => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'profile / preferences',
        headerLeftMethod: undefined,
        headerRightText:   'save  ',
        tabBarStyle: {
          backgroundColor: 'rgba(52, 52, 90, 0.97)',
        },
        headerRightMethod: () => {
          handleSave(name, email, dateOfBirth, gender, babyName, babyDateOfBirth, babyGender);
        },
      })
    )
  }

  const handleSave = (name, email, dateOfBirth, gender, babyName, babyDateOfBirth, babyGender) => {
    setLoaderSavingProfile(true);

    let req = {
      name:          name,
      date_of_birth: dateOfBirth,
      gender:        gender,
    };

    if (user.email != email) {
      req.email = email
    }
    
    Promise.all([
      UpdateProfile(req),
      UpdateProfileChild({
        id:                 user.accounts[0].id,
        baby_name:          babyName,
        baby_date_of_birth: babyDateOfBirth,
        baby_gender:        babyGender,
      })
    ]).then(res => {
      console.log('[PROFILE] Profile response', res);

      setLoaderSavingProfile(false);

      Alert.alert('Profile settings are updated');
    }).catch(rej => {
      console.error('[PROFILE] Profile request failed', rej);

      setLoaderSavingProfile(false);

      Alert.alert(rej?.response?.data?.message ? rej?.response?.data?.message : 'Server Error');
    });
  };

  return (
    <ImageBackground source={background} style={{backgroundColor: COLORS.back, flex: 1}}>
      <View style={styles.container}>
        <ScrollView style={{paddingTop: 20}}>
          <View style={{paddingHorizontal: 20}}>
            <Text style={{color: COLORS.text, fontSize: 18, fontFamily: 'AntagometricaBT-Bold'}}>
              Family Account
            </Text>
          </View>
          <View style={{paddingHorizontal: 20, marginVertical: 15}}>
            <Text style={{color: COLORS.text, fontFamily: 'AntagometricaBT-Regular'}}>
              Add family members in order to share data and control of the devices.
            </Text>
          </View>
          <InputUnit
            nameOfBox="touch"
            title={'Manage Family Members'}
            rightArrow={true}
          />
          <View style={{paddingHorizontal: 20, marginVertical: 10}}>
            <Text style={{color: COLORS.text, fontSize: 18, fontFamily: 'AntagometricaBT-Bold'}}>
              Caregiver Information
            </Text>
          </View>

          <View style={{paddingHorizontal: 20, marginBottom: 10}}>
            <Text style={{color: COLORS.text, fontFamily: 'AntagometricaBT-Regular' }}>
              Please enter details of the guardian who created the account and completed the registration. The information given will be used to  help improve the product though statistics and analytics
            </Text>
          </View>
          <InputUnit
            value={valueName}
            setValueName={currentName => {
              setValueName(currentName);
              refreshNavigation(currentName, valueEmail, valueDate, valueGender, valueNameChild, valueDateChild, valueGenderChild);
            }}
            title={'Your Name'}
            nameField={'Bernie'}
            nameOfBox={'input'}
            placeholder={'Your Name'}
          />
          <InputUnit
            value={valueEmail}
            setValueName={currentEmail => {
              setValueEmail(currentEmail);
              refreshNavigation(valueName, currentEmail, valueDate, valueGender, valueNameChild, valueDateChild, valueGenderChild);
            }}
            title={'Your Email Address'}
            nameField={'bernie@sweetdreamers.com'}
            nameOfBox={'input'}
            placeholder={'Your Email Address'}
          />
          <InputUnit
            title={'Change Password'}
            nameOfBox={'touch'}
            rightEl={'save'}
            rightArrow={true}
          />
          <DatePickerComponent
            mode="date"
            name="Your Date of Birth"
            value={valueDate}
            changeDate={date => {
              setValueDate(moment(date).format('YYYY-MM-DD'));
              refreshNavigation(valueName, valueEmail, moment(date).format('YYYY-MM-DD'), valueGender, valueNameChild, valueDateChild, valueGenderChild);
            }}
          />
          <Gender
            initialId={user.gender === 'male' ? 0 : 1}
            type=""
            setValue={currentGender => {
              setValueGender(currentGender);
              refreshNavigation(valueName, valueEmail, valueDate, currentGender, valueNameChild, valueDateChild, valueGenderChild);
            }}
          />
          <View style={{paddingHorizontal: 20}}>
            <View style={{marginVertical: 10}}>
              <Text style={{color: COLORS.text, fontSize: 18, fontFamily: 'AntagometricaBT-Bold'}}>
                Baby profile
              </Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={{color: COLORS.text, fontFamily: 'AntagometricaBT-Regular'}}>
                Please enter details of the baby who will be using the product. The information given will be used to help improve your product in app experience, as well as the app itself through statistics and analytics.
              </Text>
            </View>
          </View>
          <InputUnit
            value={valueNameChild}
            setValueName={currentChildName => {
              setValueNameChild(currentChildName);
              refreshNavigation(valueName, valueEmail, valueDate, valueGender, currentChildName, valueDateChild, valueGenderChild);
            }}
            nameOfBox={'input'}
            placeholder={"Baby's Nickname"}
          />
          <DatePickerComponent
            mode="date"
            type="Baby's Date of Birth"
            value={valueDateChild}
            changeDate={date => {
              setValueDateChild(moment(date).format('YYYY-MM-DD'));
              refreshNavigation(valueName, valueEmail, valueDate, valueGender, valueNameChild, moment(date).format('YYYY-MM-DD'), valueGenderChild);
            }}
          />
          <Gender
            initialId={user.accounts[0].baby_gender === 'male' ? 0 : 1}
            type="child"
            setValue={
              currentGenderChild => {
                setValueGenderChild(currentGenderChild);
                refreshNavigation(valueName, valueEmail, valueDate, valueGender, valueNameChild, valueDateChild, currentGenderChild);
              }}
          />

          <View style={{paddingHorizontal: 20, marginVertical: 15}}>
            <Text style={{color: COLORS.text, fontSize: 18, fontFamily: 'AntagometricaBT-Bold'}}>
              Legal Policy
            </Text>
          </View>
          <InputUnit nameOfBox="touch" title={'Privacy Policy'} />
          <InputUnit nameOfBox="touch" title={'Terms Conditions'} />
          <View style={{paddingHorizontal: 20, marginVertical: 15}}>
            <Text style={{color: COLORS.text, fontSize: 18, fontFamily: 'AntagometricaBT-Bold' }}>
              App Version {version} ({build})
            </Text>
          </View>
          <TouchableOpacity onPress={handleSignOut} style={{marginBottom: 10}}>
            <View style={styles.bottomButtons}>
              <Text style={{color: '#CE9B51', fontSize: 18, fontFamily: 'AntagometricaBT-Bold'}}>
                sign out
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteAcount} style={{marginBottom: 35}}>
            <View style={styles.bottomButtons}>
              <Text style={{color: '#CE9B51', fontSize: 18, fontFamily: 'AntagometricaBT-Bold'}}>
                delete account
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {loaderSavingProfile && <Loader text={'saving profile...'} />}
      {loaderSigningOut && <Loader text={'signing out...'} />}
      {loaderDeletingAccount && <Loader text={'deleting account...'} />}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: 200,
    backgroundColor: 'opacity',
    borderWidth: 1,
    borderColor: '#2A70AA',
  },
  box: {
    height: 66,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.backGround,
    width: '100%',
    marginBottom: 7,
  },
  input: {
    marginBottom: 7,
    height: 66,
    borderRadius: 0,
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  citizen: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 6,
    paddingHorizontal: 19,
    backgroundColor: COLORS.backGround,
    width: '100%',
    height: 76,
  },
  bottomButtons: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.backGround,
    justifyContent: 'center',
    alignItems: 'center',
    height: 66,
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    top: 20,
  },
});
