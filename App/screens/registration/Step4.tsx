import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import DatePicker from 'react-native-date-picker';
import StepIndicator from 'react-native-step-indicator';
import {useDispatch, useSelector} from 'react-redux';
import {PostChild} from '../../api/CreateAccount/CreateAccount';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import {Loader} from '../../components/Loader/Loader';
import {customStyles} from '../../components/StepIndicator/StepIndicator';
import {setLoader} from '../../redux/slice/slice';

type Nav = {
  navigate: (value: string) => void;
};

export const Step4 = () => {
  const [currentPosition, setCurrentPosition] = useState(3);
  const navigation = useNavigation<Nav>();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [visibleData, setVisibleData] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState(null);
  const dispatch = useDispatch();
  const global = useSelector(({account}) => account);
  const verticalStaticData = [
    {
      id: 0,
      text: 'boy',
      style: {
        textDecoration: 'none',
      },
      iconStyle: {
        borderColor: '#CCC',
      },
      fillColor: 'transparent',
      unfillColor: 'transparent',
      textStyle: {textDecorationLine: 'none'},
    },
    {
      id: 1,
      text: 'girl',
      style: {
        marginLeft: 20,
      },
      iconStyle: {
        borderColor: '#CCC',
      },
      fillColor: 'transparent',
      unfillColor: 'transparent',
      textStyle: {textDecorationLine: 'none'},
    },
  ];
  //   useEffect(() => {
  //     navigation.setParams({
  //       position: currentPosition,
  //       setPosition: setCurrentPosition,
  //     });
  //   }, [currentPosition]);

  const handleGoTo5 = () => {
    navigation.navigate('step4');

    let nameRegex = /^[a-zA-Z\-]+$/;
    if (name.length > 2 && nameRegex.test(name) == true) {
      if (
        moment(date).format('DD-MM-YYYY') !==
        moment(new Date()).format('DD-MM-YYYY')
      ) {
        if (gender !== null) {
          dispatch(setLoader(true));
          PostChild(name, date, gender)
            .then(data => {
              dispatch(setLoader(false));
            })
            .catch(err => {
              dispatch(setLoader(false));
              // Alert.alert('Something went wrong');
            });
        } else {
          Alert.alert('Please, choose gender');
        }
      } else {
        Alert.alert('Please, choose a correct date of birth');
      }
    } else {
      Alert.alert(`Please, enter the baby's name`);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StepIndicator
          customStyles={customStyles}
          // labels={labels}
          currentPosition={currentPosition}
          // onPress={() => setCurrentPosition(currentPosition + 1)}
        />
        <View style={{paddingTop: 30}}>
          <Text style={{fontSize: 19, color: '#26669E'}}>Baby Profile</Text>
          <View style={{marginTop: 5, marginBottom: 15}}>
            <Text style={{color: '#26669E'}}>
              Please enter the details of the guardian who created the account
              and completed the registration.The information given will be used
              to help improve the product through statistics and analytics
            </Text>
          </View>
        </View>
        <CustomInput
          value={name}
          onChangeText={val => setName(val)}
          styling={styles.input}
          text={'Baby Nickname'}
        />
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
            setVisibleData(true);
          }}>
          <View style={styles.citizen}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 19,
                  color: '#2371AB',
                }}>
                {visibleData
                  ? moment(date).format('DD-MM-YYYY')
                  : 'Baby`s Date of birth'}
              </Text>
            </View>
            <Text style={{color: '#fff', fontSize: 17}}>DD MM YYYY</Text>
          </View>
        </TouchableOpacity>
        <View style={{marginBottom: 10}}></View>
        <DatePicker
          maximumDate={new Date()}
          mode="date"
          theme="dark"
          textColor={Platform.OS === 'ios' ? '#fff' : '#000'}
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <View style={styles.citizen}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 19,
                color: '#2371AB',
              }}>
              <Text style={{color: 'red'}}>*</Text>Gender
            </Text>
          </View>
          <BouncyCheckboxGroup
            fillColor="red"
            data={verticalStaticData}
            style={{flexDirection: 'row'}}
            onChange={selectedItem => {
              console.log(selectedItem);
              setGender(selectedItem.id);
            }}
            textStyle={{
              textDecorationLine: 'none',
            }}
          />
        </View>
        <TouchableOpacity onPress={handleGoTo5} style={styles.buttonDown}>
          <View>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
              next
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {global?.loader && <Loader text={'Please wait ...'} />}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 19,
    paddingRight: 29,
    backgroundColor: '#272A57',
    height: '100%',
  },
  input: {
    marginLeft: -20,
    width: '115%',
    borderRadius: 0,
    backgroundColor: '#201F3F',
    color: '#2371AB',
  },
  citizen: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 6,
    paddingHorizontal: 19,
    marginLeft: -20,
    backgroundColor: '#201F3F',
    width: '115%',
    height: 76,
  },
  buttonDown: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '120%',
    marginLeft: -19,
    height: 85,
    justifyContent: 'center',
    backgroundColor: '#1D1A34',
  },
});
