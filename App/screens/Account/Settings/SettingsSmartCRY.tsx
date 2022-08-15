import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import {SliderComp} from '../../../components/Slider/SliderComp';
import {COLORS} from '../../../styles/Constants';
import wifiSmall from '../../../assets/images/settings/wifiSmall.png';
import wifiBig from '../../../assets/images/settings/WifiBig.png';
import {SettingsDevice} from '../../../api/Settings/SettingsApi';
import {RootState} from '../../../redux/configureStore';
import background from '../../../assets/images/homeIcon/bacgroundHome.png';

export const SettingsSmartCRY = ({route}) => {
  const [active2, setActive2] = useState('');
  // const [value, setValue] = useState(false);
  const {brightness} = useSelector(({settings}) => settings);
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  const setValue = newValue => {
    setActive2(newValue);
  };

  const timeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  useEffect(() => {
    let isActive = false;
    const handleChange = async () => {
      await timeout(1000);
      if (!isActive) {
        console.log('activeeee');
        SettingsDevice(
          {smartCRY_sensor_sensitivity: active2},
          user.accounts[0].id,
        ).then(res => {
          route.params.setValue(res.data.data);
        }).catch(res => {
          console.log(res);
        });
      }
    };
    handleChange();
    return () => {
      isActive = true;
    };
  }, [active2]);

  return (
    <ImageBackground source={background}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            source={wifiSmall}
            style={{width: 25, height: 25, marginRight: 5}}
          />
          <View style={{width: '75%'}}>
            <SliderComp
              brightness={brightness}
              value={route.params.value}
              setValue={setValue}
              name={'Sensor'}
            />
          </View>
          <Image
            source={wifiBig}
            style={{width: 25, height: 25, marginLeft: 5}}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.backGround,
    height: '100%',
    paddingTop: 15,
  },
  box: {
    // backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
