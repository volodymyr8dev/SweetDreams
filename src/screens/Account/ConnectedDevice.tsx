import React, {useEffect} from 'react';
import {useSelector}      from 'react-redux';
import {RootReducerState} from '../../redux';

import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import background from '../../assets/images/homeIcon/backgroundHome.png';
import line from '../../assets/images/homeIcon/line.png';
import {COLORS} from '../../styles/Constants';
import backgroundGrey from '../../assets/backGrey.png';
import Thermometer from '../../assets/images/svg/Thermometer';
import CryChild from '../../assets/images/svg/CryChild';
import TopGear from '../../assets/images/svg/TopGear';
import Sheep from '../../assets/images/svg/Sheep';
import {Content} from '../../components/Carousel/Content';

export const ConnectedDevice = ({navigation}) => {
  const {user} = useSelector((state: RootReducerState) => state.auth);
  let device   = user.accounts[0]?.devices[0];

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation]);

  const openSettings = async () => {
    navigation.navigate('DeviceSettings');
  };

  const HeaderUI = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <View style={{width: 21}} />
          <View style={{paddingRight: 10}}>
            <Sheep />
          </View>
          <TouchableOpacity onPress={openSettings}>
            <View style={{height: 20, width: 20}} />
            <TopGear style={{bottom: 22, right: 2}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 20,
            alignSelf: 'center',
          }}>
          <View style={styles.controlContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View
                style={
                  device.is_deluxe == false
                    ? {
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: 120,
                        left: '17%',
                      }
                    : {
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: 120,
                      }
                }>

                <Thermometer />
                
                {!device.is_online ? (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 24,
                      fontFamily: 'AntagometricaBT-Regular',
                      fontWeight: 'bold',
                    }}>
                    N/A
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 24,
                      fontFamily: 'AntagometricaBT-Regular',
                      fontWeight: 'bold',
                    }}>
                    {device.config?.temperature == 'C' ? device.current_temperature : device.current_temperature * 9/5 + 32}°{device.config.temperature}
                  </Text>
                )}
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image style={ device.is_deluxe == false ? {bottom: 1000} : {marginHorizontal: 15} } source={line} />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', width: 120}}>
                {device.is_deluxe == false ? <View /> : <CryChild />}

                <View style={{marginLeft: 10}}>
                  {device.is_deluxe == false ? (
                    <View />
                  ) : !device || device.is_connected ? (
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 24,
                        fontFamily: 'AntagometricaBT-Regular',
                        fontWeight: 'bold',
                      }}>
                      N/A
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 24,
                        fontFamily: 'AntagometricaBT-Regular',
                        fontWeight: 'bold',
                      }}>
                      OFF
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground style={{backgroundColor: COLORS.backGround}} source={device.is_online ? background : backgroundGrey}>
      <View style={styles.container}>
        <HeaderUI />
        <Content />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    height: '100%',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: 200,
    backgroundColor: 'opacity',
    borderWidth: 1,
    borderColor: '#2A70AA',
  },
  controlContainer: {
    flexDirection: 'row',
  },
  modalContainer: {
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 15,
    flexDirection: 'row',
    height: Dimensions.get('window').height / 13,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  containerCarousel: {
    alignItems: 'center',
  },
  cardCarousel: {
    alignItems: 'center',
    borderRadius: 20,
  },
  carousel: {
    flexGrow: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 280,
  },
});
