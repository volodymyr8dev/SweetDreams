import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import WifiManager from 'react-native-wifi-reborn';
import React, {useState, useEffect} from 'react';
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
// import serialNumber from '../../images/images/misty-serial-number.png';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import {Loader} from '../../components/Loader/Loader';
import NetInfo from '@react-native-community/netinfo';
import {
  ConnectDevice,
  ConnectHomeWifi,
  DeviceCertificate,
} from '../../api/Device/Device';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/configureStore';
import {setDeviceIdSerialNumber} from '../../redux/slice/slice';

export const ConnectionStep3 = () => {
  const [currentPosition, setCurrentPosition] = useState(2);
  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [loaderDiscconect, setloaderDiscconect] = useState(false);
  const [loaderConnectionHome, setloaderConnectionHome] = useState(false);
  const [wifiName, setWifiName] = useState('');
  const [wifiPassword, setWififPassword] = useState('');
  const [randomString, setRandomString] = useState('');
  const [randomString16, setRandomString16] = useState('');
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  // const isFocused = useIsFocused();
  const route = useRoute<any>();
  const serialNumber = route.params.serial_number;
  // console.log(route.params.serial_number);

  useEffect(() => {
    setLoader(true);
    DeviceCertificate()
      .then(res => {
        console.log(res);
        setLoader(false);
        generateRandomString36(36);
        generateRandomString16(16);
      })
      .catch(rej => {
        console.log(rej);
      });
  }, []);

  // useEffect(() => {
  //   NetInfo.fetch().then(res => {
  //     console.log(res);
  //     Alert.alert('You are connected ');
  //   });
  // }, []);
  // const ConnectToNetwork = async () => {
  //   try {
  //     console.log(wifiName, wifiPassword)
  //     WifiManager.connectToProtectedSSID(wifiName, wifiPassword, false)
  //       .then(
  //         () => {
  //           console.log('connectToProtectedSSID successfully!');
  //         },
  //         reason => {
  //           console.log('connectToProtectedSSID failed!');
  //           console.log(reason);
  //         },Qwerty12#
  //       )
  //       .catch(err => console.log('WIFI ERROR', err));
  //   } catch (err) {
  //     console.log('ERR', err);
  //   }
  // };

  const generateRandomString36 = lenth => {
    const char =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    const random = Array.from(
      {length: lenth},
      () => char[Math.floor(Math.random() * char.length)],
    );
    const randomString = random.join('');
    return setRandomString(randomString);
  };

  const generateRandomString16 = lenth => {
    const char =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    const random = Array.from(
      {length: lenth},
      () => char[Math.floor(Math.random() * char.length)],
    );
    const randomString16 = random.join('');
    return setRandomString16(randomString16);
  };

  console.log(randomString, 'randomStrin2gg36');
  console.log(randomString16, 'randomString16');

  // const handleGoToStep2 = () => {
  //   setLoader(true);
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 1000);
  //   navigation.navigate('account');
  // };
  const wifiConnect = () => {
    const arrayJson = [
      {'Wi-Fi': 'SSID', name: `${wifiName}`},
      {'Wi-Fi': 'SSID', pass: `${wifiPassword}`},
      {MQTT: 'server', IPv4: '167.172.50.187'},
      {MQTT: 'server', host: 'mistythecloudserver.com'},
      {MQTT: 'server', port: '8883'},
      {MQTT: 'server', authpass: `${randomString}`},
      {MQTT: 'server', mqttUser: `${randomString16}`},
    ];
    ConnectHomeWifi(arrayJson)
      .then(res => {
        console.log(res);
        // “MDIxe-12345678”
      })
      .catch(rej => {
        console.log(rej);
      });
    ConnectDevice(
      user.accounts[0].id,
      serialNumber,
      randomString,
      randomString16,
    )
      .then(res => {
        console.log(res);
        console.log(user.accounts);
        dispatch(setDeviceIdSerialNumber(res.data));
        setloaderDiscconect(true);
        disconnectFromSSid();

        setloaderConnectionHome(true);
        ConnectToHomeNetwork();
      })
      .catch(rej => {
        console.log(rej);
      });
  };

  const ConnectToHomeNetwork = async () => {
    WifiManager.connectToProtectedSSID(
      `${wifiName}`,
      `${wifiPassword}`,
      false,
    ).then(
      res => {
        console.log(res);
        console.log('Connected successfully!');
        setloaderConnectionHome(false);
        navigation.navigate('Accountt');
      },
      rej => {
        setloaderConnectionHome(false);
        console.log('Connection failed!', rej);
      },
    );
  };

  const disconnectFromSSid = async () => {
    WifiManager.disconnectFromSSID(`Misty-${serialNumber}`).then(
      res => {
        console.log(res);
        console.log('Connected successfully!');
        setloaderDiscconect(false);
      },
      rej => {
        setloaderDiscconect(false);
        console.log('Connection failed!', rej);
      },
    );
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
          {/*<TouchableOpacity*/}
          {/*  onPress={ConnectToNetwork}*/}
          {/*  style={{marginLeft: 100, width: 80, height: 20, marginBottom: 10}}>*/}
          {/*  <Text style={{color: '#fff'}}>1010100101010100</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>

        {/*<TouchableOpacity onPress={handleGoToStep2}>*/}
        {/*  <Text style={{color: '#fff'}}>Skip this step</Text>*/}
        {/*</TouchableOpacity>*/}

        {/*<TouchableOpacity*/}
        {/*  onPress={wifiConnect}*/}
        {/*  style={{ alignItems: 'center'}}>*/}
        {/*  <Text style={{color: '#fff',*/}
        {/*    fontSize: 19,*/}
        {/*    fontFamily: 'AntagometricaBT-Regular'}}>done</Text>*/}
        {/*</TouchableOpacity>*/}
      </ScrollView>
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

      {loader && <Loader text={'Pilling the certificates'} />}
      {loaderDiscconect && (
        <Loader text={'Disconneting from the device network'} />
      )}

      {/* <TouchableOpacity onPress={handleGoToStep2} style={styles.buttonDown}>
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
      </TouchableOpacity> */}
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
