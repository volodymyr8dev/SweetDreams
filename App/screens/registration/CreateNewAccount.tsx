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
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import StepIndicator from 'react-native-step-indicator';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import {CheckBox} from '../../components/CheckBox/CheckBox';
import {customStyles} from '../../components/StepIndicator/StepIndicator';
import {Validation} from '../../components/validation/Validation';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../components/Loader/Loader';
import back from '../../assets/images/homeIcon/bacgroundHome.png';
import {COLORS} from '../../styles/Constants';
import {RegistrationUser} from '../../api/CreateAccount/CreateAccount';
import {updateVerifiedEmail} from '../../redux/slice/slice';
import {RootState} from '../../redux/configureStore';
import checkButton from '../../assets/images/checkButton.png'
type Nav = {
  navigate: (value: string) => void;
  setParams(value: any);
};

export const CreateNewAccount = () => {
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
        fontFamily: 'AntagometricaBT-Regular',
      },
      checkIconImageSource: checkButton,
      iconImageStyle:{height: 17.2,width: 20.36},
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
        textDecorationLine: 'none',
        color: '#2371AB',
        fontFamily: 'AntagometricaBT-Regular',
      },
      checkIconImageSource: checkButton,
      iconImageStyle:{height: 17.2,width: 20.36},
    },
  ];
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [citizen, setCitizen] = useState(null);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const state = useSelector(state => state?.account);
  console.log('ssss', state);
  const navigation = useNavigation<Nav>();
  const isFocused = useIsFocused();
  const global = useSelector(({account}: RootState) => account);
  console.log(' global.userInformation.verified', global);
  useEffect(() => {
    navigation.setParams({verified: global.userInformation.verified});
  }, [isFocused]);
  useEffect(() => {
    Validation('email', email);
    navigation.setParams({
      position: currentPosition,
      setPosition: setCurrentPosition,
      show: true,
      title: 'create new account',
      firstScreen: true,
      error: Validation('email', email),
    });
  }, [currentPosition]);

  useEffect(() => {
    currentPosition === 1 && isFocused && setCurrentPosition(0);
  }, [isFocused]);

  useEffect(() => {
    navigation.setParams({
      password: password,
      error: Validation('password', password),
    });
  }, [password]);

  useEffect(() => {
    if (global.email) {
      dispatch(updateVerifiedEmail(false));
      navigation.setParams({
        email: email,
        error: Validation('email', email),
        verified: global.userInformation.verified,
      });
    } else {
      navigation.setParams({
        email: email,
        error: Validation('email', email),
      });
    }
  }, [email]);

  useEffect(() => {
    navigation.setParams({
      citizen: citizen,
    });
  }, [citizen]);

  useEffect(() => {
    navigation.setParams({
      terms: terms,
    });
  }, [terms]);

  useEffect(() => {
    navigation.setParams({
      privacy: privacy,
      dispatch: dispatch,
    });
  }, [privacy]);

  const handleShowPrivacy = () => {
    navigation.navigate('Privacy Policy', {title: 'Privacy Policy'});
  };
  const handleShowTerms = () => {
    navigation.navigate('Terms Conditions', {title: 'Terms & Conditions'});
  };
  return (
    <>
      <ImageBackground
        source={back}
        style={{flex: 1, backgroundColor: COLORS.backGround}}>
        <ScrollView>
          <View style={styles.container}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
            />
            <View style={{marginTop: 20}}>
              <View style={{marginBottom: 7}}>
                <Text style={{fontSize: 19, color: COLORS.textLight, fontFamily: 'AntagometricaBT-Bold'}}>
                  Create a Sweet Dreamers Account
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 15,
                    color: COLORS.textLight,
                    fontFamily: 'AntagometricaBT-Regular'
                  }}>
                  A sweetDreamers account is necessary for using the App
                  services.Fill out the boxes below and select the 'done' button
                  when you're finished
                </Text>
              </View>
              <CustomInput
                value={email}
                onChangeText={name => {
                  console.log('name', name);
                  setEmail(name);
                }}
                styling={styles.input}
                text={'Your email address'}
              />

              <CustomInput
                value={password}
                onChangeText={name => setPassword(name)}
                styling={styles.input}
                text={'Password'}
                secure={true}
              />
              <View>
                <View>
                  <Text style={{color: COLORS.textLight, fontFamily: 'AntagometricaBT-Regular', fontSize: 19, marginBottom: 7}}>Accept Terms</Text>
                </View>
                <View style={{marginBottom: 9}}>
                  <Text style={{color: COLORS.textLight, fontFamily: 'AntagometricaBT-Regular'}}>
                    To use the SweetDreamers service you need to agree to the
                    terms and conditions by selecting the checkbox.You can see
                    the terms and conditions by selecting the checkbox. You can
                    see the terms and conditions by selecting the show button.
                    {'\n'}EU (European Union) are applicable to General Data
                    Protection Regulation(GDPR){'\n'}
                    (<Text style={{color: 'red'}}>*</Text>)is required agreement
                  </Text>
                </View>
              </View>
              <View style={styles.citizen}>
                <Text
                  style={{
                    fontSize: 19,
                    color: '#2371AB',
                    fontFamily: 'AntagometricaBT-Regular',
                  }}>
                  EU citizen
                </Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <BouncyCheckboxGroup
                    fillColor="red"
                    data={verticalStaticData}
                    style={{flexDirection: 'row'}}
                    onChange={(selectedItem: ICheckboxButton) => {
                      selectedItem.id == 0
                        ? setCitizen(true)
                        : setCitizen(false);
                      console.log(
                        'SelectedItem: ',
                        JSON.stringify(selectedItem),
                      );
                    }}
                    textStyle={{
                      textDecorationLine: 'none',
                    }}
                  />
                </View>
              </View>
              <View style={styles.citizen}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CheckBox
                    value={terms}
                    setValue={value => setTerms(value)}
                    text=""
                  />
                  <Text
                    style={{
                      fontSize: 19,
                      color: '#2371AB',
                      fontFamily: 'AntagometricaBT-Regular',
                    }}>
                    <Text style={{color: 'red'}}>*</Text>
                    Terms & Conditions
                  </Text>
                </View>
                <TouchableOpacity onPress={handleShowTerms}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 17,
                      fontFamily: 'AntagometricaBT-Regular',
                    }}>
                    show
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.citizen}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CheckBox
                    value={privacy}
                    setValue={value => setPrivacy(value)}
                    text=""
                  />
                  <Text
                    style={{
                      fontSize: 19,
                      color: '#2371AB',
                      fontFamily: 'AntagometricaBT-Regular',
                    }}>
                    <Text style={{color: 'red'}}>*</Text> Privacy Policy
                  </Text>
                </View>
                <TouchableOpacity onPress={handleShowPrivacy}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 17,
                      fontFamily: 'AntagometricaBT-Regular',
                    }}>
                    show
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        {state.loader && <Loader text={`Please wait...`} />}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 19,
    paddingRight: 29,
    backgroundColor: '#272651',
    height: '100%',
  },
  linearGradient: {},
  input: {
    marginLeft: -20,
    height: 76,
    width: '115%',
    borderRadius: 0,
    backgroundColor: '#201F3F',
    color: '#2371AB',
    fontFamily: 'AntagometricaBT-Regular',
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
});
