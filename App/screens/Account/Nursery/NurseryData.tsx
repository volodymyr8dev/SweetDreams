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
import {RootState} from '../../../redux/configureStore';
import { NureseryTemperatureApi } from '../../../api/Nursery/Nuresery';
import { setNerseryId } from '../../../redux/slice/slice';

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

export const NurseryData = () => {
const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [activeTime, setActiveTime] = useState('last 24 hours');
  const {accounts} = useSelector(
    ({account}: RootState) => account.userInformation.user,
  );
  const getToken = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');
    console.log('valueeee', value);
  };
  useEffect(() => {
    getToken();
    console.log(accounts[0].id);
    if (accounts[0].id) {
      console.log('id', accounts[0].id);
      NureseryTemperatureApi(accounts[0].id)
        .then(({data}) => {
          console.log('get nerseryId', data);
          dispatch(setNerseryId(data[1].id));
        })
        .catch(err => {
          console.log('ERR', err);
        });
    }
  }, [accounts[0].id]);
  const handleChangeTime = time => {
    console.log(time);
    setActiveTime(time);
    // navigation.navigate(time);
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
        <TouchableOpacity onPress={() => handleChangeTime('last 24 hours')}>
          <View style={{}}>
            <View style={{paddingHorizontal: 20}}>
              <Text
                style={{
                  color: activeTime == 'last 24 hours' ? '#CE9B51' : '#fff',
                  paddingVertical: 4,
                }}>
                last 24 hours
              </Text>
            </View>

            <View
              style={[
                activeTime == 'last 24 hours'
                  ? styles.borderActive
                  : styles.border,
              ]}></View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleChangeTime('last 7 days')}>
          <View>
            <View style={{paddingHorizontal: 20}}>
              <Text
                style={{
                  color: activeTime == 'last 7 days' ? '#CE9B51' : '#fff',
                  paddingVertical: 4,
                }}>
                last 7 days
              </Text>
            </View>

            <View
              style={[
                activeTime == 'last 7 days'
                  ? styles.borderActive
                  : styles.border,
              ]}></View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleChangeTime('last 28 days')}>
          <View>
            <View style={{paddingHorizontal: 20}}>
              <Text
                style={{
                  color: activeTime == 'last 28 days' ? '#CE9B51' : '#fff',
                  paddingVertical: 4,
                }}>
                last 28 days
              </Text>
            </View>

            <View
              style={[
                activeTime == 'last 28 days'
                  ? styles.borderActive
                  : styles.border,
              ]}></View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const ContentNavigation = ({options}) => {
    console.log(options);
    return (
      <View style={styles.container}>
        <Blog
          title="Total Time Without Activation"
          subTitle={options.value1.subTitle}
          source={happy}
          rightEl={options.value1.value}
        />
        <Blog
          title="Longest Period Without Activation"
          subTitle={options.value2.subTitle}
          source={happy}
          rightEl={options.value2.value}
        />
        <Blog
          title="Number of smartCRY Activations"
          subTitle={options.value3.subTitle}
          source={sad}
          rightEl={options.value3.value}
        />
        <Blog
          title="Diary Entries"
          subTitle={options.value4.subTitle}
          source={book}
          rightEl={options.value4.value}
          width={30}
          height={26}
        />
        <Blog
          title="Average Temperature"
          subTitle={options.value5.subTitle}
          source={tempretute}
          rightEl={options.value5.value}
          width={30}
          height={27}
        />
      </View>
    );
  };
  const Blog = ({title, rightEl, source, subTitle, width, height}) => {
    const handleSettings = async title => {
      if (typeof rightEl !== 'object') {
        console.log(title, 'title');
        navigation.navigate(`${title}`, {title: title, childId: accounts[0].id});
      }
    };
    return (
      <TouchableOpacity
        onPress={() => handleSettings(title)}
        style={styles.blog}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              width: width ? width : 30,
              height: height ? height : 30,
              marginRight: 10,
            }}
            source={source}
            resizeMode="contain"
          />
          <View>
            <Text
              style={{color: '#2371AB', fontSize: title.length > 20 ? 17 : 20}}>
              {title}
            </Text>

            {subTitle ? (
              <Text style={{color: '#2371AB', fontSize: 12}}>{subTitle}</Text>
            ) : null}
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {typeof rightEl == 'object' ? (
            rightEl
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: COLORS.textLight, fontSize: 18}}>
                {rightEl}
              </Text>
              <Image
                style={{width: 10, height: 11, marginLeft: 10}}
                source={arrowRight}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

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
      <ContentNavigation options={activeDay()} />
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
