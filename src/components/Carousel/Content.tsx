import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ShopCarousel from './Carousel';
import React, {useState} from 'react';
import PowerOn from '../../assets/images/svg/PowerOn';
import PowerOff from '../../assets/images/svg/PowerOff';
import {ControlCard} from './ControlCard';
import {useDispatch, useSelector} from 'react-redux';
import {setPower} from '../../redux/slice/PowerSlice';
import AsleepImg from '../../assets/images/cloudImage/Asleep.png';
import Awake from '../../assets/images/cloudImage/Awake.png';
import Idle from '../../assets/images/cloudImage/Idle.png';
import SunSet from '../../assets/images/cloudImage/SunSet.png';
import NothernLights from '../../assets/images/cloudImage/NothernLights.png';
import Pulsing from '../../assets/images/cloudImage/Pulsing.png';
import ColorPicker from '../../assets/images/cloudImage/ColorPicker.png';
import ActiveOff from '../../assets/images/cloudImage/ActiveOff.png';
import TemperatureMore22 from '../../assets/images/cloudImage/TemperatureMore22.png';
import blue from '../../assets/images/cloudImage/blue.png';
import Yellow from '../../assets/images/cloudImage/Yellow.png';
import {RootState} from "../../redux/configureStore";

export const Content = props => {
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  const {carouselItem} = useSelector(({settings}) => settings);
  // console.log(carouselItem.split(' ').join(''));
  let itemImg = carouselItem.split(' ').join('');
  // const [isActive, setISActive] = useState(true);
  const dispatch = useDispatch();

  const handlePower = () => {
    dispatch(setPower(!props.isActive));
    props.setISActive(!props.isActive);
  };

  const cloudImage = {
    Idle: Idle,
    Asleep: AsleepImg,
    Awake: Awake,
    Sunset: SunSet,
    Northernlights: NothernLights,
    Pulsing: Pulsing,
    Colourpicker: ColorPicker,
    Temperature: props.temperatureImage > 22 ? TemperatureMore22 : props.temperatureImage < 17 ? blue : Yellow
  };

  return (
    <View>
      <View style={{alignItems: 'center'}}>
        {props.isActive ? (
          <Image
            source={cloudImage[itemImg]}
            style={{width: '100%', height: 350, bottom: '20%'}}
          />
        ) : (
          <Image
            source={ActiveOff}
            style={{width: '100%', height: 350, bottom: '20%'}}
          />
        )}
        <TouchableOpacity
          onPress={handlePower}
          style={{marginTop: '40%', width: 50, bottom: '65%'}}>
          {props.isActive ? <PowerOn /> : <PowerOff />}
        </TouchableOpacity>
      </View>
      <View style={{bottom: '37%'}}>
        {user.accounts[0].is_deluxe === 0 ? (<View style={{height: 100}}/>) : <ControlCard/>}
      </View>
      <View style={styles.containerCarousel}>
        <ShopCarousel />
      </View>
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
    bottom: '37%',
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
