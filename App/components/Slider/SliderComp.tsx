import React from 'react';
import {View} from 'react-native';
import Slider from '@react-native-community/slider';
import {useDispatch} from 'react-redux';
import {setBrightness, setVolume} from '../../redux/slice/SettingsSlice';
import {COLORS} from '../../styles/Constants';

export const SliderComp = ({brightness, value, setValue, name}) => {
  const dispatch = useDispatch();
  return (
    <Slider
      style={{width: '100%', height: 40}}
      value={brightness}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor={COLORS.text}
      maximumTrackTintColor="#292C62"
      onSlidingComplete={value => {
        if (name === 'volume') {
          dispatch(setVolume(value));
        } else {
          dispatch(setBrightness(value));
          console.log(value);
        }
      }}
      onValueChange={value => {
        setValue(value);
        console.log(value);
      }}
    />
  );
};
