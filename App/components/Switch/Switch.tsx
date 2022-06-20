import React, {useState} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {COLORS} from '../../styles/Constants/index';
// import {Switch} from 'react-native-switch';
export const Switch = () => {
  const [value, setValue] = useState(true);
  return (
    <ToggleSwitch
      isOn={value}
      onColor={COLORS.text}
      offColor="#707070"
      labelStyle={{color: 'black', fontWeight: '900'}}
      size="large"
      onToggle={isOn => setValue(!value)}
    />
  );
};
