
import React, {useState, useEffect} from 'react';
import WifiManager                  from 'react-native-wifi-reborn';
import StepIndicator                from 'react-native-step-indicator';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native'

import {useDispatch, useSelector}            from 'react-redux';
import {RootReducerState}                    from '../../redux';
import {customStyles}                        from '../../components/StepIndicator/StepIndicator';
import {CustomInput}                         from '../../components/CustomInput/CustomInput';
import {Loader}                              from '../../components/Loader/Loader';
import {ConnectDevice, PublishConfiguration} from '../../api/Device/Device';
import {getCombinedNavigation}               from '../../hooks/useUpdateNavigationHeaderOptions';
import {checkLogin}                          from '../../redux/slices/auth';

import {COLORS}                              from '../../styles/Constants';

import background                   from '../../assets/backOrigin.png';

export const ConnectionStep3 = ({navigation, route}) => {
  const { user } = useSelector((state: RootReducerState) => state.auth);
  const dispatch  = useDispatch();

  const [loader, setLoader]              = useState(false);
  
  const [wifiName,     setWifiName]      = useState(route.params.home_network_ssid);
  const [wifiPassword, setWifiPassword]  = useState('');

  const [certificate, setCertificate]    = useState(route.params.certificate);
  const [mqttHost, setMqttHost]          = useState(route.params.mqtt_host);
  const [mqttPort, setMqttPort]          = useState(route.params.mqtt_port);
  const [authUser, setAuthUser]          = useState(route.params.mqtt_user);
  const [authPassword, setAuthPassword]  = useState(route.params.mqtt_password);
  const [serialNumber, setSerialNumber]  = useState(route.params.serial_number);


  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'connect misty',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
      })
    )
  }, [navigation]);

  const wifiConnect = () => {
    setLoader(true);

    /* Configure the device */
    PublishConfiguration([
      {'Wi-Fi': 'SSID',   name:     `${wifiName}`},
      {'Wi-Fi': 'SSID',   pass:     `${wifiPassword}`},
      {'MQTT':  'server', IPv4:     `${mqttHost}`},
      {'MQTT':  'server', port:     `${mqttPort}`},
      {'MQTT':  'server', authcert: `${certificate}`},
      {'MQTT':  'server', mqttUser: `${authUser}`},
      {'MQTT':  'server', authpass: `${authPassword}`},
    ]).then(res => {
      console.log('[DEVICE CONFIGURATION] Configuration response', res);

      WifiManager.disconnectFromSSID(`Misty-${serialNumber}`).then(res => {
        console.log('[DEVICE CONFIGURATION] Disconneted from the device network', res);

        /* Timeout for 5 secs */
        setTimeout(() => {
          WifiManager.connectToProtectedSSID(
            `${wifiName}`,
            `${wifiPassword}`,
            false,
          ).then(
            res => {
              console.log('[DEVICE CONFIGURATION] Connected to a home network', res);

              ConnectDevice(
                user.accounts[0].id,
                serialNumber
              ).then(res => {
                console.log('[DEVICE CONFIGURATION] Assigned device to the account', res);
          
                dispatch(checkLogin());
              })
              .catch(rej => {
                console.error('[DEVICE CONFIGURATION] Error while trying to assign device to the account', JSON.stringify(rej));
          
                Alert.alert(rej?.response?.data?.error ? rej.response.data.error :'There is a problem with assigning device to the account');
          
                dispatch(checkLogin());
              });
            },
            rej => {
              console.error('[DEVICE CONFIGURATION] Error while connecting to a home network', rej);

              Alert.alert('There is a problem with connecting to a home network');

              setLoader(false);
            }
          );
        }, 25000);
      }, rej => {
        console.error('[DEVICE CONFIGURATION] Error while tying to disconnect from device network', rej);

        Alert.alert('There is a problem with disconnecting from the device network');

        setLoader(false);
      });
    })
    .catch(rej => {
      console.error('[DEVICE CONFIGURATION] Error while sending configuration request', rej);

      Alert.alert('There is a problem with pushing a configuration to the device');

      setLoader(false);
    });
  };

  return (
    <ImageBackground style={{backgroundColor: COLORS.backGround, height: '100%', flex: 1}} source={background}>
      <ScrollView>
        <View style={styles.container}>
          <StepIndicator stepCount={3} customStyles={customStyles} currentPosition={2} />

          <View style={{marginTop: 30}}>
            <Text
              style={{
                color: '#23659D',
                fontSize: 19,
                marginBottom: 13,
                fontFamily: 'AntagometricaBT-Bold',
              }}>
              linking misty to your home Wi-Fi
            </Text>
          </View>
          <View style={{marginBottom: 15}}>
            <Text
              style={{color: '#23659D', fontFamily: 'AntagometricaBT-Regular'}}>
              Please enter your Wi-Fi name and password
            </Text>
          </View>

          <CustomInput text={'Wi-Fi name'} value={wifiName} onChangeText={name => setWifiName(name)} />
          <CustomInput text={'Your Wi-Fi password'} hidden={true} value={wifiPassword} onChangeText={password => setWifiPassword(password)} secure={true} />
          <View style={{marginTop: 15}}>
            <Text style={styles.answer}>
              <Text style={{color: '#CA57E7'}}>*</Text>{' '}
              <Text style={{fontFamily: 'AntagometricaBT-Regular'}}>
                Wi-Fi credentials
              </Text>{' '}
              are case sensitive. The password required is your home Wi-Fi
              password and not the password printed on the sticker on the base
              of the misty unit.
            </Text>
          </View>
        </View>
      </ScrollView>

      {loader && <Loader text={'taking misty online'} />}

      <TouchableOpacity onPress={wifiConnect} style={styles.buttonDown}>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: 'AntagometricaBT-Bold',
            }}>
            next
          </Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 19,
    paddingLeft: 19,
    paddingRight: 29,
    height: '100%',
    paddingBottom: 100,
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
    width: '105%',
    marginLeft: -14,
    height: 85,
    justifyContent: 'center',
    backgroundColor: '#1D1A34',
  },
  answer: {
    fontSize: 15,
    color: '#235B91',
    fontFamily: 'AntagometricaBT-Regular',
  },
});
