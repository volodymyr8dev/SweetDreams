import React        from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {COLORS}     from '../../styles/Constants/index';

interface ISwitch {
  val: any;
  setVal?: Function;
  setData?: Function;
  valueSmart?: any;
  title?: any;
}
export const Switch = ({val, setVal, setData, valueSmart, title}: ISwitch) => {
  return (
    <ToggleSwitch
      isOn={val !== null ? val : valueSmart === '0' ? false : true}
      onColor={COLORS.text}
      offColor="#707070"
      labelStyle={{color: 'black', fontWeight: '900'}}
      size="large"
      onToggle={() => {
        setData(!val);
      }}
    />
  );
};
