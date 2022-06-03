import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {CustomInput} from '../components/CustomInput/CustomInput';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { CheckBox } from '../components/CheckBox/CheckBox';
export const CreateNewAccount = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const Progress = () => {
    return (
      <View>
        <ProgressSteps>
          <ProgressStep
            onNext={() => {
              console.log('hereeeee');
            }}
            label="First Step">
            <View style={{alignItems: 'center'}}>
              <Text>This is the content within step 1!</Text>
            </View>
          </ProgressStep>
          <ProgressStep label="Second Step">
            <View style={{alignItems: 'center'}}>
              <Text>This is the content within step 2!</Text>
            </View>
          </ProgressStep>
          <ProgressStep label="Third Step">
            <View style={{alignItems: 'center'}}>
              <Text>This is the content within step 3!</Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>createNewAccount</Text>
      {<Progress />}
      <View style={{marginTop: 100}}>
        <View style={{marginBottom: 7}}>
          <Text style={{fontSize: 19}}>Create a Sweet Dreamers Account</Text>
        </View>
        <View>
          <Text style={{fontSize: 16, marginBottom: 15}}>
            A sweetDreamers account is necessary for using the App services.Fill
            out the boxes below and select the 'done' button when you're
            finished
          </Text>
        </View>
        <CustomInput styling={styles.input} text={'Your email Addrees'} />
        <CustomInput styling={styles.input} text={'Password'} />
        <View>
          <View>
            <Text>Accept Terms</Text>
          </View>
          <View style={{marginBottom: 12}}>
            <Text>
              To use the SweetDreamers service you need to agree to the terms
              and conditions by selecting the checkbox.You can see the terms and
              conditions by selecting the checkbox. You can see the terms and
              conditions by selecting the show button.{'\n'}EU (European Union)
              are applicable to General Data Protection Regulation(GDPR){'\n'}
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
            Eu Citizen
          </Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <CheckBox />
            <CheckBox />
          </View>
        </View>
        <View style={styles.citizen}>
          <CheckBox />
          <Text
            style={{
              fontSize: 19,
              color: '#2371AB',
            }}>
            Eu Citizen
          </Text>
        </View>
        <View style={styles.citizen}>
          <CheckBox />

          <Text
            style={{
              fontSize: 19,
              color: '#2371AB',
            }}>
            Eu Citizen
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 19,
    paddingRight: 29,
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
    flexDirection: 'row',
    marginTop: 7,
    justifyContent: 'center',
    paddingHorizontal: 19,
    marginLeft: -20,
    backgroundColor: '#201F3F',
    width: '115%',
    height: 76,
  },
});
