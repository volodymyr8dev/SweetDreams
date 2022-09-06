import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { getCombinedNavigation }              from '../../hooks/useUpdateNavigationHeaderOptions';
import StepIndicator                          from 'react-native-step-indicator';
import BouncyCheckboxGroup, {ICheckboxButton} from 'react-native-bouncy-checkbox-group';
import {CustomInput}                          from '../../components/CustomInput/CustomInput';
import {CheckBox}                             from '../../components/CheckBox/CheckBox';
import {customStyles}                         from '../../components/StepIndicator/StepIndicator';
import {Loader}                               from '../../components/Loader/Loader';
import {COLORS}                               from '../../styles/Constants';
import {RegistrationUser}                     from '../../api/CreateAccount/CreateAccount';
import checkButton                            from '../../assets/images/checkButton.png';
import background                             from '../../assets/images/homeIcon/backgroundHome.png';

export const CreateNewAccount = ({navigation}) => {
  const verticalStaticData = [
    {
      id: 0,
      text: 'yes',
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
      iconImageStyle: {height: 17.2, width: 20.36},
    },
    {
      id: 1,
      text: 'no',
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
        color: '#2371AB',
        fontSize: 19,
        textDecorationLine: 'none',
        color: '#2371AB',
        fontFamily: 'AntagometricaBT-Regular',
      },
      checkIconImageSource: checkButton,
      iconImageStyle: {height: 17.2, width: 20.36},
    },
  ];

  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'create new account',
        headerLeftMethod: () => {
          navigation.goBack();
        },
        headerRightText:   'done',
        headerRightMethod: () => {
          handleCreateAccount(email, password, citizen, terms, privacy)
        },
      })
    )
  }, [navigation]);

  const handleNavigationUpdate = (email, password, citizen, terms, privacy) => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'create new account',
        headerLeftMethod: () => {
          navigation.goBack();
        },
        headerRightText:   'done',
        headerRightMethod: () => {
          handleCreateAccount(email, password, citizen, terms, privacy)
        },
      })
    )
  }

  const [loaderCreateAccount, setLoaderCreateAccount] = useState(false);

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [citizen, setCitizen]   = useState(null);
  const [terms, setTerms]       = useState(false);
  const [privacy, setPrivacy]   = useState(false);

  const handleShowPrivacy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleShowTerms = () => {
    navigation.navigate('TermsConditions');
  };

  const handleCreateAccount = (email, password, citizen, terms, privacy) => {
    setLoaderCreateAccount(true);

    RegistrationUser({email, password, citizen, terms, privacy}).then(res => {
      console.info('[CREATE ACCOUNT] Create account response', res);

      setLoaderCreateAccount(false);

      navigation.navigate('Step2', {email});
    })
    .catch(rej => {
      console.error('[CREATE ACCOUNT] Create account request failed', rej);

      setLoaderCreateAccount(false);

      Alert.alert(rej?.response?.data?.message ? rej?.response?.data?.message : 'Server Error');
    });
  };
  
  return (
    <>
      <ImageBackground source={background} style={{flex: 1, backgroundColor: COLORS.backGround}}>
        <ScrollView>
          <View style={{paddingTop: 10, paddingLeft: 19, paddingRight: 29, height: '100%' }}>
            <StepIndicator customStyles={customStyles} currentPosition={0} />
            <View style={{marginTop: 20}}>
              <View style={{marginBottom: 7}}>
                <Text style={{fontSize: 19, color: COLORS.textLight, fontFamily: 'AntagometricaBT-Bold'}}>
                  Create a Sweet Dreamers Account
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 16, marginBottom: 15, color: COLORS.textLight, fontFamily: 'AntagometricaBT-Regular'}}>
                  A SweetDreamers account is necessary for using the App
                  services. Fill out the boxes below and select the 'done' button
                  when you're finished
                </Text>
              </View>
              <CustomInput value={email} onChangeText={currentEmail => {setEmail(currentEmail); handleNavigationUpdate(currentEmail, password, citizen, terms, privacy);}} text={'Your Email Address'} />
              <CustomInput value={password} onChangeText={currentPassword => {setPassword(currentPassword); handleNavigationUpdate(email, currentPassword, citizen, terms, privacy);}} text={'Password'} secure={true} />
              <View>
                <View>
                  <Text style={{fontSize: 19, color: COLORS.textLight, fontFamily: 'AntagometricaBT-Bold', marginBottom: 10}}>Accept Terms</Text>
                </View>
                <View style={{marginBottom: 9}}>
                  <Text style={{ color: COLORS.textLight, fontFamily: 'AntagometricaBT-Regular'}}>
                    To use the SweetDreamers service you need to agree to the terms and conditions by selecting the checkbox. You can see the terms and conditions by selecting the checkbox. You can see the terms and conditions by selecting the show button. {'\n'}EU (European Union) are applicable to General Data Regulation(GDPR){'\n'} (<Text style={{color: 'red'}}>*</Text>)is required agreement
                  </Text>
                </View>
              </View>
              <View style={styles.darkWrapper}>
                <Text style={{fontSize: 19, color: '#2371AB', fontFamily: 'AntagometricaBT-Regular'}}>
                  EU citizen
                </Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <BouncyCheckboxGroup
                    fillColor="red"
                    data={verticalStaticData}
                    style={{flexDirection: 'row'}}
                    onChange={(selectedItem: ICheckboxButton) => {setCitizen(selectedItem.id == 0 ? true : false); handleNavigationUpdate(email, password, selectedItem.id == 0 ? true : false, terms, privacy);}}
                    textStyle={{textDecorationLine: 'none'}}
                  />
                </View>
              </View>
              <View style={styles.darkWrapper}>
                <View style={{flexDirection: 'row', marginLeft: -12}}>
                  <CheckBox value={terms} setValue={value => {setTerms(value); handleNavigationUpdate(email, password, citizen, value, privacy);}} text="" />
                  <Text style={{fontSize: 19, color: '#2371AB', fontFamily: 'AntagometricaBT-Regular', marginTop: 10, marginLeft: 10}}>
                    <Text style={{color: 'red'}}>*</Text>
                    Terms & Conditions
                  </Text>
                </View>
                <TouchableOpacity onPress={handleShowTerms}>
                  <Text style={{color: '#fff', fontSize: 17, fontFamily: 'AntagometricaBT-Regular'}}>
                    show
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.darkWrapper}>
                <View style={{flexDirection: 'row', marginLeft: -12}}>
                  <CheckBox value={privacy} setValue={value => {setPrivacy(value); handleNavigationUpdate(email, password, citizen, terms, value);}} text="" />
                  <Text style={{fontSize: 19, color: '#2371AB', fontFamily: 'AntagometricaBT-Regular', marginTop: 10, marginLeft: 10}}>
                    <Text style={{color: 'red'}}>*</Text>Privacy Policy
                  </Text>
                </View>
                <TouchableOpacity onPress={handleShowPrivacy}>
                  <Text style={{ color: '#fff', fontSize: 17, fontFamily: 'AntagometricaBT-Regular'}}>
                    show
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        {loaderCreateAccount && <Loader text={'creating the account...'} />}
      </ImageBackground>
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
});
