import React, {useEffect,useState}                             from 'react';
import {ImageBackground}                                       from 'react-native';
import {useSelector}                                           from 'react-redux';
import { RootReducerState }                                    from '../../../redux';
import moment                                                  from 'moment';

//icons
import back                                                    from '../../../assets/backOrigin.png';

import {dateTimeFormat}                                        from '../../../utils/time';
import {ContentNavigation}                                     from './ContentNavigation';

import { arrayHeader, HeaderNavigation }                       from './HeaderNavigation';
import { useFetchTemperature }                                 from '../../../hooks/nursery/useFetchTemperature';
import {getCombinedNavigation}                                 from '../../../hooks/useUpdateNavigationHeaderOptions';

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
  const [end, setEnd]                 = useState(dateTimeFormat(moment((startDate[0])).add('1','days')));
  
  const {temperatures,options,diaries} = useFetchTemperature(accounts[0].id,device.id,start,end);

  useEffect(() => { 
  if(accounts[0].id){
    setStart(startDate[arrayHeader.indexOf(activeTime)])
    setEnd(dateTimeFormat(new Date()))
  }
  },[activeTime,accounts[0].id]);


  return (
    <ImageBackground source={back} style={{flex: 1}}>
      <HeaderNavigation activeTime={activeTime} handleChangeTime={(time) => {setActiveTime(time)}}/>
      <ContentNavigation
        diaries={diaries}
        activeTime={activeTime}
        options={options}
      />
    </ImageBackground>
  );
};
