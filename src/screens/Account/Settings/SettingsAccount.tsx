import React, {useEffect}         from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootReducerState}         from '../../../redux';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import arrowRight from '../../../assets/images/settings/arrowRight.png';
import connection from '../../../assets/images/settings/connection.png';
import lock from '../../../assets/images/settings/lock.png';
import clock from '../../../assets/images/settings/clock.png';
import wakeUp from '../../../assets/images/settings/wakeUp.png';
import colorPicker from '../../../assets/images/settings/colorPicker.png';
import brightness from '../../../assets/images/settings/brightness.png';
import displayBrightness from '../../../assets/images/settings/colorPicker.png';
import smartCRY from '../../../assets/images/settings/smartCRY.png';
import Temperature from '../../../assets/images/settings/Temperature.png';
import smartSRYSensetivity from '../../../assets/images/settings/smartCrySensetivity.png';
import music from '../../../assets/images/settings/music.png';
import musicTime from '../../../assets/images/settings/musicTime.png';
import volumeImg from '../../../assets/images/settings/volume.png';
import {Switch} from '../../../components/Switch/Switch';
import background from '../../../assets/backOrigin.png';
import {getCombinedNavigation}      from '../../../hooks/useUpdateNavigationHeaderOptions';

import {
  setTemperatureNotifications,
  setDeviceConfigChildLock
} from '../../../redux/slices/auth';
import moment from 'moment';

export const SettingsAccount = ({navigation}) => {
  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'settings',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
      })
    )
  }, [navigation]);

  const dispatch = useDispatch();
  const {user}   = useSelector((state: RootReducerState) => state.auth);
  let device     = user.accounts[0]?.devices[0];

  const toggleNotificationSettings = () => {
    dispatch(setTemperatureNotifications(!device.has_temperature_notifications_enabled))
  }

  const toggleChildLock = () => {
    dispatch(setDeviceConfigChildLock(!device.config?.child_lock))
  }

  const handleSettings = async title => {
    if (typeof rightEl !== 'object') {
      navigation.navigate(`${title}`, {title: title});
    }
  };
  
  const Blog = ({title, rightEl, source, value, navigate}) => {
    return (
      <TouchableOpacity onPress={() => handleSettings(navigate)} style={styles.blog}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={{width: 24, height: 24, marginRight: 10}} source={source} resizeMode="contain" />
          <Text style={{color: '#2371AB', fontSize: 19, fontFamily: 'AntagometricaBT-Regular'}}>
            {navigate}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {typeof rightEl === 'object' ? (
            rightEl
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#2371AB', fontSize: 19, fontFamily: 'AntagometricaBT-Regular'}}>{rightEl}</Text>
              <Image
                style={{width: 10, height: 10, marginLeft: 10}}
                source={arrowRight}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={background}>
      <ScrollView style={styles.container}>
        <View style={{paddingBottom: 40}}>
          <Blog
            title="connection"
            navigate="Connection"
            rightEl="Connected"
            source={connection}
          />
          <Blog
            title="child lock"
            navigate="Child Lock"
            rightEl={
              <Switch val={device.config?.child_lock} setData={toggleChildLock} />
            }
            source={lock}
          />
          <View style={{paddingLeft: 15, marginVertical: 15}}>
            <Text
              style={{
                color: '#2371AB',
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'AntagometricaBT-Bold',
              }}>
              Display Settings
            </Text>
          </View>
          <Blog
            title="time"
            navigate="Time"
            rightEl={moment().format('HH:mm')}
            value={device.config?.time}
            source={clock}
          />
          <Blog
            title="wake up time"
            navigate="Wake Up Time"
            value={device.config?.wake_up_time}
            source={wakeUp}
            rightEl={device.config?.wake_up_time}
          />
          {device.is_deluxe == false ? null : (
            <Blog
              title="colour Picker"
              navigate="Colour Picker"
              source={colorPicker}
              rightEl={undefined}
            />
          )}
          <Blog
            title="dome brightness"
            navigate="Dome Brightness"
            source={brightness}
            rightEl={Number(device.config?.dome_brightness / 255 * 100).toFixed(0) + '%'}
          />
          {device.is_deluxe == false ? null : (
          <Blog
            title="display brightness"
            navigate="Display Brightness"
            source={displayBrightness}
            rightEl={'25%'}
          />
          )}
          <Blog
            title="temperature"
            navigate="Temperature"
            source={Temperature}
            rightEl={`°${device.config?.temperature}`}
            value={device.config?.temperature}
          />
          {device.is_deluxe == false ? null : (
            <View style={{paddingLeft: 15, marginVertical: 15}}>
              <Text
                style={{
                  color: '#2371AB',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'AntagometricaBT-Bold',
                }}>
                {' '}
                Sound Settings
              </Text>
            </View>
          )}
          {device.is_deluxe == false ? null : (
            <Blog
              title="smartCRY Sensor"
              navigate="smartCRY Sensor"
              source={smartCRY}
              rightEl={
                <Switch
                  val={null}
                  valueSmart={device.config?.smart_cry_censor_enabled}
                  title={'smartCRY Senson'}
                />
              }
            />
          )}
          {device.is_deluxe == false ? null : (
            <Blog
              title="smartCRY Sensor Sensitivity"
              navigate="smartCRY Sensor Sensitivity"
              source={smartSRYSensetivity}
              value={device.config?.smart_cry_censor_sensibility}
              rightEl={Number(device.config?.smart_cry_censor_sensibility).toFixed(0)}
            />
          )}
          {device.is_deluxe == false ? null : (
            <Blog
              title="custom recording"
              navigate="Custom Recording"
              source={music}
              rightEl={'Dad reading s...'}
            />
          )}
          {device.is_deluxe == false ? null : (
            <Blog
              title="sound playing time"
              navigate="Sound Playing Time"
              source={musicTime}
              value={device.config?.sound_playing_time}
              rightEl={Number(device.config?.sound_playing_time).toFixed(0)}
            />
          )}
          {device.is_deluxe == false ? null : (
            <Blog
              title="volume"
              navigate="Volume"
              source={volumeImg}
              rightEl={Number(device.config?.volume).toFixed(0)}
            />
          )}
          <View style={{paddingLeft: 15, marginVertical: 15}}>
            <Text
              style={{
                color: '#2371AB',
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'AntagometricaBT-Bold',
              }}>
              Notifications
            </Text>
          </View>
          {device.is_deluxe == false ? null : (
            <Blog
              title="smartCRY sensor activation"
              navigate="smartCRY Sensor Activation"
              source={smartCRY}
              rightEl={
                <Switch
                  val={null}
                  valueSmart={device.has_smart_sensor_actiation_notifcations_enabled}
                  title={'smartCRY sensor activation'}
                  setData={updateSettingsData}
                />
              }
            />
          )}
          <Blog
            title="temperature"
            navigate="Temperature"
            source={Temperature}
            rightEl={
              <Switch val={device.has_temperature_notifications_enabled} setData={toggleNotificationSettings} />
            }
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#2A2E63',
    height: '100%',
  },
  blog: {
    paddingHorizontal: 10,
    marginVertical: 4,
    width: '100%',
    height: 76,
    // backgroundColor: '#1A172D',
    backgroundColor: 'rgba(26,23,45,0.7)',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    color: '#2371AB',
    fontSize: 16,
    fontFamily: 'AntagometricaBT-Regular',
  },
  textRight: {
    color: '#2371AB',
    fontSize: 15,
    fontFamily: 'AntagometricaBT-Regular',
  },
});
