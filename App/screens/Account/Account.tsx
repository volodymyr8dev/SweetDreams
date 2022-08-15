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
import {getSettingsDevice} from '../../api/Settings/SettingsApi';
import {RootState} from '../../redux/configureStore';
import {setAllSettings} from '../../redux/slice/SettingsSlice';
import AsleepImg from '../../assets/images/cloudImage/Asleep.png';
import Awake from '../../assets/images/cloudImage/Awake.png';
import Idle from '../../assets/images/cloudImage/Idle.png';
import SunSet from '../../assets/images/cloudImage/SunSet.png';
import NothernLights from '../../assets/images/cloudImage/NothernLights.png';
import {Content} from '../../components/Carousel/Content';

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
  const [temperatureImage, setTemperatureImage] = useState('20.0');
  const handleConnect = () => {};
  const dispatch = useDispatch();
  // const [carouselItem, setCarouselItem] = useState('');
  const netInfo = useNetInfo();
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  const [is_deluxe, setIsDeluxe] = useState(user.accounts[0].is_deluxe);
  console.log(user.accounts[0].is_deluxe, 'dadadadad');

  const openSettings = async () => {
    getSettingsDevice(user.accounts[0].id)
      .then(res => {
        console.log(res);
        navigation.navigate('settingsAccount', {data: res.data.data});
      })
      .catch(res => {
        console.log(res);
      });
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
      <View>
        <View style={styles.headerContainer}>
          <View style={{width: 21}} />
          <View style={{paddingRight: 10}}>
            {/*<Image source={sheep} />*/}
            <Sheep />
          </View>
          <TouchableOpacity onPress={openSettings}>
            <View style={{height: 20, width: 20}} />
            <TopGear style={{bottom: 22, right: 2}} />
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
                {!isActive ? (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 24,
                      fontFamily: 'AntagometricaBT-Regular',
                      fontWeight: 'bold',
                    }}>
                    N/A
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 24,
                      fontFamily: 'AntagometricaBT-Regular',
                      fontWeight: 'bold',
                    }}>
                    {temperatureImage}°C
                  </Text>
                )}
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
                {is_deluxe === 0 ? <View /> : <CryChild />}
                <View style={{marginLeft: 10}}>
                  {is_deluxe === 0 ? (
                    <View />
                  ) : !isActive ? (
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 24,
                        fontFamily: 'AntagometricaBT-Regular',
                        fontWeight: 'bold',
                      }}>
                      N/A
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 24,
                        fontFamily: 'AntagometricaBT-Regular',
                        fontWeight: 'bold',
                      }}>
                      OFF
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      style={{backgroundColor: COLORS.backGround}}
      source={isActive ? background : backgroundGrey}>
      <View style={styles.container}>
        {/*{!netInfo.isConnected || !isInternet*/}
        {user.accounts[0].device === null ? (
          <ConfirmConnection setToggleButton={setToggleButton} />
        ) : (
          <>
            <HeaderUI />
            <Content
              setISActive={setISActive}
              isActive={isActive}
              temperatureImage={temperatureImage}
            />
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
