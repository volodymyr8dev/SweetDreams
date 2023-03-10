import React, {useEffect} from 'react';
import {useSelector}      from 'react-redux';
import {RootReducerState} from '../../redux';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import {COLORS}         from '../../styles/Constants';
import ConnectionCloud  from '../../assets/images/svg/ConnectionCloud';
import ConnectionCloud2 from '../../assets/images/svg/ConnectionCloud2';
import background       from '../../assets/backOrigin.png';
import Sheep            from '../../assets/images/svg/Sheep';

const ConfirmConnection = ({navigation, setToggleButton}) => {
  const {user} = useSelector((state: RootReducerState) => state.auth);

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation]);

  const handleCheckInternet = () => {
    if (user.accounts[0]?.device?.is_active) {
      setToggleButton(true);
    } else {
      navigation.navigate('Connection');
    }
  };

  return (
    <View
      style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <ImageBackground
        source={background}
        style={{
          backgroundColor: COLORS.back,
          height: '110%',
          width: 500,
          alignItems: 'center',
          flex: 1
        }}>
        <View style={{top: 100}}>
          <View style={{alignItems: 'center'}}>
            <Sheep style={{bottom: 20}} />
            <ConnectionCloud2 style={{top: '10%'}} />
            <ConnectionCloud style={{bottom: '10%'}}/>
          </View>
          <View style={{bottom: '15%'}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 24,
                textAlign: 'center',
                marginBottom: "5%",
                fontFamily: 'AntagometricaBT-Regular',
              }}>
              confirm connection
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                textAlign: 'center',
                marginBottom: 7,
                fontFamily: 'AntagometricaBT-Regular',
              }}>
              Please check your connection
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                textAlign: 'center',
                fontFamily: 'AntagometricaBT-Regular',
              }}>
              Ensure you have a stable internet connection
            </Text>
          </View>
          <View style={{bottom: '10%', alignItems: 'center'}}>
            <TouchableOpacity onPress={handleCheckInternet}>
              <View
                style={{
                  borderWidth: 1,
                  padding: 15,
                  borderRadius: 50,
                  borderColor: '#2C8AD0',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontFamily: 'AntagometricaBT-Regular',
                  }}>
                  check connection
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ConfirmConnection;
