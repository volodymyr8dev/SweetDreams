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

import {customStyles}               from '../../components/StepIndicator/StepIndicator';
import {CustomInput}                from '../../components/CustomInput/CustomInput';
import {Loader}                     from '../../components/Loader/Loader';
import {GetSalt, DeviceCertificate} from '../../api/Device/Device';
import {getCombinedNavigation}      from '../../hooks/useUpdateNavigationHeaderOptions';
import {COLORS}                     from '../../styles/Constants';

import background                   from '../../assets/images/homeIcon/backgroundHome.png';

export const ConnectionStep2 = ({navigation}) => {
  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'connect misty',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
      })
    )
  }, [navigation]);

  const [serialNumber,    setSerialNumber]    = useState('');
  const [certificate,     setCertificate]     = useState('');
  const [homeNetworkSSID, setHomeNetworkSSID] = useState('');

  const [loaderGettingSalt,                  setLoaderGettingSalt]                  = useState(false);
  const [loaderRetrievingTheCertificates,    setLoaderRetrievingTheCertificates]    = useState(false);
  const [loaderConnectingToTheDeviceNetwork, setLoaderConnectingToTheDeviceNetwork] = useState(false);
  const [loaderDetectHomeNetwork,            setLoaderDetectHomeNetwork]            = useState(false);

  const skipStep = () => {
    navigation.navigate('ConnectionStep3', {
      serial_number:     `${serialNumber}`,
      certificate:       `${certificate}`,
      home_network_ssid: `${homeNetworkSSID}`
    });
  }

  const handleGoToStep3 = () => {
    if (!serialNumber) {
      Alert.alert('Serial Number is required');
    } else {
      setLoaderDetectHomeNetwork(true);

      WifiManager.getCurrentWifiSSID().then(
        ssid => {
          setHomeNetworkSSID(ssid);
          console.log('[DEVICE CONFIGURATION] Retrieved the home network details', ssid);

          setLoaderDetectHomeNetwork(false);

          setTimeout(function() {
            setLoaderGettingSalt(true);
    
            GetSalt('misty').then(res => {
              let wifiSalt = res.data.data.salt;
              console.log('[DEVICE CONFIGURATION] Retrieved the Wi-Fi Salt', wifiSalt);
    
              setLoaderGettingSalt(false);
              setTimeout(function() {
                setLoaderRetrievingTheCertificates(true);
    
                /* Retrieve the certificate */
                DeviceCertificate().then(res => {
                  setCertificate(res.data.data);
                  console.log('[DEVICE CONFIGURATION] Certificate response', res);
    
                  setLoaderRetrievingTheCertificates(false);
                  
                  setTimeout(function() {
                    setLoaderConnectingToTheDeviceNetwork(true);
    
                    sha256(wifiSalt).then(hash1 => {
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
                              setLoaderConnectingToTheDeviceNetwork(false);
            
                              console.log('[DEVICE CONFIGURATION] Connected to the device network', res);
            
                              navigation.navigate('ConnectionStep3', {
                                serial_number:     `${serialNumber}`,
                                certificate:       `${certificate}`,
                                home_network_ssid: `${homeNetworkSSID}`
                              });
                            },
                            rej => {
                              setLoaderConnectingToTheDeviceNetwork(false);
            
                              Alert.alert('There is a problem with connecting to the device network');
            
                              console.error('[DEVICE CONFIGURATION] Error while connecting to the device network', rej)
                            },
                          );
                        });
                      });
                    });
                  }, 10);
                })
                .catch(rej => {
                  console.error('[DEVICE CONFIGURATION] Error while sending certificate request', rej);
    
                  Alert.alert('There is a problem with retrieving certificate from the server');
    
                  setLoaderRetrievingTheCertificates(false);
                });
              }, 10);
            })
            .catch(rej => {
              setLoaderGettingSalt(false);
    
              Alert.alert('There is a problem with getting the Wi-Fi salt');
    
              console.error('[DEVICE CONFIGURATION] Error while getting the Wi-Fi salt', rej)
            });
          }, 10);
        },
        () => {
          setLoaderDetectHomeNetwork(false);

          Alert.alert('There is a problem with your home network. Please, check your Wi-Fi connection.');
    
          console.error('[DEVICE CONFIGURATION] Error while getting the home network details');
          
        }
      );
    }
  };

  return (
    <ImageBackground style={{backgroundColor: COLORS.backGround}} source={background}>
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
        <TouchableOpacity
          onPress={skipStep}
          style={{backgroundColor: 'red', paddingLeft: 10, paddingRight: 10}}>
          <Text style={{color: 'white', paddingTop:10, paddingBottom:10}}>Skip this step (DEV MODE)</Text>
        </TouchableOpacity>
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
      {loaderGettingSalt && (<Loader text={'retrieving the configuration'} />)}
      {loaderRetrievingTheCertificates && <Loader text={'retrieving the certificates'} />}
      {loaderDetectHomeNetwork && <Loader text={'retrieving home network details'} />}
      {loaderConnectingToTheDeviceNetwork && (<Loader text={`connecting your phone ${'\n'}to your misty unit`} />)}
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