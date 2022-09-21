import React, {useEffect,useState}                             from 'react';
import {ImageBackground}                                       from 'react-native';
import {useSelector}                                           from 'react-redux';
import { RootReducerState }                                    from '../../../redux';
import moment                                                  from 'moment';

//icons
import back                                                    from '../../../assets/backOrigin.png';

import {dateTimeFormat}                                        from '../../../utils/time';
import {ContentNavigation}                                     from './ContentNavigation';

import {COLORS}                                                from '../../../styles/Constants';
import { arrayHeader, HeaderNavigation }                       from './HeaderNavigation';
import { useFetchTemperature }                                 from '../../../hooks/nursery/useFetchTemperature';
import {getCombinedNavigation}                                 from '../../../hooks/useUpdateNavigationHeaderOptions';

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
      headerShown: true
    })
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title:             'nursery data',
        headerLeftMethod:  undefined,
        headerRightMethod: undefined
      })
    )
  }, [navigation]);

  const {user}   = useSelector((state: RootReducerState) => state.auth);
  
  const device   = user.accounts[0]?.devices[0];
  const accounts = user.accounts;
  
  const [activeTime, setActiveTime]   = useState('last 24 hours');
  const [start, setStart]             = useState(startDate[arrayHeader.indexOf(activeTime)]);
  const [end, setEnd]                 = useState(dateTimeFormat(new Date()));
  
  const {temperatures,options,diaries} = useFetchTemperature(accounts[0].id,device.id,start,end);

  useEffect(() => { 
  if(accounts[0].id){
    setStart(startDate[arrayHeader.indexOf(activeTime)])
    setEnd(dateTimeFormat(new Date()))
  }
  },[activeTime,accounts[0].id]);

  // const activeDay = () => {
  //   switch (activeTime) {
  //     case 'last 24 hours':
  //       return options24;
  //     case 'last 7 days':
  //       return optionsD7;
  //     case 'last 28 days':
  //       return optionsD28;
  //   }
  // };


  return (
    <ImageBackground source={back} style={{flex: 1}}>
      <HeaderNavigation activeTime={activeTime} handleChangeTime={(time) => {setActiveTime(time)}}/>
      <ContentNavigation
        diaries={diaries}
        activeTime={activeTime}
        options={options}
        temperatures={temperatures}
      />
    </ImageBackground>
  );
};
