import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
} from '../../../api/Profile/ProfileApi';

import {InputUnit} from '../../../components/InputUnit/InputUnit';
import {COLORS} from '../../../styles/Constants';
import {AlertComp} from '../../../components/Alert/AlertComp';
import {useDispatch, useSelector} from 'react-redux';
import {setUserInformation} from '../../../redux/slice/slice';
import checkButton from '../../../assets/images/checkButton.png';
import back from '../../../assets/backOrigin.png';
import moment from 'moment';
import {DatePickerComponent} from '../../../components/DatePicker/DatePicker';
import {RootState} from '../../../redux/configureStore';
import {Gender} from '../../../components/Gender/Gender';
import {Loader} from '../../../components/Loader/Loader';
import {UserInformationSelector} from '../../../redux/selectors/AccountSelector';
import {useIsFocused} from '@react-navigation/native';
interface IUser {
  email?: string;
  name?: string;
  date_of_birth?: string;
  gender?: string;
}
interface IUserChild {
  id: number;
  baby_name?: string;
  baby_date_of_birth?: string;
  baby_gender?: string;
}
const verticalStaticData = [
  {
    id: 0,
    text: 'male',
    isChecked: true,
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
      color: COLORS.text,
      fontFamily: 'AntagometricaBT-Regular',
    },
    checkIconImageSource: checkButton,
    iconImageStyle: {height: 17.2, width: 20.36},
  },
  {
    id: 1,
    text: 'female',
    isChecked: false,
    style: {
      marginLeft: 20,
    },
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
      color: COLORS.text,
      fontFamily: 'AntagometricaBT-Regular',
    },
  },
];
export const Settings = () => {
  const isFocused = useIsFocused();
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  // const global = useSelector(({account}) => account);
  console.log('userrrrrr', user);
  const [valueName, setValueName] = useState(user.name);
  const [valueNameChild, setValueNameChild] = useState(
    user.accounts[0].baby_name,
  );
  console.log('valueNamestart', valueName);
  const [valueEmail, setValueEmail] = useState(user.email);
  const [valueDate, setValueDate] = useState(user.date_of_birth);
  const [valueDateChild, setValueDateChild] = useState(
    user.accounts[0].baby_date_of_birth,
  );
  const [valueGender, setValueGender] = useState<any>(null);
  const [valueGenderChild, setValueGenderChild] = useState<any>(
    user.accounts[0].baby_gender,
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    AlertComp(
      'Are you sure you had like to sign out of your account?',
      'Sign out',
      'Cancel',
      navigation,
    );
  };
  const handleSave = () => {
    console.log('----', valueGender, valueGenderChild);
    // const newUser: IUser = {
    //   ...(valueEmail !== user.email && {email: valueEmail}),
    //   ...(valueName !== user.name && {name: valueName}),
    //   ...(valueDate !== user.date_of_birth && {date: valueDate}),
    //   ...(valueGender !== user.gender && {gender: valueGender}),
    // };
    const newUser: IUser = {
      ...(valueEmail !== user.email && {email: valueEmail}),
      name: valueName,
      date_of_birth: valueDate,
      gender: valueGender,
    };
    // const newChild: IUserChild = {
    //   id: user.accounts[0].id,
    //   ...(valueNameChild !== user.accounts[0].baby_name && {
    //     baby_name: valueNameChild,
    //   }),
    //   ...(valueDateChild !== user.accounts[0].baby_date_of_birth && {
    //     baby_date_of_birth: valueDateChild,
    //   }),
    //   ...(valueGenderChild !== user.accounts[0].baby_gender && {
    //     baby_gender: valueGenderChild,
    //   }),
    // };
    const newChild: IUserChild = {
      id: user.accounts[0].id,
      baby_name: valueNameChild,
      baby_date_of_birth: valueDateChild,
      baby_gender: valueGenderChild,
    };

    console.log('setUserInformation', newUser);
    console.log('setChildInformation', newChild);
    // dispatch(setLoader(true));
    Promise.all([UpdateProfile(newUser), UpdateProfileChild(newChild)])
      .then(async data => {
        console.log('00000000', data[0].data.success);
        const res = await dispatch(setUserInformation(data[0].data.success));
        // dispatch(setLoader(false));
        Alert.alert('Profile settings are updated');
      })
      .catch(({response}) => {
        // dispatch(setLoader(false));
        response.data.error && Alert.alert(response.data.error);
        console.log('xxxxxxx', response.data.message);
      });
  };
  useEffect(() => {
    navigation.setParams({
      test: handleSave,
    });
  }, [
    valueName,
    valueEmail,
    valueDate,
    valueGender,
    valueGenderChild,
    valueDateChild,
  ]);
  useEffect(() => {
    getProfile()
      .then(async ({data}) => {
        console.log('all information about user', data);
        await dispatch(setUserInformation(data.user));
        setValueName(data.user.name);
        setValueNameChild(data.user.accounts[0].baby_name);
        setValueEmail(data.user.email);
        setValueDate(data.user.date_of_birth);
        setValueDateChild(data.user.accounts[0].baby_date_of_birth);
        setValueGender(data.user.gender);
        setValueGenderChild(data.user.accounts[0].baby_gender);
      })
      .catch(err => {
        console.log('what error', err.response.data);
      });
  }, [isFocused]);
  const handleDeleteAcount = () => {
    AlertComp(
      'Are you sure you had like to sign out of your account?',
      'Sign out',
      'Cancel',
      navigation,
      'delete',
    );
  };
  return (
    <ImageBackground source={back} style={{backgroundColor: COLORS.backGround}}>
      <View style={styles.container}>
        <ScrollView style={{paddingTop: 10}}>
          <View style={{paddingHorizontal: 20}}>
            <Text
              style={{
                color: COLORS.text,
                fontSize: 18,
                fontFamily: 'AntagometricaBT-Bold',
              }}>
              Family Account
            </Text>
          </View>
          <View style={{paddingHorizontal: 20, marginVertical: 15}}>
            <Text
              style={{
                color: COLORS.text,
                fontFamily: 'AntagometricaBT-Regular',
              }}>
              Add family members in order to share data and control of the
              devices.
            </Text>
          </View>
          <InputUnit nameOfBox="touch" title={'Manage Family Members'} />
          <View style={{paddingHorizontal: 20, marginVertical: 10}}>
            <Text
              style={{
                color: COLORS.text,
                fontSize: 18,
                fontFamily: 'AntagometricaBT-Bold',
              }}>
              Caregiver Information
            </Text>
          </View>
          <View style={{paddingHorizontal: 20, marginBottom: 10}}>
            <Text
              style={{
                color: COLORS.text,
                fontFamily: 'AntagometricaBT-Regular',
              }}>
              Please enter details of the guardian who created the account and
              completed the registration. The information given will be used to
              help improve the product though statistics and analytics
            </Text>
          </View>
          <InputUnit
            value={valueName}
            setValueName={value => setValueName(value)}
            title={'Your Name'}
            nameField={'Bernie'}
            nameOfBox={'input'}
            placeholder={'Your Name'}
          />
          <InputUnit
            value={valueEmail}
            setValueName={setValueEmail}
            title={'Your Email Address'}
            nameField={'bernie@sweetdreaamers'}
            nameOfBox={'input'}
            placeholder={'Your Email Address'}
          />
          <InputUnit title={'Change Password'} nameOfBox={'touch'} />
          <DatePickerComponent
            type="parent"
            value={valueDate}
            changeDate={date => {
              setValueDate(moment(date).format('YYYY-MM-DD'));
            }}
          />
          <Gender
            initialId={user.gender === 'male' ? 0 : 1}
            type=""
            setValue={setValueGender}
          />
          <View style={{paddingHorizontal: 20}}>
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  color: COLORS.text,
                  fontSize: 18,
                  fontFamily: 'AntagometricaBT-Bold',
                }}>
                Baby profile
              </Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text
                style={{
                  color: COLORS.text,
                  fontFamily: 'AntagometricaBT-Regular',
                }}>
                Please enter details of the baby who will be using the product.
                The information given will be used to help improve your prodyct
                in app experience, as well as the app itself through statistics
                and analytics.
              </Text>
            </View>
          </View>
          <InputUnit
            value={valueNameChild}
            setValueName={value => setValueNameChild(value)}
            title={'Your Name'}
            nameField={'Bernie'}
            nameOfBox={'input'}
            placeholder={'Your Name'}
          />
          <DatePickerComponent
            type="child"
            value={valueDateChild}
            changeDate={date => {
              setValueDateChild(moment(date).format('YYYY-MM-DD'));
            }}
          />
          <Gender
            initialId={user.accounts[0].baby_gender === 'male' ? 0 : 1}
            type="child"
            setValue={setValueGenderChild}
          />

          <View style={{paddingHorizontal: 20, marginVertical: 15}}>
            <Text
              style={{
                color: COLORS.text,
                fontSize: 18,
                fontFamily: 'AntagometricaBT-Bold',
              }}>
              Legal Policy
            </Text>
          </View>
          <InputUnit nameOfBox="touch" title={'Privacy Policy'} />
          <InputUnit nameOfBox="touch" title={'Terms Conditions'} />
          <View style={{paddingHorizontal: 20, marginVertical: 15}}>
            <Text
              style={{
                color: COLORS.text,
                fontSize: 18,
                fontFamily: 'AntagometricaBT-Bold',
              }}>
              App Version 2.1.4
            </Text>
          </View>
          <TouchableOpacity onPress={handleSignOut} style={{marginBottom: 10}}>
            <View style={styles.bottomButtons}>
              <Text
                style={{
                  color: '#CE9B51',
                  fontSize: 18,
                  fontFamily: 'AntagometricaBT-Bold',
                }}>
                sign out
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteAcount}
            style={{marginBottom: 35}}>
            <View style={styles.bottomButtons}>
              <Text
                style={{
                  color: '#CE9B51',
                  fontSize: 18,
                  fontFamily: 'AntagometricaBT-Bold',
                }}>
                delete account
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {global?.loader && <Loader text={'Please wait for Verification'} />}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    // backgroundColor: '#221B36',
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
