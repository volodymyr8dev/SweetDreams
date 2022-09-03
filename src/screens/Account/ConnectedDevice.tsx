import React, {useState, useEffect}  from 'react';
import {useSelector}      from 'react-redux';
import {RootReducerState} from '../../redux';

import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import background from '../../assets/images/homeIcon/backgroundHome.png';
import line from '../../assets/images/homeIcon/line.png';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../styles/Constants';
import backgroundGrey from '../../assets/backGrey.png';
import Thermometer from '../../assets/images/svg/Thermometer';
import CryChild from '../../assets/images/svg/CryChild';
import TopGear from '../../assets/images/svg/TopGear';
import Sheep from '../../assets/images/svg/Sheep';
import {getSettingsDevice} from '../../api/Settings/Settings';
import {Content} from '../../components/Carousel/Content';

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
export const ConnectedDevice = ({navigation}) => {
  const { user } = useSelector((state: RootReducerState) => state.auth);

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation]);

  const [isActive, setISActive] = useState(true);
  const [temperatureImage, setTemperatureImage] = useState('20.0');

  const openSettings = async () => {
    getSettingsDevice(user.accounts[0].id)
      .then(res => {
        navigation.navigate('settingsAccount', {data: res.data.data});
      })
      .catch(res => {
      });
  };

  const HeaderUI = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <View style={{width: 21}} />
          <View style={{paddingRight: 10}}>
            <Sheep />
          </View>
          <TouchableOpacity onPress={openSettings}>
            <View style={{height: 20, width: 20}} />
            <TopGear style={{bottom: 22, right: 2}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
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
                style={
                  user.accounts[0].is_deluxe === 0
                    ? {
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: 120,
                        left: '17%',
                      }
                    : {
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: 120,
                      }
                }>
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
                <Image
                  style={
                    user.accounts[0].is_deluxe === 0
                      ? {bottom: 1000}
                      : {marginHorizontal: 15}
                  }
                  source={line}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 120,
                }}>
                {user.accounts[0].is_deluxe === 0 ? <View /> : <CryChild />}
                <View style={{marginLeft: 10}}>
                  {user.accounts[0].is_deluxe === 0 ? (
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
    <ImageBackground style={{backgroundColor: COLORS.backGround}} source={isActive ? background : backgroundGrey}>
      <View style={styles.container}>
        <HeaderUI />
        <Content setISActive={setISActive} isActive={isActive} temperatureImage={temperatureImage} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
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
