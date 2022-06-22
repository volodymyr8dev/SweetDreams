import React, {useState} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {COLORS} from '../../styles/Constants/index';
// import {Switch} from 'react-native-switch';
export const Switch = ({val, setVal}) => {
  const [value, setValue] = useState(false);
  return (
    <ToggleSwitch
      isOn={val ? val : value}
      onColor={COLORS.text}
      offColor="#707070"
      labelStyle={{color: 'black', fontWeight: '900'}}
      size="large"
      onToggle={isOn => {
        console.log(val);
        if (val) {
          setVal(!val);
          setValue(!value);
        } else {
          setVal && setVal(!val);
          setValue(!value);
        }
      }}
    />
  );
};
