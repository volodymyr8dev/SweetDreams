import React                      from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootReducerState}         from '../../redux';

import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import ShopCarousel       from './Carousel';
import {ControlCard}      from './ControlCard';

import {
  setDeviceOnlineStatus
} from '../../redux/slices/auth';

import PowerOn            from '../../assets/images/svg/PowerOn';
import PowerOff           from '../../assets/images/svg/PowerOff';

import CloudOff           from '../../assets/images/cloudImage/ActiveOff.png';

import CloudHot           from '../../assets/images/cloudImage/TemperatureMore22.png';
import CloudCold          from '../../assets/images/cloudImage/blue.png';
import CloudNormal        from '../../assets/images/cloudImage/Yellow.png';

import CloudSunset        from '../../assets/images/cloudImage/SunSet.png';
import CloudNothernLights from '../../assets/images/cloudImage/NothernLights.png';
import CloudPulsing       from '../../assets/images/cloudImage/Pulsing.png';
import CloudColourPicker  from '../../assets/images/cloudImage/ColorPicker.png';

import CloudAsleepImg     from '../../assets/images/cloudImage/Asleep.png';
import CloudAwake         from '../../assets/images/cloudImage/Awake.png';
import CloudIdle          from '../../assets/images/cloudImage/Idle.png';

export const Content = props => {
  const dispatch = useDispatch();
  const {user}   = useSelector((state: RootReducerState) => state.auth);

  let device            = user.accounts[0]?.devices[0];
  let selectedLightShow = device.config?.light_show ? device.config.light_show : 'TEMPERATURE_THERMOMETER';

  const handlePower = () => {
    dispatch(setDeviceOnlineStatus(!device.is_online));
  };

  const statuses = {
    'SLEEP_TRAINER_IDLE':         CloudIdle,
    'SLEEP_TRAINER_ASLEEP':       CloudAsleepImg,
    'SLEEP_TRAINER_AWAKE':        CloudAwake,
    
    'TEMPERATURE_THERMOMETER':    device.current_temperature > 22
                                      ? CloudHot
                                      : (device.current_temperature <= 17 ? CloudCold : CloudNormal),

    'LIGHT_SHOW_SUNSET':          CloudSunset,
    'LIGHT_SHOW_NORTHERN_LIGHTS': CloudNothernLights,

    'LIGHT_SHOW_PULSING':         CloudPulsing,
    'LIGHT_SHOW_COLOUR_PICKER':   CloudColourPicker,
  };

  const handleSelectedImage = ()=>{
    if(device.current_temperature !== undefined){
      return device.current_temperature <= 18 ? statuses['SLEEP_TRAINER_IDLE']:statuses['SLEEP_TRAINER_ASLEEP']
    }else{
       return statuses[selectedLightShow]
    }
  }

  return (
    <View>
      <View style={{alignItems: 'center'}}>
        {device.is_online ? (
          <Image source={handleSelectedImage()} style={{width: '100%', height: 350, bottom: '20%'}} />
        ) : (
          <Image source={CloudOff} style={{width: '100%', height: 350, bottom: '20%'}} />
        )}
        <TouchableOpacity onPress={handlePower} style={{marginTop: '40%', width: 50, bottom: '65%'}}>
          {device.is_online ? <PowerOn /> : <PowerOff />}
        </TouchableOpacity>
      </View>
      <View style={{bottom: '37%'}}>
        {device.is_deluxe == false ? (<View style={{height: 100}}/>) : <ControlCard/>}
      </View>
      <View style={styles.containerCarousel}>
        <ShopCarousel />
      </View>
    </View>
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
    bottom: '37%',
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
