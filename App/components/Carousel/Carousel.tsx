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
import Carousel from 'react-native-anchor-carousel';
import {SimplePaginationDot} from './component';
import mainTemp from '../../assets/images/controlChild/carosel/mainTemp.png';
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
const {width: windowWidth} = Dimensions.get('window');
import ScrollViewIndicator from 'react-native-scroll-indicator';
const items = [
  [
    {
      img: tempGreen,
      text: 'Thermometer',
    },
    {
      img: tempGreen,
      text: 'Thermometer2',
    },
    {
      img: tempGreen,
      text: 'Thermometer3',
    },
  ],
  [
    {
      img: tempGreen,
      text: 'Sunset',
    },
    {
      img: tempGreen,
      text: 'Northern lights',
    },
    {
      img: tempGreen,
      text: 'Pulsing',
    },
  ],
  [
    {
      img: tempGreen,
      text: 'Thermometer',
    },
    {
      img: tempGreen,
      text: 'Thermometer2',
    },
    {
      img: tempGreen,
      text: 'Thermometer3',
    },
  ],
];

const INITIAL_INDEX = 0;
export default function ImageCarousel(props) {
  const [data, setData] = useState([
    {
      uri: mainTemp,
      title: 'temperature',
      content: 'Thermometer',
      items: [
        {
          img: tempGreen,
          text: 'something',
          active: false,
        },
        {
          img: tempGreen,
          text: 'something',
          active: false,
        },
        {
          img: tempGreen,
          text: 'something',
          active: false,
        },
        {
          img: tempGreen,
          text: 'something',
          active: false,
        },
        {
          img: tempGreen,
          text: 'something',
          active: false,
        },
      ],
    },
    {
      uri: sleapTrainer,
      title: 'temperature',
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
      uri: sleapTrainer,
      title: 'temperature',
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
            <Image source={uri} />
          </ImageBackground>
        </View>

        <ScrollViewIndicator
          scrollIndicatorStyle={{
            width: 4,
            backgroundColor: '#fff',
            height: '70%',
          }}
          style={{paddinHorizontal: 220}}
          // scrollIndicatorStyle={{backgroundColor: '#fff'}}
          scrollIndicatorContainerStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}
          children={undefined}>
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
                  <Image source={tempGreen} />
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
                    {content}
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
    paddingVertical: 10,
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
    marginBottom: 7,
    fontSize: 18,
    color: '#fff',
  },
  contentText: {
    fontSize: 14,
  },
  card: {
    backgroundColor: '#699',
    borderRadius: 10,
    paddingHorizontal: 5,
    height: 50,
    width: '96%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },
});
