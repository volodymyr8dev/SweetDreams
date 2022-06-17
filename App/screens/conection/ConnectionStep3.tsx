import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {customStyles} from '../../components/StepIndicator/StepIndicator';
// import serialNumber from '../../images/images/misty-serial-number.png';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import {Loader} from '../../components/Loader/Loader';
import NetInfo from '@react-native-community/netinfo';
// import WifiManager from 'react-native-wifi-reborn';

export const ConnectionStep3 = () => {
  const [currentPosition, setCurrentPosition] = useState(2);
  const [loader, setLoader] = useState(false);
  const [wifiName, setWifiName] = useState('');
  const [wifiPassword, setWififPassword] = useState('');

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   NetInfo.fetch().then(res => {
  //     console.log(res);
  //     Alert.alert('You are connected ');
  //   });
  // }, []);
  const ConnectToNetwork = async () => {
    // try {
    //   WifiManager.connectToProtectedSSID(wifiName, wifiPassword, false)
    //     .then(
    //       () => {
    //         console.log('connectToProtectedSSID successfully!');
    //       },
    //       reason => {
    //         console.log('connectToProtectedSSID failed!');
    //         console.log(reason);
    //       },
    //     )
    //     .catch(err => console.log('WIFI ERROR', err));
    // } catch (err) {
    //   console.log('ERR', err);
    // }
  };

  const handleGoToStep2 = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    navigation.navigate('account');
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
            <Text style={{color: '#23659D', fontSize: 19, marginBottom: 13}}>
              linking misty to your home Wi-Fi
            </Text>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{color: '#23659D'}}>
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
              <Text style={{fontWeight: 'bold'}}>Wi-Fi credentials</Text> are
              case sensitive. The password required is your home Wi-Fi password
              and not the password printed on the sticker on the base of the
              misty unit.
            </Text>
          </View>
          <TouchableOpacity
            onPress={ConnectToNetwork}
            style={{marginLeft: 100, width: 80, height: 20, marginBottom: 10}}>
            {/* <Text style={{color: '#fff'}}>1010100101010100</Text> */}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleGoToStep2}>
          <Text style={{color: '#fff'}}>adasdasdasdads</Text>
        </TouchableOpacity>
      </ScrollView>

      {loader && (
        <Loader text={`connecting your phone ${'\n'}to your misty unit`} />
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
    backgroundColor: '#201F3F',
    color: '#2371AB',
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
