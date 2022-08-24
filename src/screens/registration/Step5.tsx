import React, {useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground

} from 'react-native';

import StepIndicator           from 'react-native-step-indicator';
import {customStyles}          from '../../components/StepIndicator/StepIndicator';
import {getCombinedNavigation} from '../../hooks/useUpdateNavigationHeaderOptions';
import {COLORS}                from '../../styles/Constants';

import owl                     from '../../assets/images/owl2.png';
import background              from '../../assets/images/homeIcon/backgroundHome.png';

export const Step5 = ({navigation}) => {
   /* Set default navigation options */
   useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'create new account',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
      })
    )
  }, [navigation]);

  const handleLastStep = async () => {
    navigation.navigate('Connection');
  };

  return (
    <ImageBackground source={background} style={{flex: 1, backgroundColor: COLORS.backGround}}>
      <View style={{paddingTop: 10, paddingLeft: 19, paddingRight: 29, height: '100%'}}>
        <StepIndicator customStyles={customStyles} currentPosition={4} />
        <View style={{  height: '80%', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
          <View style={{marginBottom: 13}}>
            <Text style={{color: '#25558C', fontSize: 18, fontFamily: 'AntagometricaBT-Regular'}}>
              Welcome to the Sweet Dreamers
            </Text>
          </View>
          <View style={{alignItems: 'center', fontSize: 27, marginBottom: 17}}>
            <Image style={{width: 150, height: 190, resizeMode: 'contain'}} source={owl} />

            <Text style={{fontSize: 27, color: '#fff', fontFamily: 'AntagometricaBTLight-Regular'}}>
              Misty The Cloud <Text style={{fontWeight: 'bold', fontFamily: 'AntagometricaBT-Bold'}}>App</Text>
            </Text>
          </View>
          <View>
            <Text style={{color: '#25558C', fontSize: 18,  textAlign: 'center', fontFamily: 'AntagometricaBT-Regular'}}>
              Now let's get your device paired so you can start collecting sleep data{' '}
            </Text>
          </View>
        </View>
        <View></View>
        <TouchableOpacity onPress={handleLastStep} style={styles.buttonDown}>
          <View>
            <Text style={{color: '#fff', fontSize: 19, textAlign: 'center', fontFamily: 'AntagometricaBT-Bold'}}>
              done
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
