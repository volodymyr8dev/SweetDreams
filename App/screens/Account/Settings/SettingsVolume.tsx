import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {SliderComp} from '../../../components/Slider/SliderComp';
import {COLORS} from '../../../styles/Constants';
import volumeSmall from '../../../assets/images/settings/volumeSmall.png';
import volumeBig from '../../../assets/images/settings/volumeBig.png';
export const SettingsVolume = () => {
  const [value, setValue] = useState(false);
  const {volume} = useSelector(({settings}) => settings);
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image
          style={{width: 15, height: 15, marginRight: 10}}
          source={volumeSmall}
        />
        <View style={{width: '75%'}}>
          <SliderComp
            name="volume"
            brightness={volume}
            value={value}
            setValue={setValue}
          />
        </View>
        <Image
          style={{width: 25, height: 25, marginLeft: 10}}
          source={volumeBig}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backGround,
    height: '100%',
    paddingTop: 10,
  },
  box: {
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
