import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {customStyles} from '../../components/StepIndicator/StepIndicator';

type Nav = {
  navigate: (value: string) => void;
};
 
export const Step5 = () => {
  const [currentPosition, setCurrentPosition] = useState(4);
  const navigation = useNavigation<Nav>();

  const handleLastStep = () => {
    navigation.navigate('connection');
  };

  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        onPress={() => setCurrentPosition(prev => prev + 1)}
      />
      <View style={styles.content}>
        <View style={{marginBottom: 13}}>
          <Text style={{color: '#25558C', fontSize: 18}}>
            Welcome to the Sweet Dreamers
          </Text>  
        </View>
        <View style={{marginBottom: 35}}>
          <Text style={{color: '#fff', fontSize: 27}}>
            Mistly the Cloud App
          </Text>
        </View>
        <View>
          <Text style={{color: '#25558C', fontSize: 18, textAlign: 'center'}}>
            Now let`s get your device paired so you can start collecting sleep
            data{' '}
          </Text>
        </View>
      </View>
      <View></View>
      <TouchableOpacity onPress={handleLastStep} style={styles.buttonDown}>
        <View>
          <Text style={{color: '#fff', fontSize: 19, textAlign: 'center'}}>
            done
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
    height: '100%',
    backgroundColor: '#272A57',
  },
  content: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  buttonDown: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '120%',
    marginLeft: -14,
    height: 85,
    justifyContent: 'center',
    backgroundColor: '#1D1A34',
  },
});
