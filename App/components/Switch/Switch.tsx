import React, {useState} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';

export const Switch = () => {
  const [value, setValue] = useState(false);
  return (
    <ToggleSwitch
      isOn={value}
      onColor="green"
      offColor="red"
      label="Example label"
      labelStyle={{color: 'black', fontWeight: '900'}}
      size="large"
      onToggle={isOn => setValue(!value)}
    />
  );
};
