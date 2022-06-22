import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {SliderComp} from '../../../components/Slider/SliderComp';
import {COLORS} from '../../../styles/Constants';
import wifiSmall from '../../../assets/images/settings/wifiSmall.png';
import wifiBig from '../../../assets/images/settings/WifiBig.png';
export const SettingsSmartCRY = () => {
  const [value, setValue] = useState(false);
  const {brightness} = useSelector(({settings}) => settings);
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
            value={value}
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
    alignItems:'center'
},
});
