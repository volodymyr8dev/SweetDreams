import React, {useRef, useState} from 'react';
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
import mainTemp from '../../assets/images/controlChild/carosel/mainTemp.png';
import {mainTemp_temp} from '../../assets/images/controlChild/carosel/mainTemp_temp.svg';
import Bottle from '../../assets/images/svg/Bottle'

import sleapTrainer from '../../assets/images/controlChild/carosel/sleapTrainer.png';
import sun from '../../assets/images/controlChild/carosel/sun.png';

import greenTemp from '../../assets/images/controlChild/greentemp.png';
import tempGreen from '../../assets/images/controlChild/tempGreen.png';
import lightShadow from '../../assets/images/controlChild/lightShadow.png';
import light from '../../assets/images/controlChild/lightsShow.png';
import clock from '../../assets/images/controlChild/clock.png';
import clockShadow from '../../assets/images/controlChild/clockShadow.png';
import {useSelector} from 'react-redux';
import {COLORS} from '../../styles/Constants';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import ArrowRight from '../../assets/images/svg/ArrowRight';
import Play from '../../assets/images/svg/Play';
import TemperatureAccount from '../../assets/images/svg/TemperatureAccount';
import BackgroundTemperature from '../../assets/images/BackgroundTemperature.png';
import Sun from '../../assets/images/svg/Sun';
import Timer from '../../assets/images/svg/Timer';
import BackgroundTimer2 from '../../assets/images/BackgroundTimer2.png';
import BackgroundSun from '../../assets/images/BackgroundSun.png'

const {width: windowWidth} = Dimensions.get('window');

const INITIAL_INDEX = 0;
export default function ImageCarousel(props) {
  const [data, setData] = useState([
    {
      uri: <TemperatureAccount style={{}}/>,
      title: 'temperature',
      content: 'Thermometer',
      backUri: BackgroundTemperature,
      items: [
        {
          img: tempGreen,
          text: 'something',
          active: false,
        },
      ],
    },
    {
      uri: <Sun style={{}}/>,
      title: 'light show',
      backUri: BackgroundSun,
      content: 'Thermometer',
      items: [
        {
          img: tempGreen,
          text: 'something',
          active: false,
        },
        {
          img: tempGreen,
          text: 'Nestor',
          active: true,
        },
        {
          img: tempGreen,
          text: 'something',
          active: false,
        },
      ],
    },
    {
      uri: <Timer style={{}}/>,
      title: 'sleep trainer',
      backUri: BackgroundTimer2,
      content: 'Thermometer',

      items: [
        {
          img: tempGreen,
          text: 'something',
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
  console.log(power);
  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }

  function renderItem({item, index}) {
    const {backUri, uri, title, content, items} = item;
    console.log('item',item)
    const handleActiveItem = (item, indexChild) => {
      let array = [...data];
      array.map(it => {
        return it.items.map(child => (child.active = false));
      });

      array[index].items[indexChild].active =
        !array[index].items[indexChild].active;
      setData(array);
      // let array = data.map((obj, indexObj) => {
      //   if ((indexObj = index)) {
      //     console.log('zzzz',obj);
      //     return {...obj,obj.active:!obj.active };
      //   }
      //   return obj;
      // });
    };

    return (
      <TouchableOpacity
        // activeOpacity={1}
        disabled={index === currentIndex}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
          setActiveComponent(index);
        }}>
        <View style={{paddingTop: 10, alignItems: 'center'}}>
          <ImageBackground style={styles.shadowImage} source={backUri}>
            {/*<Image source={uri} />*/}
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
          // scrollIndicatorStyle={{backgroundColor: '#fff'}}
          scrollIndicatorContainerStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          <View style={styles.lowerContainer}>
            <Text style={styles.titleText}>{title}</Text>
            {items.map((item, indexChild) => {
              return (
                <TouchableOpacity
                  disabled={index !== currentIndex || !power}
                  onPress={() => handleActiveItem(item, indexChild)}
                  style={[
                    styles.card,
                    {
                      // backgroundColor: 'rgba(255,255,255,0.2)',
                      backgroundColor: power
                        ? item.active
                          ? '#72D3DB'
                          : 'rgba(255,255,255,0.2)'
                        : 'rgba(255,255,255,0.2)',
                    },
                  ]}>
                  {/* <Svg>
                    <Image source={item.img} />{' '}
                  </Svg> */}
                  {/* <SvgUri width="200" height="200" svgXmlData={item.img} /> */}
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
            })}
          </View>
          <View></View>
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
        inActiveOpacity={0.4}
        containerWidth={windowWidth - 20}
        onScrollEnd={handleCarouselScrollEnd}
        ref={carouselRef}
      />
      <View style={{alignItems: 'center'}}>
        <SimplePaginationDot currentIndex={currentIndex} length={data.length} />
      </View>
    </View>
  );
}

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
