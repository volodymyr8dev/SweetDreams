import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {SliderComp} from '../../../components/Slider/SliderComp';
import {COLORS} from '../../../styles/Constants';
import wifiSmall from '../../../assets/images/settings/wifiSmall.png';
import wifiBig from '../../../assets/images/settings/WifiBig.png';
import {SettingsDevice} from '../../../api/Settings/SettingsApi';
import {RootState} from '../../../redux/configureStore';

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
        SettingsDevice({"smartCRY Sensor Sensitivity": active2}, user.accounts[0].id).then(res => {
          route.params.setValue(res.data.data);
        });
      }
    };
    handleChange();
    return () => {
      isActive = true;
    };
  }, [active2]);

  return (
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
          />
        </View>
        <Image
          source={wifiBig}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backGround,
    height: '100%',
    paddingTop: 15,
  },
  box: {
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
