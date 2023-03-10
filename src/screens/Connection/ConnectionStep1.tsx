import React, {useEffect} from 'react';
import StepIndicator from 'react-native-step-indicator';

import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import {customStyles}          from '../../components/StepIndicator/StepIndicator';
import {getCombinedNavigation} from '../../hooks/useUpdateNavigationHeaderOptions';
import {COLORS}                from '../../styles/Constants';

import background              from '../../assets/backOrigin.png';

export const ConnectionStep1 = ({navigation}) => {
  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'connect misty',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
      })
    )
  }, [navigation]);

  const handleGoToStep2 = () => {
    navigation.navigate('ConnectionStep2');
  };

  return (
    <ImageBackground style={{backgroundColor: COLORS.backGround, flex: 1}} source={background}>
      <ScrollView>
        <View style={styles.container}>
          <StepIndicator stepCount={3} customStyles={customStyles} currentPosition={0} />
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              before you connect you will need:
            </Text>
            <Text style={styles.cardList}>
              {'\u2022'} A good Wi-Fi connection.
            </Text>
            <Text style={styles.cardListInfo}>
              We suggest moving your misty closer to your router during set up.
              She'll remember all your credentials if you wish to relocate her
              to the bedroom or nursery.
            </Text>
            <Text style={styles.cardList}>
              {'\u2022'} Your Wi-Fi password and name.
            </Text>
            <Text style={styles.cardListInfo}>
              You can normally find these on the back of the router itself, or
              on a little sticker within the Wi-Fi welcome pack.
            </Text>
          </View>
          <View>
            <Text style={styles.question}>how long is this going to take?</Text>
            <Text style={styles.answer}>
              The connection process will take approximately 5 minutes.
            </Text>
            <Text style={styles.question}>is misty ready for connection?</Text>
            <Text style={styles.answer}>
              Please plug misty into the mains power.{'\n'}She will{' '}
              <Text
                style={{color: '#CA57E7', fontFamily: 'AntagometricaBT-Bold'}}>
                flash purple
              </Text>{' '}
              when ready to connect to the app.
            </Text>
            <View
              style={{alignItems: 'center', marginTop: 20, marginBottom: 30}}>
              <Image
                style={{width: 236, height: 236}}
                source={require('../../assets/images/gif/misty-flash-animation-2.gif')}
              />
            </View>
          </View>
          <View>
            <Text style={styles.question}>misty not flashing purple?</Text>
            <Text style={[styles.answer, {marginBottom: 17}]}>
              If she is not flashing purple don't worry, simply factory reset by
              holding the{' '}
              <Text
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'AntagometricaBT-Bold',
                }}>
                UP
              </Text>{' '}
              and and <Text style={{fontWeight: 'bold'}}>DOWN</Text> buttons
              simultaneously on the unit for 10 seconds. The lower LEDs will
              blink to signify the start of the factory reset.
            </Text>
            <Text style={styles.answer}>
              <Text style={{color: '#CA57E7'}}>*</Text>{' '}
              <Text
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'AntagometricaBT-Bold',
                }}>
                DO NOT
              </Text>{' '}
              power down during a factory reset. Reset is complete when unit
              flashes purple.
            </Text>
            <View
              style={{alignItems: 'center', marginTop: 40, paddingBottom: 15}}>
              <Image
                style={{width: 236, height: 236}}
                source={require('../../assets/images/gif/TimerGifCloud.gif')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleGoToStep2} style={styles.buttonDown}>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: 'AntagometricaBT-Regular'
            }}>
            next
          </Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 19,
    paddingLeft: 19,
    paddingRight: 19,
    height: '100%',
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#36365D',
    borderRadius: 13,
    height: '19%',
    padding: 15,
    marginTop: 30,
    justifyContent: 'center',
  },
  button: {
    width: 200,
    backgroundColor: 'opacity',
    borderWidth: 1,
    borderColor: '#2A70AA',
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
    width: '105%',
    marginLeft: -14,
    height: 85,
    justifyContent: 'center',
    backgroundColor: '#1D1A34',
  },
  cardListInfo: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'AntagometricaBT-Regular',
  },
  cardList: {
    marginVertical: 17,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'AntagometricaBT-Regular',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'AntagometricaBT-Bold',
  },
  question: {
    color: '#23659D',
    marginTop: 26,
    marginBottom: 10,
    fontFamily: 'AntagometricaBT-Bold',
    fontSize: 19,
  },
  answer: {
    fontSize: 15,
    color: '#235B91',
    fontFamily: 'AntagometricaBT-Regular',
  },
});
