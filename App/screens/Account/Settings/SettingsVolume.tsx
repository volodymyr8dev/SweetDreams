import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SliderComp} from '../../../components/Slider/SliderComp';
import {COLORS} from '../../../styles/Constants';
import volumeSmall from '../../../assets/images/settings/volumeSmall.png';
import volumeBig from '../../../assets/images/settings/volumeBig.png';
import {SettingsDevice} from '../../../api/Settings/SettingsApi';
import {RootState} from '../../../redux/configureStore';
export const SettingsVolume = ({route}) => {
  const [active, setActive] = useState();
  const [active2, setActive2] = useState('');

  const {user} = useSelector(({account}: RootState) => account.userInformation);
  const {volume} = useSelector(({settings}) => settings);

  const setValue = newValue => {
    setActive2(newValue);
  };
  const timeout = (ms)=>{
return new Promise((resolve)=>setTimeout(resolve,ms))
  }

  useEffect( ()=>{
    let isActive = false
    const handleChange = async()=>{
    await timeout(1000)
      if(!isActive){
        console.log('activeeee')
        SettingsDevice({Volume: active2}, user.accounts[0].id).then(res => {
          route.params.setValue(res.data.data);
        });
      }
    }
    handleChange();
    return()=>{
      isActive = true;
    }
  },[active2])
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
            value={route.params.value}
            // value={route.params.value}
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
