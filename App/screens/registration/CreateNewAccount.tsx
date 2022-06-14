import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
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
import {Formik} from 'formik';
import * as yup from 'yup';
import {Validation} from '../../components/validation/Validation';

type Nav = {
  navigate: (value: string) => void;
  setParams(value: any);
};

export const CreateNewAccount = () => {
  const verticalStaticData = [
    {
      id: 0,
      text: 'Yes',

      iconStyle: {
        borderColor: '#CCC',
      },
      fillColor: 'transparent',
      unfillColor: 'transparent',
      textStyle: {textDecorationLine: 'none'},
    },
    {
      id: 1,
      text: 'No',
      style: {
        marginLeft: 20,
      },
      iconStyle: {
        borderColor: '#CCC',
      },
      fillColor: 'transparent',
      unfillColor: 'transparent',
      textStyle: {textDecorationLine: 'none'},
    },
  ];

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [citizen, setCitizen] = useState(null);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const navigation = useNavigation<Nav>();
  const isFocused = useIsFocused();

  useEffect(() => {
    Validation('email', email);
    navigation.setParams({
      position: currentPosition,
      setPosition: setCurrentPosition,
      show: true,
      title: 'registration',
      firstScreen: true,
      error: Validation('email', email),
    });
  }, [currentPosition]);

  useEffect(() => {
    currentPosition === 1 && isFocused && setCurrentPosition(0);
  }, [isFocused]);

  let passwordErr = '';
  useEffect(() => {
    navigation.setParams({
      password: password,
      error: Validation('password', password),
    });
  }, [password]);

  useEffect(() => {
    console.log(Validation('email', email));
    navigation.setParams({
      email: email,
      error: Validation('email', email),
    });
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
    });
  }, [privacy]);

  return (
    <ScrollView style={{backgroundColor: '#272755'}}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => Alert.alert(JSON.stringify(values))}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
          password: yup
            .string()
            .min(4)
            .max(10, 'Password should not excced 10 chars.')
            .required(),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View style={styles.container}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              onPress={() => setCurrentPosition(prev => prev + 1)}
            />
            <View style={{marginTop: 20}}>
              <View style={{marginBottom: 7}}>
                <Text style={{fontSize: 19, color: '#244676'}}>
                  Create a Sweet Dreamers Account
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 16, marginBottom: 15, color: '#244676'}}>
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
              {/* {errors.email && (
                <Text style={{color: 'red'}}>dddfsfsdfdsdsd </Text>
              )} */}
              <CustomInput
                value={password}
                onChangeText={name => setPassword(name)}
                styling={styles.input}
                text={'Password'}
                secure={true}
              />
              <View>
                <View>
                  <Text style={{color: '#244676'}}>Accept Terms</Text>
                </View>
                <View style={{marginBottom: 9}}>
                  <Text style={{color: '#244676'}}>
                    To use the SweetDreamers service you need to agree to the
                    terms and conditions by selecting the checkbox.You can see
                    the terms and conditions by selecting the checkbox. You can
                    see the terms and conditions by selecting the show button.
                    {'\n'}EU (European Union) are applicable to General Data
                    Protection Regulation(GDPR){'\n'}
                    (*)is required agreement
                  </Text>
                </View>
              </View>
              <View style={styles.citizen}>
                <Text
                  style={{
                    fontSize: 19,
                    color: '#2371AB',
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
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    value={terms}
                    setValue={value => setTerms(value)}
                    text=""
                  />
                  <Text
                    style={{
                      fontSize: 19,
                      color: '#2371AB',
                    }}>
                    <Text style={{color: 'red'}}>*</Text>Terms & Conditions
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={{color: '#fff', fontSize: 17}}>show</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.citizen}>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    value={privacy}
                    setValue={value => setPrivacy(value)}
                    text=""
                  />
                  <Text
                    style={{
                      fontSize: 19,
                      color: '#2371AB',
                    }}>
                    <Text style={{color: 'red'}}>*</Text> Privacy Policy
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={{color: '#fff', fontSize: 17}}>show</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
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
});
