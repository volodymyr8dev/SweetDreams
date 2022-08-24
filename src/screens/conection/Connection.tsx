import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {CustomButton} from '../../components/CustomButton/CustomButton';
import {COLORS} from '../../styles/Constants';
import background from '../../assets/images/homeIcon/backgroundHome.png';
import { getCombinedNavigation } from '../../hooks/useUpdateNavigationHeaderOptions';

export const Connection = ({navigation}) => {
  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'connect misty',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
      })
    )
  }, [navigation]);

  const handleConnect = () => {
    navigation.navigate('ConnectionStep1');
  };

  return (
    <ImageBackground style={{backgroundColor: COLORS.backGround}} source={background}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={{marginBottom: 5}}>
            <Image source={require('../../assets/images/Cloud.png')} style={{width: 35, height: 22}} />
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontFamily: 'AntagometricaBT-Bold' }}>
              your misty device{' '}
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ color: '#FFFFFF', fontFamily: 'AntagometricaBT-Regular' }}>
                Status:{' '}
              </Text>
              <View
                style={{
                  width: 9,
                  height: 9,
                  backgroundColor: '#D65852',
                  borderRadius: 100,
                  marginTop: 5,
                  marginRight: 2,
                }}
              />
              <Text style={{color: '#FFFFFF'}}>NOT CONNECTED</Text>
            </View>
          </View>
          <View style={{marginBottom: 30}}>
            <Text
              style={{color: '#FFFFFF', fontFamily: 'AntagometricaBT-Regular'}}>
              Your misty device is not connected
            </Text>
          </View>
          <View>
            <CustomButton
              styles={styles.button}
              handleOnSubmit={handleConnect}
              text="connect"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 19,
    paddingRight: 29,
    height: '100%',
  },
  card: {
    backgroundColor: '#36365D',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    height: 230,
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
    width: '120%',
    marginLeft: -14,
    height: 85,
    justifyContent: 'center',
    backgroundColor: '#1D1A34',
  },
});
