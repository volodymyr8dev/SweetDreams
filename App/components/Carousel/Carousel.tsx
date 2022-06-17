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
import greenTemp from '../../assets/images/controlChild/greentemp.png';
import tempGreen from '../../assets/images/controlChild/tempGreen.png';
import lightShadow from '../../assets/images/controlChild/lightShadow.png';
import light from '../../assets/images/controlChild/lightsShow.png';
import clock from '../../assets/images/controlChild/clock.png';
import clockShadow from '../../assets/images/controlChild/clockShadow.png';
const {width: windowWidth} = Dimensions.get('window');

const data = [
  {
    backUri: greenTemp,
    uri: tempGreen,
    title: 'temperature',
    content: 'Thermometer',
  },
  {
    backUri: lightShadow,
    uri: light,
    title: 'light Show ',
    content: 'Sunset',
  },
  {
    backUri: clockShadow,
    uri: clock,
    title: 'sleep Trainer',
    content: 'idle',
  },
];

const INITIAL_INDEX = 0;
export default function ImageCarousel(props) {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }

  function renderItem({item, index}) {
    const {backUri, uri, title, content} = item;
    return (
      <View
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <View style={{paddingTop: 10, alignItems: 'center'}}>
          <ImageBackground style={styles.shadowImage} source={backUri}>
            <Image source={uri} />
          </ImageBackground>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.lowerContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <View style={styles.card}>
              <Image source={tempGreen} />
              <Text style={styles.contentText}>{content}</Text>
            </View>
            <View style={styles.card}>
              <Image source={tempGreen} />
              <Text style={styles.contentText}>{content}</Text>
            </View>
            <View style={styles.card}>
              <Image source={tempGreen} />
              <Text style={styles.contentText}>{content}</Text>
            </View>
            <View style={styles.card}>
              <Image source={tempGreen} />
              <Text style={styles.contentText}>{content}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
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
        containerWidth={windowWidth - 40}
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
    // borderWidth: 2,
    backgroundColor: '#707070',

    flex: 1,
    borderRadius: 17,
    borderColor: 'white',
    elevation: 3,
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
