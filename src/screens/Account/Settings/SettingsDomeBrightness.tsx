import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch}                from 'react-redux';
import {RootReducerState}                        from '../../../redux';
import {debounce}                                from 'lodash';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native';

import {COLORS}                from '../../../styles/Constants';
import DomeBrightnessBig       from '../../../assets/images/settings/DomeBrightnessBig.png';
import DomeBrightnessSmall     from '../../../assets/images/settings/DomeBrightnessSmall.png';
import {SliderComp}            from '../../../components/Slider/SliderComp';
import background              from '../../../assets/backOrigin.png';

import {getCombinedNavigation} from '../../../hooks/useUpdateNavigationHeaderOptions';

import {
  setDomeBrightness
} from '../../../redux/slices/auth';

export const SettingsDomeBrightness = ({navigation}) => {
  const dispatch = useDispatch();
  const {user}   = useSelector((state: RootReducerState) => state.auth);
  let device     = user.accounts[0]?.devices[0];

  const [newDomeBrightness, setNewDomeBrightness]  = useState(parseInt(device.config?.dome_brightness));

  const toggleDomeBrightness = useCallback(
    debounce((val) => {
      dispatch(
        setDomeBrightness(Number(val).toFixed(0))  
      );
    }, 100),
    []
  );

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'dome brightness',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
      })
    )
  }, [navigation]);

  return (
    <ImageBackground source={background}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Image source={DomeBrightnessBig} style={{width: 25, height: 25, marginRight: 5}} />
          <View style={{justifyContent: 'center', width: '75%'}}>
            <SliderComp
                slideValue={newDomeBrightness}
                value={newDomeBrightness}
                setValue={(newValue) => {setNewDomeBrightness(newValue); toggleDomeBrightness(newValue);}}
            />
          </View>
          <Image style={{width: 30, height: 30, marginLeft: 5}} source={DomeBrightnessSmall} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
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
