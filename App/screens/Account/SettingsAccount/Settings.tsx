import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import arrowRight from '../../../assets/images/settings/arrowRight.png';
import {CustomButton} from '../../../components/CustomButton/CustomButton';
import {CustomInput} from '../../../components/CustomInput/CustomInput';
import {InputUnit} from '../../../components/InputUnit/InputUnit';
import {navigationOptions} from '../../../navigation/routes/AppStackRoutes';
import {COLORS} from '../../../styles/Constants';
import modalIcon from '../../../assets/images/settings/modalIcon/modal.png';
import {AlertComp} from '../../../components/Alert/AlertComp';
import {UpdateProfile} from '../../../api/Profile/ProfileApi';
import {useDispatch, useSelector} from 'react-redux';
import {setUserInformation} from '../../../redux/slice/slice';

import moment from 'moment';
import {DatePickerComponent} from '../../../components/DatePicker/DatePicker';

interface IUser {
  email?: string;
  name?: string;
  date_of_birth?: string;
  gender?: string;
}
const verticalStaticData = [
  {
    id: 0,
    text: 'Male',
    isChecked: true,
    iconStyle: {
      borderColor: '#CCC',
    },
    fillColor: 'transparent',
    unfillColor: 'transparent',
    textStyle: {textDecorationLine: 'none', color: COLORS.text},
  },
  {
    id: 1,
    text: 'Female',
    isChecked: false,
    style: {
      marginLeft: 20,
    },
    iconStyle: {
      borderColor: '#CCC',
    },
    fillColor: 'transparent',
    unfillColor: 'transparent',
    textStyle: {textDecorationLine: 'none', color: COLORS.text},
  },
];
export const Settings = () => {
  const {user} = useSelector(({account}) => account.userInformation);
  console.log('user', user);
  const [valueName, setValueName] = useState(user.name);
  const [valueEmail, setValueEmail] = useState(user.email);
  const [valueDate, setValueDate] = useState(user.date_of_birth);
  // const [valueGender, setValueGender] = useState(user.date_of_birdth);
  const [valueGender, setValueGender] = useState<any>(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log('userrrrrrrrrr', user);
  console.log('valueDate', valueDate);

  const handleSignOut = () => {
    AlertComp(
      'Are you sure you had like to sign out of your account?',
      'Sign out',
      'Cancel',
      navigation,
    );
  };
  const handleSave = () => {
    console.log('----', valueDate);
    const newUser: IUser = {
      ...(valueEmail !== user.email && {email: valueEmail}),
      ...(valueName !== user.name && {name: valueName}),
      ...(valueDate !== user.date_of_birth && {date: valueDate}),
      ...(valueGender !== user.gender && {gender: valueGender}),
    };
    console.log('setUserInformation', newUser);
    UpdateProfile(newUser)
      .then(({data}) => {
        dispatch(setUserInformation(data.success));
        console.log('yes', data.success);
      })
      .catch(err => {
        console.log('err edit', err);
        err.response.data.message && Alert.alert(err.response.data.message);
        err.response.data.error && Alert.alert(err.response.data.error);
      });
  };
  useEffect(() => {
    navigation.setParams({
      test: handleSave,
    });
  }, [valueName, valueEmail, valueDate, valueGender]);
  const handleDeleteAcount = () => {
    AlertComp(
      'Are you sure you had like to sign out of your account?',
      'Sign out',
      'Cancel',
      navigation,
      'delete',
    );
  };
  const Gender = () => {
    return (
      <View style={styles.citizen}>
        <Text
          style={{
            fontSize: 19,
            color: '#2371AB',
          }}>
          EU citizen
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <BouncyCheckboxGroup
            fillColor="red"
            data={verticalStaticData}
            style={{flexDirection: 'row'}}
            onChange={(selectedItem: ICheckboxButton) => {
              selectedItem.id == 0
                ? setValueGender('male')
                : setValueGender('female');
              console.log('SelectedItem: ', JSON.stringify(selectedItem));
            }}
            textStyle={{
              textDecorationLine: 'none',
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{paddingTop: 10}}>
        <View style={{paddingHorizontal: 20}}>
          <Text style={{color: COLORS.text, fontSize: 18}}>Family Account</Text>
        </View>
        <View style={{paddingHorizontal: 20, marginVertical: 15}}>
          <Text style={{color: COLORS.text}}>
            Add family members in order to share data and control of the
            devices.
          </Text>
        </View>
        <InputUnit nameOfBox="touch" title={'Manage Family Members'} />
        <View style={{paddingHorizontal: 20, marginVertical: 10}}>
          <Text style={{color: COLORS.text, fontSize: 18}}>
            Caregiver Information
          </Text>
        </View>
        <View style={{paddingHorizontal: 20, marginBottom: 10}}>
          <Text style={{color: COLORS.text}}>
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
          placeholder={'Your Email Addres'}
        />
        <InputUnit title={'Change Password'} nameOfBox={'touch'} />
        {/* <InputUnit
          value={valueDate}
          setValueName={setValueDate}
          title={'Your Date of Birth'}
          nameField={'bernie@sweetdreaamers'}
          placeholder={'Your Date of Birdth'}
          nameOfBox={'input'}
          rightEl={'9 April 1989'}
          date={truet
        /> */}
        <DatePickerComponent
          value={valueDate}
          changeDate={date => {
            console.log('father date', moment(date).format('YYYY-MM-DD'));
            setValueDate(moment(date).format('YYYY-MM-DD'));
          }}
        />
        <Gender />
        <View style={{paddingHorizontal: 20}}>
          <View style={{marginVertical: 10}}>
            <Text style={{color: COLORS.text, fontSize: 18}}>Baby profile</Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{color: COLORS.text}}>
              Please enter details of the baby who will be using the product.
              The information given will be used to help improve your prodyct in
              app experience, as well as the app itself through statistics and
              analytics.
            </Text>
          </View>
        </View>
        <InputUnit
          title={'Your Name'}
          nameField={'Bernie'}
          nameOfBox={'input'}
          placeholder={'Your Name'}
        />
        <InputUnit
          title={'Your Date of Birth'}
          nameField={'bernie@sweetdreaamers'}
          nameOfBox={'touch'}
          rightEl={'9 April 1989'}
        />
        <Gender />
        <View style={{paddingHorizontal: 20, marginVertical: 15}}>
          <Text style={{color: COLORS.text, fontSize: 18}}>Legal Policy</Text>
        </View>
        <InputUnit nameOfBox="touch" title={'Privacy Policy'} />
        <InputUnit nameOfBox="touch" title={'Terms Conditions'} />
        <View style={{paddingHorizontal: 20, marginVertical: 15}}>
          <Text style={{color: COLORS.text, fontSize: 18}}>
            App Version 2.1.4
          </Text>
        </View>
        <TouchableOpacity onPress={handleSignOut} style={{marginBottom: 10}}>
          <View style={styles.bottomButtons}>
            <Text style={{color: '#CE9B51', fontSize: 18}}>sign out</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteAcount}
          style={{marginBottom: 35}}>
          <View style={styles.bottomButtons}>
            <Text style={{color: '#CE9B51', fontSize: 18}}>delete account</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#221B36',
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
    // width: '100%',
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
