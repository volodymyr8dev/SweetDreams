import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {COLORS} from '../../../styles/Constants';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import DomeBrightnessBig from '../../../assets/images/settings/DomeBrightnessBig.png';
import DomeBrightnessSmall from '../../../assets/images/settings/DomeBrightnessSmall.png';
import {SliderComp} from '../../../components/Slider/SliderComp';
import background from '../../../assets/images/homeIcon/backgroundHome.png'

export const SettingsDomeBrightness = () => {
  const [value, setValue] = useState();
  const {brightness} = useSelector(({settings}) => settings);
  useEffect(() => {
    setValue(brightness);
  }, [brightness]);
  const dispatch = useDispatch();

  return (
      <ImageBackground source={background}><View style={styles.container}>
        <View style={styles.box}>
          <Image
              source={DomeBrightnessBig}
              style={{width: 25, height: 25, marginRight: 5}}
          />
          <View style={{justifyContent: 'center', width: '75%'}}>
            <SliderComp
                brightness={brightness}
                value={value}
                setValue={setValue}
            />
          </View>
          <Image
              style={{width: 30, height: 30, marginLeft: 5}}
              source={DomeBrightnessSmall}
          />
        </View>
      </View></ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#2A2E63',
    height: '100%',
  },
  box: {
    marginTop: 10,
    height: 80,
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
