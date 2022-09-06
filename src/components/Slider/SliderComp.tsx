import React from 'react';
import Slider from '@react-native-community/slider';
import {useDispatch} from 'react-redux';
import {COLORS} from '../../styles/Constants';

export const SliderComp = ({slideValue, value, setValue, name}) => {
  const dispatch = useDispatch();
  return (
    <Slider
      style={{width: '100%', height: 40}}
      value={slideValue}
      minimumValue={0}
      maximumValue={255}
      minimumTrackTintColor={COLORS.text}
      maximumTrackTintColor="#292C62"
      onSlidingComplete={value => {}}
      onValueChange={value => {
        setValue(value);
      }}
    />
  );
};
