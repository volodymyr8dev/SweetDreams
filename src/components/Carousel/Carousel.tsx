import React, {useRef, useState}  from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootReducerState}         from '../../redux';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';

import {
  setDeviceLightShow
} from '../../redux/slices/auth';

import Carousel from 'react-native-anchor-carousel';
import {SimplePaginationDot} from './component';

import ScrollViewIndicator from 'react-native-scroll-indicator';
import TemperatureAccount from '../../assets/images/svg/TemperatureAccount';
import BackgroundTemperature from '../../assets/images/BackgroundTemperature.png';
import Sun from '../../assets/images/svg/Sun';
import Timer from '../../assets/images/svg/Timer';
import BackgroundTimer2 from '../../assets/images/BackgroundTimer2.png';
import BackgroundSun from '../../assets/images/BackgroundSun.png';
import IdleWhiteImage from '../../assets/images/svg/IdleWhite';
import AsleepWhiteImage from '../../assets/images/svg/AsleepWhite';
import AwakeWhiteImage from '../../assets/images/svg/AwakeWhite';
import TemperatureWhiteImage from '../../assets/images/svg/TemperatureWhite';
import SunsetWhiteImage from '../../assets/images/svg/SunsetWhite';
import NorthernWhiteImage from '../../assets/images/svg/NorthernWhite';
import PulsingWhiteImage from '../../assets/images/svg/PulsingWhite';
import PickerWhiteImage from '../../assets/images/svg/PickerWhite';
import IdleImage from '../../assets/images/svg/Idle';
import SunsetImage from '../../assets/images/svg/Sunset';
import AsleepImage from '../../assets/images/svg/Asleep';
import AwakeImage from '../../assets/images/svg/Awake';
import NorthernImage from '../../assets/images/svg/Northern';
import PulsingImage from '../../assets/images/svg/Pulsing';
import TemperatureImage from '../../assets/images/svg/Temperature';
import PickerImage from '../../assets/images/svg/Picker';

const {width: windowWidth} = Dimensions.get('window');

const INITIAL_INDEX = 0;
export default React.memo(function ShopCarousel(props) {
  const carouselRef     = useRef(null);
  const dispatch        = useDispatch();
  const {user}          = useSelector((state: RootReducerState) => state.auth);
  let device            = user.accounts[0]?.devices[0];
  let selectedLightShow = device.config?.light_show ? device.config.light_show : 'TEMPERATURE_THERMOMETER';

  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  const [data, setData] = useState([
    {
      uri:     <TemperatureAccount style={{}} />,
      title:   'temperature',
      content: 'Thermometer',
      backUri: BackgroundTemperature,
      items: [
        {
          id:        'TEMPERATURE_THERMOMETER',
          img:       <TemperatureImage style={{marginRight: 5}} />,
          imgActive: <TemperatureWhiteImage style={{marginRight: 5}} />,
          text:      'Temperature',
          isDeluxe:  false,
        },
      ],
    },
    {
      uri:     <Sun style={{}} />,
      title:   'light show',
      backUri: BackgroundSun,
      content: 'Thermometer',
      items: [
        {
          id:        'LIGHT_SHOW_SUNSET',
          img:       <SunsetWhiteImage style={{marginRight: 5}} />,
          imgActive: <SunsetImage style={{marginRight: 5}} />,
          text:      'Sunset',
          isDeluxe:  false,
        },
        {
          id:        'LIGHT_SHOW_NORTHERN_LIGHTS',
          img:       <NorthernWhiteImage style={{marginRight: 5}} />,
          imgActive: <NorthernImage style={{marginRight: 5}} />,
          text:      'Northern lights',
          isDeluxe:  false,
        },
        {
          id:        'LIGHT_SHOW_PULSING',
          img:       <PulsingWhiteImage style={{marginRight: 5}} />,
          imgActive: <PulsingImage style={{marginRight: 5}} />,
          text:      'Pulsing',
          isDeluxe:  true,
        },
        {
          id:        'LIGHT_SHOW_COLOUR_PICKER',
          img:       <PickerImage style={{marginRight: 5}} />,
          imgActive: <PickerWhiteImage style={{marginRight: 5}} />,
          text:      'Colour picker',
          isDeluxe:  true,
        },
      ],
    },
    {
      uri:      <Timer style={{}} />,
      title:    'sleep trainer',
      backUri:  BackgroundTimer2,
      content: 'Thermometer',
      items: [
        {
          id:       'SLEEP_TRAINER_IDLE',
          img:       <IdleImage style={{marginRight: 5}} />,
          imgActive: <IdleWhiteImage style={{marginRight: 5}} />,
          text:     'Idle',
          isDeluxe:  false,
        },
        {
          id:       'SLEEP_TRAINER_ASLEEP',
          img:       <AsleepWhiteImage style={{marginRight: 5}} />,
          imgActive: <AsleepImage style={{marginRight: 5}} />,
          text:      'Asleep',
          isDeluxe:  false,
        },
        {
          id:       'SLEEP_TRAINER_AWAKE',
          img:       <AwakeWhiteImage style={{marginRight: 5}} />,
          imgActive: <AwakeImage style={{marginRight: 5}} />,
          text:      'Awake',
          isDeluxe:  false,
        },
      ],
    },
  ]);

  const handleActiveItem = (item) => {
    if (device.is_online) {
      dispatch(setDeviceLightShow(item.id));

      if (['SLEEP_TRAINER_IDLE', 'SLEEP_TRAINER_ASLEEP', 'SLEEP_TRAINER_AWAKE'].indexOf(item.id) !== -1) {
        setCurrentIndex(2);
        carouselRef.current.scrollToIndex(2);
      } else if (['LIGHT_SHOW_COLOUR_PICKER', 'LIGHT_SHOW_PULSING', 'LIGHT_SHOW_NORTHERN_LIGHTS', 'LIGHT_SHOW_SUNSET'].indexOf(item.id) !== -1) {
        setCurrentIndex(1);
        carouselRef.current.scrollToIndex(1);
      } else if (['TEMPERATURE_THERMOMETER'].indexOf(item.id) !== -1) {
        setCurrentIndex(0);
        carouselRef.current.scrollToIndex(0);
      }
    }
  };

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }

  function renderItem({item, index}) {
    const {backUri, uri, title, content, items} = item;

    return (
      <TouchableOpacity
        disabled={index === currentIndex}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <View style={{alignItems: 'center'}}>
          <ImageBackground style={styles.shadowImage} source={backUri}>
            {uri}
          </ImageBackground>
        </View>
        <ScrollViewIndicator
          scrollIndicatorStyle={{
            width: 4,
            backgroundColor: '#fff',
            height: '70%',
          }}
          style={{paddinHorizontal: 220}}
          scrollIndicatorContainerStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          <View style={styles.lowerContainer}>
            <Text style={styles.titleText}>{title}</Text>
            {items.map((item, indexChild) => {
              if (!item.isDeluxe || (item.isDeluxe && device.is_deluxe)) {
                return (
                  <TouchableOpacity
                    disabled={!device.is_online}
                    onPress={() => handleActiveItem(item, indexChild)}
                    style={[
                      styles.card,
                      {
                        backgroundColor: device.is_online && item.id == selectedLightShow
                          ? item.id
                            ? '#72D3DB'
                            : 'rgba(255,255,255,0.2)'
                          : 'rgba(255,255,255,0.2)',
                      },
                    ]}>
                    {device.is_online && item.id == selectedLightShow ? item.img : item.imgActive}
                    <Text
                      style={[
                        styles.contentText,
                        {
                          color: device.is_online && item.id == selectedLightShow ? '#000'  : 'rgba(255,255,255,1)',
                          fontSize: Dimensions.get('window').width * 0.03
                        },
                      ]}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
          <View />
        </ScrollViewIndicator>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        useNativeDriver={true}
        style={styles.carousel}
        data={data}
        renderItem={renderItem}
        itemWidth={0.4 * windowWidth}
        inActiveOpacity={0.6}
        containerWidth={windowWidth}
        onScrollEnd={handleCarouselScrollEnd}
        ref={carouselRef}
        minScrollDistance={10}
      />
      
      <View style={{alignItems: 'center'}}>
        <SimplePaginationDot currentIndex={currentIndex} length={data.length} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
  carousel: {
    aspectRatio: 1.5,
    flexGrow: 0,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    flex: 1,
    borderRadius: 17,
    borderColor: 'white',
    elevation: 3,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 0.5,
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: 'white',
  },
  shadowImage: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightText: {color: 'white'},
  lowerContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
  },
  titleText: {
    fontWeight: 'bold',
    marginBottom: 16,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'AntagometricaBt-Regular',
  },
  contentText: {
    fontSize: 14,
  },
  card: {
    backgroundColor: '#699',
    borderRadius: 10,
    paddingHorizontal: 9,
    height: 60,
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
});
