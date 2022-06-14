import {useNavigation, useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { customStyles } from '../../components/StepIndicator/StepIndicator';

export const Step2 = () => {
  const [currentPosition, setCurrentPosition] = useState(1);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    navigation.setParams({
      position: currentPosition,
      setPosition: setCurrentPosition,
      show: true,
      title: 'registration',
    });
  }, [currentPosition, isFocused]);
  useEffect(() => {
    console.log('ehre',isFocused)
    currentPosition === 2 && isFocused&&setCurrentPosition(1);
  }, [isFocused]);
 
  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        // onPress={() => setCurrentPosition(prev => prev + 1)}
      />
      <View style={styles.emailContainer}>
        <View style={{marginBottom: 19}}>
          <Text style={{color: '#26679F', fontSize: 19}}>
            Please check the verification email
          </Text>
        </View>
        <View style={{marginBottom: 19}}>
          <Text style={{textAlign: 'center', color: '#26679F'}}>
            A verification email was sent to {'\n'}example@example.com
          </Text>
        </View>
        <View style={{width: '130%'}}>
          <Text style={{textAlign: 'center', color: '#26679F'}}>
            Please check and click the authenticate button{'\n'} to move on to
            the next step
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <View style={styles.buttonDown}>
          <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
            resend verification email
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 19,
    paddingRight: 29,
    backgroundColor: '#272650',
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
  emailContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '85%',
  },
  buttonDown: {
    width: '115%',
    marginLeft: -20,
    height: 85,
    justifyContent: 'center',
    backgroundColor: '#1D1A34',
  },
});
