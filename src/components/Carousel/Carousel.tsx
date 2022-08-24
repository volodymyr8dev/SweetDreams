import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
// import SvgUri from 'react-native-svg-uri';
import Carousel from 'react-native-anchor-carousel';
import {SimplePaginationDot} from './component';

import {useDispatch, useSelector} from 'react-redux';
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
import {setCarouselItem} from '../../redux/slice/SettingsSlice';
import {RootState} from '../../redux/configureStore';

const {width: windowWidth} = Dimensions.get('window');

const INITIAL_INDEX = 0;
export default React.memo(function ShopCarousel(props) {
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  const [data, setData] = useState([
    {
      uri: <TemperatureAccount style={{}} />,
      title: 'temperature',
      content: 'Thermometer',
      backUri: BackgroundTemperature,
      items: [
        {
          img: <TemperatureImage style={{marginRight: 5}} />,
          imgActive: <TemperatureWhiteImage style={{marginRight: 5}} />,
          text: 'Temperature',
          active: false,
        },
      ],
    },
    {
      uri: <Sun style={{}} />,
      title: 'light show',
      backUri: BackgroundSun,
      content: 'Thermometer',
      items: [
        {
          img: <SunsetWhiteImage style={{marginRight: 5}} />,
          imgActive: <SunsetImage style={{marginRight: 5}} />,
          text: 'Sunset',
          active: false,
        },
        {
          img: <NorthernWhiteImage style={{marginRight: 5}} />,
          imgActive: <NorthernImage style={{marginRight: 5}} />,
          text: 'Northern lights',
          active: false,
        },
        {
          img: <PulsingWhiteImage style={{marginRight: 5}} />,
          imgActive: <PulsingImage style={{marginRight: 5}} />,
          text: 'Pulsing',
          active: false,
        },
        {
          img: <PickerImage style={{marginRight: 5}} />,
          imgActive: <PickerWhiteImage style={{marginRight: 5}} />,
          text: 'Colour picker',
          active: false,
        },
      ],
    },
    {
      uri: <Timer style={{}} />,
      title: 'sleep trainer',
      backUri: BackgroundTimer2,
      content: 'Thermometer',

      items: [
        {
          img: <IdleImage style={{marginRight: 5}} />,
          imgActive: <IdleWhiteImage style={{marginRight: 5}} />,
          text: 'Idle',
          active: false,
        },
        {
          img: <AsleepWhiteImage style={{marginRight: 5}} />,
          imgActive: <AsleepImage style={{marginRight: 5}} />,
          text: 'Asleep',
          active: false,
        },
        {
          img: <AwakeWhiteImage style={{marginRight: 5}} />,
          imgActive: <AwakeImage style={{marginRight: 5}} />,
          text: 'Awake',
          active: false,
        },
      ],
    },
  ]);
  const [copyData, setCopyData] = useState([
    {
      uri: <TemperatureAccount style={{}} />,
      title: 'temperature',
      content: 'Thermometer',
      backUri: BackgroundTemperature,
      items: [
        {
          img: <TemperatureImage style={{marginRight: 5}} />,
          imgActive: <TemperatureWhiteImage style={{marginRight: 5}} />,
          text: 'Temperature',
          active: false,
        },
      ],
    },
    {
      uri: <Sun style={{}} />,
      title: 'light show',
      backUri: BackgroundSun,
      content: 'Thermometer',
      items: [
        {
          img: <SunsetWhiteImage style={{marginRight: 5}} />,
          imgActive: <SunsetImage style={{marginRight: 5}} />,
          text: 'Sunset',
          active: false,
        },
        {
          img: <NorthernWhiteImage style={{marginRight: 5}} />,
          imgActive: <NorthernImage style={{marginRight: 5}} />,
          text: 'Northern lights',
          active: false,
        },
      ],
    },
    {
      uri: <Timer style={{}} />,
      title: 'sleep trainer',
      backUri: BackgroundTimer2,
      content: 'Thermometer',

      items: [
        {
          img: <IdleImage style={{marginRight: 5}} />,
          imgActive: <IdleWhiteImage style={{marginRight: 5}} />,
          text: 'Idle',
          active: false,
        },
        {
          img: <AsleepWhiteImage style={{marginRight: 5}} />,
          imgActive: <AsleepImage style={{marginRight: 5}} />,
          text: 'Asleep',
          active: false,
        },
        {
          img: <AwakeWhiteImage style={{marginRight: 5}} />,
          imgActive: <AwakeImage style={{marginRight: 5}} />,
          text: 'Awake',
          active: false,
        },
      ],
    },
  ]);
  const {power} = useSelector(({power}) => power);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [isActive, setIsActive] = useState({arrayIndex: null, index: null});
  const [activeComponent, setActiveComponent] = useState(0);
  const dispatch = useDispatch();

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }

  function renderItem({item, index}) {
    const {backUri, uri, title, content, items} = item;
    console.log('item', item);
    const handleActiveItem = (item, indexChild) => {
      // props.setCarouselItem(item.text);
      dispatch(setCarouselItem(item.text));
      // setItemText(item.text);
      let array = [...data];
      array.map(it => {
        return it.items.map(child => (child.active = false));
      });

      array[index].items[indexChild].active =
        !array[index].items[indexChild].active;
      setData(array);
    };

    return (
      <TouchableOpacity
        disabled={index === currentIndex}
        style={styles.item}
        
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
          setActiveComponent(index);
        }}>
        <View style={{paddingTop: 10, alignItems: 'center'}}>
          <ImageBackground style={styles.shadowImage} source={backUri}>
            {uri}
          </ImageBackground>
        </View>
        <ScrollViewIndicator
          scrollIndicatorStyle={{
            width: 4,
            backgroundColor: '#fff',
            height: '60%',
          }}
          style={{paddinHorizontal: 220}}
          scrollIndicatorContainerStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          <View style={styles.lowerContainer}>
            <Text style={styles.titleText}>{title}</Text>
            {items.map((item, indexChild) => {
              console.log(item);
              if (user.accounts[0].is_deluxe === 1) {
                return (
                  <TouchableOpacity
                    disabled={index !== currentIndex || !power}
                    onPress={() => handleActiveItem(item, indexChild)}
                    style={[
                      styles.card,
                      {
                        backgroundColor: power
                          ? item.active
                            ? '#72D3DB'
                            : 'rgba(255,255,255,0.2)'
                          : 'rgba(255,255,255,0.2)',
                      },
                    ]}>
                    {item.active ? item.img : item.imgActive}
                    <Text
                      style={[
                        styles.contentText,
                        {
                          color: power
                            ? item.active
                              ? '#000'
                              : 'rgba(255,255,255,1)'
                            : 'rgba(255,255,255,1)',
                        },
                      ]}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                );
              } else {
                if (item.text === 'Pulsing' || item.text === 'Colour picker') {
                } else {
                  return (
                    <TouchableOpacity
                      disabled={index !== currentIndex || !power}
                      onPress={() => handleActiveItem(item, indexChild)}
                      style={[
                        styles.card,
                        {
                          backgroundColor: power
                            ? item.active
                              ? '#72D3DB'
                              : 'rgba(255,255,255,0.2)'
                            : 'rgba(255,255,255,0.2)',
                        },
                      ]}>
                      {item.active ? item.img : item.imgActive}
                      <Text
                        style={[
                          styles.contentText,
                          {
                            color: power
                              ? item.active
                                ? '#000'
                                : 'rgba(255,255,255,1)'
                              : 'rgba(255,255,255,1)',
                          },
                        ]}>
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                  );
                }
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
        style={styles.carousel}
        data={data}
        renderItem={renderItem}
        itemWidth={0.4 * windowWidth}
        inActiveOpacity={0.6}
        containerWidth={windowWidth - 20}
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
    // backgroundColor: '#141518',
    aspectRatio: 1.5,
    flexGrow: 0,
    marginBottom: 20,
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
