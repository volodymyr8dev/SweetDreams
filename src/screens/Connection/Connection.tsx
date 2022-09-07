import React, {useEffect}         from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootReducerState}         from '../../redux';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Alert
} from 'react-native';

import {getCombinedNavigation} from '../../hooks/useUpdateNavigationHeaderOptions';
import {CustomButton}          from '../../components/CustomButton/CustomButton';
import {COLORS}                from '../../styles/Constants';

import background              from '../../assets/images/homeIcon/backgroundHome.png';
import {DisconnectDevice}      from '../../api/Device/Device';
import {checkLogin}            from '../../redux/slices/auth';

export const Connection = ({navigation}) => {
  const dispatch = useDispatch();
  const {user}   = useSelector((state: RootReducerState) => state.auth);
  let device     = user.accounts[0]?.devices[0];

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'connect misty',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
      })
    )
  }, [navigation]);

  const handleConnect = () => {
    navigation.navigate('ConnectionStep1');
  };

  const handleDisconnect = () => {
    DisconnectDevice(
      user.accounts[0].id,
      device.id
    ).then(res => {
      console.log('[DEVICE DISCONNECT] Device removed', res);

      dispatch(checkLogin());
    })
    .catch(rej => {
      console.error('[DEVICE DISCONNECt] Error while trying to remove device from the account', JSON.stringify(rej));

      Alert.alert('There is a problem with disconnection device from the account');
    });
  };

  return (
    <ImageBackground style={{backgroundColor: COLORS.backGround}} source={background}>
      <View style={{paddingTop: 19, paddingLeft: 19, paddingRight: 19, height: '100%'}}>
        <View style={styles.card}>
          <View style={{marginBottom: 5}}>
            <Image source={require('../../assets/images/Cloud.png')} style={{width: 35, height: 22}} />
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontFamily: 'AntagometricaBT-Bold' }}>
              your misty device{' '}
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ color: '#FFFFFF', fontFamily: 'AntagometricaBT-Regular' }}>
                Status:{' '}
              </Text>
              { device && device.is_connected
                ? <View
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: '#9EFCBE',
                      borderRadius: 5,
                      marginTop: 4,
                      marginRight: 5,
                    }}/>
                : <View
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: '#D65852',
                      borderRadius: 5,
                      marginTop: 4,
                      marginRight: 2,
                    }}/>
              }
              { device && device.is_connected ? <Text style={{color: '#FFFFFF', fontFamily: 'AntagometricaBT-Regular'}}>CONNECTED</Text> : <Text style={{color: '#FFFFFF', fontFamily: 'AntagometricaBT-Regular'}}>NOT CONNECTED</Text>}
            </View>
          </View>
          <View style={{marginBottom: 30}}>
          { !device || !device.is_connected
            ? <Text
                style={{color: '#FFFFFF', fontFamily: 'AntagometricaBT-Regular'}}>
                Your misty device is not connected
              </Text>
            : <Text
                style={{color: '#FFFFFF', fontFamily: 'AntagometricaBT-Regular'}}>
                Your misty device is connected
              </Text>
          }
          </View>
          <View>
          { !device || !device.is_connected
            ? <CustomButton
                styles={styles.button}
                handleOnSubmit={handleConnect}
                text="connect"
              />
            : <CustomButton
                styles={styles.button}
                handleOnSubmit={handleDisconnect}
                text="disconnect"
              />
          } 
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#36365D',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    height: 230,
  },
  button: {
    width: 200,
    backgroundColor: 'opacity',
    borderWidth: 1,
    borderColor: '#2A70AA',
  },
  content: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  buttonDown: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '120%',
    marginLeft: -14,
    height: 85,
    justifyContent: 'center',
    backgroundColor: '#1D1A34',
  },
});
