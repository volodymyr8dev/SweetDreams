import React, {useEffect, useState}                            from 'react';
import {View,Text,StyleSheet,ImageBackground,TouchableOpacity} from 'react-native';
import {useNavigation}                                         from '@react-navigation/native';
import AsyncStorage                                            from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector}                              from 'react-redux';
import moment                                                  from 'moment';
import { RootReducerState }                                    from '../../../redux';

//icons
import happy                                                   from  '../../../assets/images/graph/iconList/happy.png';
import sad                                                     from '../../../assets/images/graph/iconList/sad.png';
import tempretute                                              from '../../../assets/images/graph/iconList/tempreture.png';
import book                                                    from '../../../assets/images/graph/iconList/book.png';
import arrowRight                                              from '../../../assets/images/settings/arrowRight.png';
import back                                                    from '../../../assets/images/homeIcon/backgroundHome.png';

//redux
import {setNurseryId}                                          from '../../../redux/slice';
import {RootState}                                             from '../../../redux/interfaceRootState';

import {dateTimeFormat}                                        from '../../../utils/time';
import {ContentNavigation}                                     from './ContentNavigation';

import {COLORS}                                                from '../../../styles/Constants';
import { arrayHeader, HeaderNavigation }                       from './HeaderNavigation';
import { useFetchTemperature }                                 from '../../../hooks/nursery/useFetchTemperature';

const options24 = {
  value1: {
    value: '16h 32m',
    subTitle: 'with smartCRY sensor active',
  },
  value2: {
    value: '04h 59m',
    subTitle: 'with smartCRY sensor active',
  },
  value3: {
    value: '4',
    subTitle: '',
  },
  value4: {
    value: '5',
    subTitle: '',
  },
  value5: {
    value: '20.7°C',
    subTitle: '',
  },
};
const optionsD7 = {
  value1: {
    value: '16h 18m',
    subTitle: 'with smartCRY sensor active',
  },
  value2: {
    value: '04h 59m',
    subTitle: 'with smartCRY sensor active | avg over 24h',
  },
  value3: {
    value: '6',
    subTitle: 'average over 24h',
  },
  value4: {
    value: '6',
    subTitle: '',
  },
  value5: {
    value: '20.7°C',
    subTitle: '',
  },
};
const optionsD28 = {
  value1: {
    value: '16h 15m',
    subTitle: 'with smartCRY sensor active | avg over 24h',
  },
  value2: {
    value: '04h 59m',
    subTitle: 'with smartCRY sensor active',
  },
  value3: {
    value: '7',
    subTitle: 'average over 24h',
  },
  value4: {
    value: '6',
    subTitle: '',
  },
  value5: {
    value: '20.7°C',
    subTitle: '',
  },
};

const startDate = [
  moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
  moment(new Date()).subtract(27, 'days').format('YYYY-MM-DD HH:mm:ss'),
];

export const NurseryData = ({navigation}) => {
  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation]);

  const {user} = useSelector((state: RootReducerState) => state.auth);
  
  
  const device = user.accounts[0]?.devices[0];
  const accounts = user.accounts;
  
  const [activeTime, setActiveTime]   = useState('last 24 hours');
  const [start, setStart]             = useState(startDate[arrayHeader.indexOf(activeTime)]);
  const [end, setEnd]                 = useState(dateTimeFormat(new Date()));
  
  const {temperatures,options,diaries} = useFetchTemperature(accounts[0].id,device.id,start,end) 

  console.log('data-----------', temperatures)
  console.log('options-----------', options)
  
  useEffect(() => {

    setStart(startDate[arrayHeader.indexOf(activeTime)])
    setEnd(dateTimeFormat(new Date()))

  },[activeTime,accounts[0].id]);

  const activeDay = () => {
    switch (activeTime) {
      case 'last 24 hours':
        return options24;
      case 'last 7 days':
        return optionsD7;
      case 'last 28 days':
        return optionsD28;
    }
  };

  return (
    <ImageBackground
      source={back}
      style={{flex: 1, backgroundColor: COLORS.back}}>
      <HeaderNavigation  activeTime={activeTime} handleChangeTime={(time) => {setActiveTime(time)}}/>
      <ContentNavigation
        diaries={diaries}
        activeTime={activeTime}
        options={options}
        temperatures={temperatures}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.text,
  },
  blog: {
    paddingHorizontal: 10,
    marginVertical: 5,
    width: '100%',
    height: 70,
    backgroundColor: '#1A172D',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  border: {backgroundColor: '#292C62', height: 4},
  borderActive: {backgroundColor: '#CE9B51', height: 4},
});
