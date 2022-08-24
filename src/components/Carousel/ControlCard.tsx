import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowLeft from '../../assets/images/svg/ArrowLeft';
import Play from '../../assets/images/svg/Play';
import ArrowRight from '../../assets/images/svg/ArrowRight';
import timer from '../../assets/images/controlChild/timer.png';

const typeOfTemp = [
  'Harp',
  'Washing Machine',
  'Waves',
  'Car journey',
  'Appliance Mix',
  'Birds',
];

export const ControlCard = () => {
  const [activeType, setActiveType] = useState({
    name: typeOfTemp[0],
    index: 0,
  });
  console.log(activeType);

  const switchLeft = () => {
    if (activeType.index === 0) {
      setActiveType({
        name: typeOfTemp[typeOfTemp.length - 1],
        index: typeOfTemp.length - 1,
      });
    } else {
      setActiveType({
        name: typeOfTemp[activeType.index - 1],
        index: activeType.index - 1,
      });
    }
  };
  const switchRight = () => {
    console.log(typeOfTemp[0]);
    if (activeType.index == typeOfTemp.length - 1) {
      setActiveType({
        name: typeOfTemp[0],
        index: 0,
      });
    } else {
      setActiveType({
        name: typeOfTemp[activeType.index + 1],
        index: activeType.index + 1,
      });
    }
  };
  return (
    <View style={[styles.modalContainer, {}]}>
      <TouchableOpacity style={{flexDirection: 'row'}}>
        {/*<Image style={{width: 16, height: 16}} source={play} />*/}
        <Play />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={switchLeft}>
          {/*<Image style={{width: 25, height: 25}} source={arrowBack} />*/}
          <ArrowLeft />
        </TouchableOpacity>
        <View style={{width: 95}}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'AntagometricaBT-Bold',
              fontWeight: '400',
              fontSize: 16,
            }}>
            {typeOfTemp.length && activeType.name.length > 10
              ? activeType.name.substring(0, 10).trim() + '...'
              : activeType.name}
          </Text>
        </View>
        <TouchableOpacity onPress={switchRight}>
          {/*<Image style={{width: 25, height: 25}} source={arrowRight} />*/}
          <ArrowRight />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{flexDirection: 'row'}}>
        <Image source={timer} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    // backgroundColor: '#221B36',
    height: '100%',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: 200,
    backgroundColor: 'opacity',
    borderWidth: 1,
    borderColor: '#2A70AA',
  },
  controlContainer: {
    flexDirection: 'row',
  },
  modalContainer: {
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 15,
    flexDirection: 'row',
    height: Dimensions.get('window').height / 13,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  containerCarousel: {
    alignItems: 'center',
    // justifyContent:'center'
    // marginHorizontal: 20,
  },
  cardCarousel: {
    // width: 170,
    alignItems: 'center',
    borderRadius: 20,
    // padding: '11px 12px ',
    // backgroundColor: '#221B36',
  },
  carousel: {
    flexGrow: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 280,
  },
});
