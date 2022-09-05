import React, {useState, useEffect} from 'react';
import WifiManager                  from 'react-native-wifi-reborn';
import StepIndicator                from 'react-native-step-indicator';
import {sha256}                     from 'react-native-sha256';

import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';

import {useSelector}                from 'react-redux';
import {RootReducerState}           from '../../redux';
import {customStyles}               from '../../components/StepIndicator/StepIndicator';
import {CustomInput}                from '../../components/CustomInput/CustomInput';
import {Loader}                     from '../../components/Loader/Loader';
import {
  DeviceInit,
} from '../../api/Device/Device';
import {getCombinedNavigation}      from '../../hooks/useUpdateNavigationHeaderOptions';
import {COLORS}                     from '../../styles/Constants';

import background                   from '../../assets/images/homeIcon/backgroundHome.png';

export const ConnectionStep2 = ({navigation}) => {
  const { user } = useSelector((state: RootReducerState) => state.auth);

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'connect misty',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
      })
    )
  }, [navigation]);

  const [serialNumber, setSerialNumber] = useState('');

  const [loader, setLoader] = useState(false);

  const handleGoToStep3 = () => {
    let certificate,
        mqttUser,
        mqttPassword,
        mqttHost,
        mqttPort,
        homeNetworkSSID;

    if (!serialNumber) {
      Alert.alert('Serial Number is required');
    } else {
      setLoader(true);

      WifiManager.getCurrentWifiSSID().then(
        ssid => {
          homeNetworkSSID = ssid;
          console.log('[DEVICE CONFIGURATION] Retrieved the home network details', ssid);

          DeviceInit(user.accounts[0]?.id, serialNumber, 'MISTY').then(res => {
            certificate  = res.data?.certificate;
            mqttUser     = res.data?.credentials?.username;
            mqttPassword = res.data?.credentials?.password;
            mqttHost     = res.data?.credentials?.host;
            mqttPort     = res.data?.credentials?.port;

            console.log('[DEVICE CONFIGURATION] Retrieved the device configuration', res.data);
                  
            sha256(res.data.wifi_salt).then(hash1 => {
              console.log('[DEVICE CONFIGURATION] Hash 1', hash1);
    
              sha256(`Misty-${serialNumber}`).then(hash2 => {
                console.log('[DEVICE CONFIGURATION] Hash 2', hash2);
    
                let hashString = hash1.toUpperCase() + hash2.toUpperCase();
    
                console.log('[DEVICE CONFIGURATION] Hash 3', hashString);
                
                sha256(hashString).then(hash => {
                  let passphrase = hash.toUpperCase().slice(0, 32)
                  
                  console.log('[DEVICE CONFIGURATION] Connecting to the device network', `Misty-${serialNumber}`, `${passphrase}`)
                
                  WifiManager.connectToProtectedSSID(
                    `Misty-${serialNumber}`,
                    `${passphrase}`,
                    false,
                  ).then(
                    res => {
                      console.log('[DEVICE CONFIGURATION] Connected to the device network', res);

                      setLoader(false);
    
                      navigation.navigate('ConnectionStep3', {
                        serial_number:     serialNumber,
                        home_network_ssid: homeNetworkSSID,
                        mqtt_host:         mqttHost,
                        mqtt_port:         8883, //mqttPort,
                        mqtt_user:         mqttUser,
                        mqtt_password:     mqttPassword,
                        certificate:       certificate,
                      });
                    },
                    rej => {
                      Alert.alert('There is a problem with connecting to the device network');
    
                      console.error('[DEVICE CONFIGURATION] Error while connecting to the device network', rej);
                      
                      setLoader(false);
                    },
                  );
                });
              });
            })
          })
          .catch(rej => {
            Alert.alert('This device is already added to another account or there is a problem with retrieving its credentials');
  
            console.error('[DEVICE CONFIGURATION] Error while requesting credentials', rej.response.data);

            setLoader(false);
          });
        },
        () => {
          Alert.alert('There is a problem with your home network. Please, check your Wi-Fi connection.');
    
          console.error('[DEVICE CONFIGURATION] Error while getting the home network details');

          setLoader(false);
        }
      );
    }
  };

  return (
    <ImageBackground style={{backgroundColor: COLORS.backGround, height: '100%'}} source={background}>
      <ScrollView>
        <View style={styles.container}>
          <StepIndicator stepCount={3} customStyles={customStyles} currentPosition={1} />
          <View style={{marginTop: 30}}>
            <Text
              style={{
                color: '#23659D',
                fontSize: 19,
                marginBottom: 13,
                fontFamily: 'AntagometricaBT-Bold',
              }}>
              let's connect misty
            </Text>
          </View>
          <View style={{marginBottom: 15}}>
            <Text
              style={{color: '#23659D', fontFamily: 'AntagometricaBT-Regular'}}>
              Please enter you misty serial number
            </Text>
          </View>
          <CustomInput
            text={'Serial Number'}
            value={serialNumber}
            onChangeText={number => setSerialNumber(number)}
          />
          <View style={{marginTop: 15}}>
            <Text style={styles.answer}>
              <Text style={{color: '#CA57E7'}}>*</Text>{' '}
              <Text style={{fontFamily: 'AntagometricaBT-Regular'}}>
                Serial number
              </Text>{' '}
              is case sensitive and can be found on a sticker on the base of the
              unit.
            </Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 32}}>
            <Image
              source={require('../../assets/images/gif/SerialNumberGifCloud.gif')}
              style={{width: 236, height: 236}}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={handleGoToStep3} style={styles.buttonDown}>
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
      {loader && (<Loader text={'taking misty online'} />)}
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
  card: {
    backgroundColor: '#36365D',
    borderRadius: 13,
    height: 268,
    padding: 15,
    marginTop: 30,
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
  },
});
