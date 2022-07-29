import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLORS} from '../../../styles/Constants';
import {useDispatch} from 'react-redux';
import SettingsSlice, {
  setBrightness,
  setTemperature,
} from '../../../redux/slice/SettingsSlice';
import {useSelector} from 'react-redux';
import Slider from '@react-native-community/slider';
import DomeBrignessBig from '../../../assets/images/settings/DomeBrignessBig.png';
import DomeBrignessSmal from '../../../assets/images/settings/DomeBrignessSmal.png';
import {SliderComp} from '../../../components/Slider/SliderComp';
import background from '../../../assets/images/homeIcon/bacgroundHome.png'

export const SettingsDomeBrihtness = () => {
  const [value, setValue] = useState();
  const {brightness} = useSelector(({settings}) => settings);
  useEffect(() => {
    setValue(brightness);
  }, [brightness]);
  const dispatch = useDispatch();

  return (
      <ImageBackground source={background}><View style={styles.container}>
        <View style={styles.box}>
          <Image
              source={DomeBrignessBig}
              style={{width: 25, height: 25, marginRight: 5}}
          />
          <View style={{justifyContent: 'center', width: '75%'}}>
            <SliderComp
                brightness={brightness}
                value={value}
                setValue={setValue}
            />
          </View>
          {/* <Slider
          style={{width: '75%', height: 40}}
          value={brightness}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={COLORS.text}
          maximumTrackTintColor="#292C62"
          onSlidingComplete={value => {
            dispatch(setBrightness(value));
            console.log(value);
          }}
          onValueChange={value => {
            setValue(value);
            console.log(value);
          }}
        /> */}
          <Image
              style={{width: 30, height: 30, marginLeft: 5}}
              source={DomeBrignessSmal}
          />
        </View>
      </View></ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#2A2E63',
    height: '100%',
  },
  box: {
    marginTop: 10,
    height: 80,
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
