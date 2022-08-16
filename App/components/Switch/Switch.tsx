import React from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {COLORS} from '../../styles/Constants/index';
import {SettingsDevice} from '../../api/Settings/SettingsApi';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/configureStore';

interface ISwitch {
  val: any;
  setVal?: Function;
  setData?: Function;
  valueSmart?: any;
  title?: any;
}
export const Switch = ({val, setVal, setData, valueSmart, title}: ISwitch) => {
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  const setValue = async () => {
    const data = await SettingsDevice(
      // val !== null ? {'Child Lock': !val} : {'smartCRY Sensor': "0"},
      {[title]: val !== null ? !val : valueSmart === '0' ? '1' : '0'},
      user.accounts[0].id,
    );
    if (setData) setData(data.data.data);
  };

  return (
    <ToggleSwitch
      isOn={val !== null ? val : valueSmart === '0' ? false : true}
      onColor={COLORS.text}
      offColor="#707070"
      labelStyle={{color: 'black', fontWeight: '900'}}
      size="large"
      onToggle={() => {
        if (setVal) {
          setVal(!val);
        } else {
          setValue();
        }
      }}
    />
  );
};
