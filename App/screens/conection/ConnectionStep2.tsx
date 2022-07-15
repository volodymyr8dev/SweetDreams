import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {customStyles} from '../../components/StepIndicator/StepIndicator';
import serialNumberImage from '../../assets/images/misty-serial-number.png';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import {Loader} from '../../components/Loader/Loader';
import {ConnectDevice} from '../../api/Device/Device';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/configureStore';

type Nav = {
  navigate: (value: string) => void;
};

export const ConnectionStep2 = () => {
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [serialNumber, setSerialNumber] = useState('');
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation<Nav>();
  // const isFocused = useIsFocused();

  const handleGoToStep3 = () => {
    if (!serialNumber) {
      Alert.alert('Serial Number is required');
    } else {
      setLoader(true);
      ConnectDevice(user.accounts[0].id, serialNumber)
        .then(res => {
          if (res.data.success) {
            setLoader(false);
            navigation.navigate('conectionStep3', {title: 'connect misty'});
          }
        })
        .catch(res => {
          setLoader(false);
          Alert.alert(res.response.data.error);
        });

      //  setTimeout(() => {
      //   setLoader(false);
      //   navigation.navigate('conectionStep3',{title:"connect misty"});
      //  }, 1000);
    }
  };

  return (
    <>
      <ScrollView bounces={false} style={{backgroundColor: '#232041'}}>
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
            styling={styles.input}
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
              style={{width: 236, height: 236}}
              source={serialNumberImage}
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
      {loader && (
        <Loader text={`connecting your phone ${'\n'}to your misty unit`} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 19,
    paddingLeft: 19,
    paddingRight: 29,
    height: '100%',
    backgroundColor: '#232041',
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
    height: 76,
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
