import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch}   from 'react-redux';
import {RootReducerState}           from '../../redux';
import {fetchDeviceConfig}          from '../../redux/slices/auth';
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
import ThermometerYellow from '../../assets/images/svg/ThermometerYellow'
import CryChild from '../../assets/images/svg/CryChild';
import TopGear from '../../assets/images/svg/TopGear';
import Sheep from '../../assets/images/svg/Sheep';
import {Content} from '../../components/Carousel/Content';

export const ConnectedDevice = ({navigation}) => {
  const dispatch = useDispatch();
  const {user}   = useSelector((state: RootReducerState) => state.auth);
  let device     = user.accounts[0]?.devices[0];

  /* Refresh data x 1.5 seconds */
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (device && device.is_online) {
          dispatch(
            fetchDeviceConfig({
              accountId: user.accounts[0]?.id,
              deviceId: device.id
            })
          );
        }
      },
      1500
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
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
            <TopGear style={{ width:20, height:20}} />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: Dimensions.get('window').height / 100, alignSelf: 'center'}}>
          <View style={styles.controlContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center',width:Dimensions.get('window').width}}>
              <View
                style={
                  device.is_deluxe == false
                    ? styles.contentTemperature
                    : styles.contentDeluxeTemperature
                }>

                {device.current_temperature >= 18 ? <ThermometerYellow/> : <Thermometer/>}

                {!device.is_online ? (
                  <Text
                    style={styles.textTemperature}>
                    N/A
                  </Text>
                ) : (
                  <Text
                    style={styles.textTemperature}>
                    {(device.config?.temperature == 'C' ? device.current_temperature : device.current_temperature * 9/5 + 32).toFixed(1).toString()}°{device.config.temperature}
                  </Text>
                )}
              </View>

              <View style={{flexDirection: 'row'}}>
                <Image style={ device.is_deluxe == false ? {bottom: 1000} : {marginHorizontal: 15} } source={line} />
              </View>

              <View style={[styles.rightContentTemp, {width:device.is_deluxe == false ? '0%': '50%'}]}>
                {device.is_deluxe == false ? <View /> : <CryChild />}

                <View style={{marginLeft: 10}}>
                  {device.is_deluxe == false ? (
                    <View />
                  ) : !device || device.is_connected ? (
                    <Text style={styles.textTemperature}>N/A</Text>
                  ) : (
                    <Text style={styles.textTemperature}>OFF
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
    paddingTop: Dimensions.get('window').height / 20,
    height: '100%',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1001,
    paddingTop: 20
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
  contentTemperature:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:"100%",
  },
  contentDeluxeTemperature:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: "50%",
  },
  textTemperature:{
      color: '#fff',
      fontSize: 24,
      fontFamily: 'AntagometricaBT-Regular',
      fontWeight: 'bold',
  },
  rightContentTemp:{
    flexDirection: 'row', alignItems: 'center',
  }
});
