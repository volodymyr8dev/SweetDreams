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
  Alert,
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
import PowerOn from '../../assets/images/svg/PowerOn';
import PowerOff from '../../assets/images/svg/PowerOff';
import Thermometer from '../../assets/images/svg/Thermometer';
import CryChild from '../../assets/images/svg/CryChild';
import TopGear from '../../assets/images/svg/TopGear';
import Sheep from '../../assets/images/svg/Sheep';
import ArrowRight from '../../assets/images/svg/ArrowRight';
import ArrowLeft from '../../assets/images/svg/ArrowLeft';
import Play from '../../assets/images/svg/Play';
import {SettingsDevice} from '../../api/Settings/SettingsApi';
import {RootState} from '../../redux/configureStore';
import {setAllSettings} from '../../redux/slice/SettingsSlice';

const {width: windowWidth} = Dimensions.get('window');

const typeOfTemp = [
  'Harp',
  'Washing Machine',
  'Waves',
  'Car journey',
  'Appliance Mix',
  'Birds',
];
type Nav = {
  navigate: (value: string, obj?: any) => void;
  setParams: (value: any) => void;
};
export const Account = () => {
  const carouselRef = React.useRef(null);
  const [toggleButton, setToggleButton] = useState(false);
  const navigation = useNavigation<Nav>();
  const [isActive, setISActive] = useState(true);
  const [isInternet, setIsInternet] = useState<boolean>(true);
  const handleConnect = () => {};
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  // const state = useSelector(state => state);
  // console.log(123456)
  const openSettings = async () => {
    // const data = await SettingsDevice(
    //   {"Child Lock": false},
    //   user.accounts[0].id,
    // );
    SettingsDevice({'Child Lock': false}, user.accounts[0].id)
      .then(res => {
        console.log(res);
        navigation.navigate('settingsAccount');
      })
      .catch(res => {
        console.log(res);
      });

    // SettingsDevice({Connection: 'connected'}, user.accounts[0].id)
    //   .then((res) => {
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     // Alert.alert(err.response.data.error);
    //   });
  };
  // useEffect(() => {
  //   if (netInfo.isConnected) {
  //     console.log('ifcon', netInfo);
  //     dispatch(setConnection(true));
  //     setIsInternet(true);
  //   } else {
  //     setIsInternet(false);

  //     dispatch(setConnection(false));
  //   }
  // }, [netInfo.isConnected]);

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
          <View style={{width: 21}} />
          <View style={{paddingRight: 10}}>
            {/*<Image source={sheep} />*/}
            <Sheep />
          </View>
          <TouchableOpacity onPress={openSettings}>
            {/*<Image source={settings} />*/}
            <TopGear />
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
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  width: 120,
                }}>
                <Thermometer />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 24,
                    fontFamily: 'AntagometricaBT-Regular',
                    fontWeight: 'bold',
                  }}>
                  18.0°C
                </Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image style={{marginHorizontal: 15}} source={line} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 120,
                }}>
                {/*<Image source={childControl} />*/}
                <CryChild />
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 24,
                      fontFamily: 'AntagometricaBT-Regular',
                      fontWeight: 'bold',
                    }}>
                    OFF
                  </Text>
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
  const Content = () => (
    <>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={handlePower}
          style={{marginTop: '40%', width: 50}}>
          {/*<Image source={isActive ? power : powerOff}/>*/}
          {isActive ? <PowerOn /> : <PowerOff />}
        </TouchableOpacity>
      </View>
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
        {/*{!netInfo.isConnected || !isInternet*/}
        {!toggleButton ? (
          <ConfirmConnection setToggleButton={setToggleButton} />
        ) : (
          <>
            <HeaderUI />
            <Content />
          </>
        )}
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
