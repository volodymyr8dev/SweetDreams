import React, {useEffect, useState} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {COLORS} from '../../styles/Constants/index';
import {SettingsDevice} from '../../api/Settings/SettingsApi';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/configureStore';
import {setAllSettings} from "../../redux/slice/SettingsSlice";
// import {Switch} from 'react-native-switch';
export const Switch = ({val}) => {
  const [value, setValueState] = useState(val);
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  const dispatch = useDispatch();
  const setValue = async () => {
      setValueState(!val)
    const data = await SettingsDevice(
      {'Child Lock': !val},
      user.accounts[0].id,
    );
  };

  // useEffect(()=> {
  //     SettingsDevice({"Child Lock": value}, user.accounts[0].id).then((res) => {console.log(res)})
  // },[value])

  return (
    <ToggleSwitch
        isOn={value}
      onColor={COLORS.text}
      offColor="#707070"
      labelStyle={{color: 'black', fontWeight: '900'}}
      size="large"
      onToggle={() => {
        setValue();
      }}
    />
  );
};
