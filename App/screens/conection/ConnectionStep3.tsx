import {useNavigation, useRoute} from '@react-navigation/native';
import WifiManager from 'react-native-wifi-reborn';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {customStyles} from '../../components/StepIndicator/StepIndicator';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import {Loader} from '../../components/Loader/Loader';
import NetInfo from '@react-native-community/netinfo';
import {ConnectDevice, PublishConfiguration} from '../../api/Device/Device';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/configureStore';
import {setDeviceIdSerialNumber} from '../../redux/slice/slice';

export const ConnectionStep3 = () => {
  const [currentPosition, setCurrentPosition] = useState(2);

  const dispatch   = useDispatch();
  const navigation = useNavigation();
  const route      = useRoute<any>();

  const serialNumber    = route.params.serial_number;
  const certificate     = route.params.certificate;
  const homeNetworkSSID = route.params.home_network_ssid;

  const {user} = useSelector(({account}: RootState) => account.userInformation);

  const [loaderPushingTheConfiguration,     setPushingTheConfiguration]           = useState(false);
  const [loaderDisconnectFromDeviceNetwork, setLoaderDisconnectFromDeviceNetwork] = useState(false);
  const [loaderConnectiongToAHomeNetwork,   setLoaderConnectiongToAHomeNetwork]   = useState(false);
  const [loaderAddingDeviceToAccount,       setLoaderAddingDeviceToAccount]       = useState(false);
  
  const [wifiName,     setWifiName]      = useState(homeNetworkSSID);
  const [wifiPassword, setWififPassword] = useState('');

  const generateRandomString = length => {
    const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    
    const random = Array.from(
      {length: length},
      () => char[Math.floor(Math.random() * char.length)],
    );
    
    return random.join('');
  };

  const wifiConnect = () => {
    setPushingTheConfiguration(true);

    let authUser     = generateRandomString(16),
        authPassword = generateRandomString(32)

    /* Configure the device */
    PublishConfiguration([
      {'Wi-Fi': 'SSID',   name:     `${wifiName}`},
      {'Wi-Fi': 'SSID',   pass:     `${wifiPassword}`},
      {'MQTT':  'server', IPv4:     '167.172.50.187'},
      {'MQTT':  'server', host:     'mistythecloudserver.com'},
      {'MQTT':  'server', port:     '8883'},
      {'MQTT':  'server', authcert: `${certificate}`},
      {'MQTT':  'server', authpass: `${authPassword}`},
      {'MQTT':  'server', mqttUser: `${authUser}`},
    ]).then(res => {
      console.log('[DEVICE CONFIGURATION] Configuration response', res);

      setPushingTheConfiguration(false);

      setTimeout(function() {
        setLoaderDisconnectFromDeviceNetwork(true);

        WifiManager.disconnectFromSSID(`Misty-${serialNumber}`).then(res => {
          console.log('[DEVICE CONFIGURATION] Disconneted from the device network', res);
          setLoaderDisconnectFromDeviceNetwork(false);

          setTimeout(function() {
            setLoaderConnectiongToAHomeNetwork(true);

            WifiManager.connectToProtectedSSID(
              `${wifiName}`,
              `${wifiPassword}`,
              false,
            ).then(
              res => {
                console.log('[DEVICE CONFIGURATION] Connected to a home network', res);

                setLoaderConnectiongToAHomeNetwork(false);

                setTimeout(function() {
                  setLoaderAddingDeviceToAccount(true);

                  ConnectDevice(
                    user.accounts[0].id,
                    serialNumber,
                    authUser,
                    authPassword,
                  ).then(res => {
                    console.log('[DEVICE CONFIGURATION] Assigned device to the account', res);
                    dispatch(setDeviceIdSerialNumber(res.data));

                    setLoaderAddingDeviceToAccount(false);

                    navigation.navigate('Account');
                  })
                  .catch(rej => {
                    console.error('[DEVICE CONFIGURATION] Error while trying to assign device to the account', rej);

                    Alert.alert('There is a problem with assigning device to the account');

                    setLoaderAddingDeviceToAccount(false);
                  });
                }, 10);
              },
              rej => {
                console.error('[DEVICE CONFIGURATION] Error while connecting to a home network', rej);

                Alert.alert('There is a problem with dconnecting to a home network');

                setLoaderConnectiongToAHomeNetwork(false);
              },
            );
          }, 10);
        }, rej => {
          console.error('[DEVICE CONFIGURATION] Error while tying to disconnect from device network', rej);

          Alert.alert('There is a problem with disconnecting from the device network');

          setLoaderDisconnectFromDeviceNetwork(false);
        });
      }, 10);
    })
    .catch(rej => {
      console.error('[DEVICE CONFIGURATION] Error while sending configuration request', rej);

      Alert.alert('There is a problem with pushing a configuration to the device');

      setPushingTheConfiguration(false);
    });
  };

  return (
    <>
      <ScrollView
        bounces={false}
        style={{backgroundColor: '#25244C', position: 'relative'}}>
        <View style={styles.container}>
          <StepIndicator
            stepCount={3}
            customStyles={customStyles}
            currentPosition={currentPosition}
            onPress={() => setCurrentPosition(prev => prev + 1)}
          />

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

          <CustomInput
            styling={styles.input}
            text={'Wi-Fi name'}
            value={wifiName}
            onChangeText={name => setWifiName(name)}
          />
          <CustomInput
            styling={styles.input}
            text={'Your Wi-Fi password'}
            hidden={true}
            value={wifiPassword}
            onChangeText={password => setWififPassword(password)}
            secure={true}
          />
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

        <TouchableOpacity
          onPress={wifiConnect}
          style={{backgroundColor: 'red'}}>
          <Text style={{color: 'white'}}>Skip this step (DEV MODE)</Text>
        </TouchableOpacity>
      </ScrollView>

      {loaderPushingTheConfiguration && <Loader text={'Pushing a config to the device'} />}
      {loaderDisconnectFromDeviceNetwork && <Loader text={'Disconnecting from tje device network'} />}
      {loaderConnectiongToAHomeNetwork && <Loader text={'Connecting to a home network'} />}
      {loaderAddingDeviceToAccount && <Loader text={'Saving the device state'} />}

      <TouchableOpacity onPress={wifiConnect} style={styles.buttonDown}>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 19,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            next
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 19,
    paddingLeft: 19,
    paddingRight: 29,
    height: '100%',
    backgroundColor: '#25244C',
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#36365D',
    borderRadius: 13,
    height: 268,
    padding: 15,
    marginTop: 30,
  },
  input: {
    marginLeft: -20,
    width: '115%',
    borderRadius: 0,
    height: 76,
    backgroundColor: '#201F3F',
    color: '#2371AB',
    fontFamily: 'AntagometricaBT-Regular',
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
  cardListInfo: {
    color: '#fff',
    fontSize: 14,
  },
  cardList: {
    marginVertical: 17,
    color: '#fff',
    fontSize: 14,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
  },
  question: {
    color: '#23659D',
    marginTop: 26,
    marginBottom: 10,
    fontSize: 19,
  },
  answer: {
    fontSize: 15,
    color: '#235B91',
    fontFamily: 'AntagometricaBT-Regular',
  },
});
