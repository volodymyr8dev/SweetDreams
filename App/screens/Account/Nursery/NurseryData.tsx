import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {COLORS} from '../../../styles/Constants';

import happy from '../../../assets/images/graph/iconList/happy.png';
import sad from '../../../assets/images/graph/iconList/sad.png';
import tempretute from '../../../assets/images/graph/iconList/tempreture.png';
import book from '../../../assets/images/graph/iconList/book.png';
import arrowRight from '../../../assets/images/settings/arrowRight.png';
import {useNavigation} from '@react-navigation/native';
import back from '../../../assets/images/homeIcon/bacgroundHome.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import carousel from 'react-native-anchor-carousel/src/carousel';
import {useDispatch, useSelector} from 'react-redux';
import {
  NureseryTemperatureApi,
  NureseryTemperatureGetApi,
} from '../../../api/Nursery/Nuresery';
import {setNerseryId} from '../../../redux/slice/slice';
import {ContentNavigation} from './ContentNavigation';
import moment from 'moment';
import {RootState} from '../../../redux/interfaceRootState';
import {dateFormat} from '../../../utils/time';

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

const arrayHeader = ['last 24 hours', 'last 7 days', 'last 28 days'];
const averageTotaltemp = [
  'average_over_24hours',
  'average_over_7days',
  'average_over_28days',
];

export const NurseryData = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [activeTime, setActiveTime] = useState('last 24 hours');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [diaries, setDiaries] = useState(0);
  const [averageTemp, setAvarageTemp] = useState(0);
  const [id, setId] = useState(null);
  const {accounts} = useSelector(
    ({account}: RootState) => account.userInformation.user,
  );
  console.log('account', accounts);

  const {user} = useSelector(({account}: RootState) => account.userInformation);
  console.log(user.accounts[0].is_deluxe, 'isdecdsede');

  const getToken = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');
    console.log('valueeee', value);
  };
  console.log('avavavaav', averageTemp);
  useEffect(() => {
    if (accounts[0].id) {
      console.log('id', accounts[0].id);
      let dataStart = startDate[arrayHeader.indexOf(activeTime)];
      let dataEnd = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      id;
      NureseryTemperatureApi(accounts[0].id, dataStart, dataEnd)
        .then(({data}) => {
          console.log('get nerseryId', data);
          setId(data[1].id);
          setDiaries(data[0].diaries);
          dispatch(setNerseryId(data[1].id));
          NureseryTemperatureGetApi(
            accounts[0].id,
            data[1].id,
            dataStart,
            dataEnd,
          )
            .then(({data}) => {
              console.log('finished', data);
              !Array.isArray(data)
                ? setAvarageTemp(
                    data[`${dateFormat(dataStart)}_${dateFormat(dataEnd)}`][
                      averageTotaltemp[arrayHeader.indexOf(activeTime)]
                    ],
                  )
                : setAvarageTemp(0);
            })
            .catch(err => console.log('finishedError', err));
        })
        .catch(err => console.log('ERR', err));
    }
  }, [activeTime, accounts[0].id]);

  // useEffect(() => {
  //   getToken();
  //   if (accounts[0].id) {
  //     console.log('id', accounts[0].id);
  //     NureseryTemperatureApi(accounts[0].id, start, end)
  //       .then(({data}) => {
  //         console.log('get nerseryId', data);
  //         dispatch(setNerseryId(data[1].id));
  //         NureseryTemperatureGetApi(accounts[0].id, data[1].id, start, end)
  //           .then(({data}) => {
  //             console.log('finished', data);
  //           })
  //           .catch(err => {
  //             console.log('finised error', err);
  //           });
  //       })
  //       .catch(err => {
  //         console.log('ERR', err);
  //       });
  //   }
  // }, [accounts[0].id]);
  const handleChangeTime = time => {
    console.log(time);
    setActiveTime(time);
  };
  const HeaderNavigation = () => {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          paddingTop: 100,
        }}>
        {arrayHeader.map(item => (
          <TouchableOpacity onPress={() => handleChangeTime(item)}>
            <View style={{}}>
              <View style={{paddingHorizontal: 20}}>
                <Text
                  style={{
                    color: activeTime == item ? '#CE9B51' : '#fff',
                    paddingVertical: 4,
                    fontFamily: 'AntagometricaBT-Bold',
                  }}>
                  {item}
                </Text>
              </View>
              <View
                style={[
                  activeTime == item ? styles.borderActive : styles.border,
                ]}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  // const ContentNavigation = ({options,account}) => {
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
      <HeaderNavigation />
      <ContentNavigation
        averageTemp={averageTemp}
        diaries={diaries}
        options={activeDay()}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    height: '100%',
  },
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
