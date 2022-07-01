import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import {CustomButton} from '../../components/CustomButton/CustomButton';
import background from '../../assets/images/homeIcon/bacgroundHome.png';
import sheep from '../../assets/images/controlChild/sheep.png';
import settings from '../../assets/images/homeIcon/settings.png';
import thermometr from '../../assets/images/controlChild/thermometr.png';
import line from '../../assets/images/homeIcon/line.png';
import childControl from '../../assets/images/controlChild/childControl.png';
import power from '../../assets/images/controlChild/power.png';
import play from '../../assets/images/controlChild/play.png';
import arrowBack from '../../assets/images/controlChild/arrowBack.png';
import arrowRight from '../../assets/images/controlChild/arrowRight.png';
import timer from '../../assets/images/controlChild/timer.png';
import lightShow from '../../assets/images/controlChild/lightsShow.png';
import Carousel from 'react-native-anchor-carousel';
import ShopCarousel from '../../components/Carousel/Carousel';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../styles/Constants';
import backgroundGrey from '../../assets/backGrey.png';
import powerOff from '../../assets/images/controlChild/powerOff.png';
import {useDispatch, useSelector} from 'react-redux';
import {setConnection, setPower} from '../../redux/slice/PowerSlice';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import ConfirmConnection from './ConfirmConnection';
import connectionStatus from '../../assets/images/homeIcon/connection.png';
const {width: windowWidth} = Dimensions.get('window');

const typeOfTemp = [
  'Harp',
  'Washing Machine',
  'Waves',
  'Car journey',
  'Appliance Mix',
  'Birds',
];

export const Account = () => {
  const carouselRef = React.useRef(null);
  const [button, toggleButton] = useState(false);
  const navigation = useNavigation();
  const [isActive, setISActive] = useState(true);
  const [isInternet, setIsInternet] = useState<boolean>(true);
  const handleConnect = () => {};
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const state = useSelector(state => state);
  const openSettings = () => {
    navigation.navigate('settingsAccount');
  };
  console.log('aaaaaaaaaaa', state);
  useEffect(() => {
    if (netInfo.isConnected) {
      console.log('ifcon', netInfo);
      dispatch(setConnection(true));
      setIsInternet(true);
    } else {
      setIsInternet(false);

      dispatch(setConnection(false));
    }
  }, [netInfo.isConnected]);

  const handlePower = () => {
    dispatch(setPower(!isActive));
    setISActive(!isActive);
  };

  // useEffect(() => {
  //   NetInfo.addEventListener(networkState => {
  //     console.log('Connection type - ', networkState.type);
  //     setIsInternet(networkState.isConnected);
  //     console.log('Is connected? - ', networkState.isConnected);
  //   });
  // }, [button]);
  //   console.log('Is connected? - ', isInternet);

  const HeaderUI = () => {
    return (
      <>
        <View style={styles.headerContainer}>
          <View></View>
          <Image source={sheep} />
          <TouchableOpacity onPress={openSettings}>
            <Image source={settings} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            // display: `${!netInfo.isConnected ? 'none' : 'flex'}`,
            marginBottom: 20,
            alignSelf: 'center',
          }}>
          <View style={styles.controlContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 20,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={thermometr} />
                <Text style={{color: '#fff', fontSize: 19}}>18.0*C</Text>
              </View>
              <View>
                <Image style={{marginHorizontal: 15}} source={line} />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={childControl} />
                <View style={{marginLeft: 10}}>
                  <Text style={{color: '#fff', fontSize: 19}}>OFF</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };
  const CardItem = () => {
    return (
      // <ScrollView>
      //   <View style={styles.cardCarousel}>
      //     <Image source={lightShow} />
      //     <Text style={{textAlign: 'center', color: 'white'}}>Light show</Text>
      //     <View style={{justifyContent: 'center', alignItems: 'center'}}>
      //       <TouchableOpacity
      //         style={{
      //           width: 140,
      //           height: 56,
      //           backgroundColor: '#72D3DB',
      //           borderRadius: 8,
      //           justifyContent: 'center',
      //           marginBottom: 8,
      //         }}>
      //         <Text style={{textAlign: 'center', alignItems: 'center'}}>
      //           Sunset
      //         </Text>
      //       </TouchableOpacity>
      //       <TouchableOpacity
      //         style={{
      //           width: 140,
      //           height: 56,
      //           backgroundColor: '#72D3DB',
      //           borderRadius: 8,
      //           justifyContent: 'center',
      //           marginBottom: 8,
      //         }}>
      //         <Text style={{textAlign: 'center', alignItems: 'center'}}>
      //           Northern {'\n'} lights
      //         </Text>
      //       </TouchableOpacity>
      //       <TouchableOpacity
      //         style={{
      //           width: 140,
      //           height: 56,
      //           backgroundColor: '#72D3DB',
      //           borderRadius: 8,
      //           justifyContent: 'center',
      //           marginBottom: 8,
      //         }}>
      //         <Text style={{textAlign: 'center', alignItems: 'center'}}>
      //           Northern {'\n'} lights
      //         </Text>
      //       </TouchableOpacity>
      //     </View>
      //   </View>
      // </ScrollView>
      <ShopCarousel />
    );
  };
  const ControlCard = () => {
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
          <Image style={{width: 16, height: 16}} source={play} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={switchLeft}>
            <Image style={{width: 25, height: 25}} source={arrowBack} />
          </TouchableOpacity>
          <View style={{width: 95}}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
              }}>
              {typeOfTemp.length && activeType.name.length > 10
                ? activeType.name.substring(0, 10).trim() + '...'
                : activeType.name}
            </Text>
          </View>
          <TouchableOpacity onPress={switchRight}>
            <Image style={{width: 25, height: 25}} source={arrowRight} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Image source={timer} />
        </TouchableOpacity>
      </View>
    );
  };
  const Content = () => (
    <>
      <TouchableOpacity
        onPress={handlePower}
        style={{alignItems: 'center', marginTop: '40%', paddingRight: 10}}>
        <Image source={isActive ? power : powerOff} />
      </TouchableOpacity>
      <ControlCard />
      <View style={styles.containerCarousel}>
        <ShopCarousel />
      </View>
    </>
  );
  return (
    <ImageBackground
      style={{backgroundColor: COLORS.backGround}}
      source={isActive ? background : backgroundGrey}>
      <View style={styles.container}>
        <HeaderUI toggleButton={toggleButton} />
        {/* {!netInfo.isConnected || !isInternet ? ( */}
          {/* <ConfirmConnection toggleButton={toggleButton} /> */}
        {/* ) : ( */}
          <Content />
        {/* )} */}
      </View>
    </ImageBackground>
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
