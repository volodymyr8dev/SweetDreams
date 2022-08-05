import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLORS} from '../../../styles/Constants';
import {useDispatch} from 'react-redux';
import SettingsSlice, {
  setTemperature,
  setTemperatureNew,
} from '../../../redux/slice/SettingsSlice';
import {useSelector} from 'react-redux';
import {SettingsDevice} from '../../../api/Settings/SettingsApi';
import {RootState} from '../../../redux/configureStore';
import background from '../../../assets/images/homeIcon/bacgroundHome.png';

export const SettingsTemperature = ({route}) => {
  const [typeC, setTypeC] = useState(false);
  const [typeF, setTypeF] = useState(false);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const {temperature} = useSelector(({settings}) => settings);
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  const setNewValue = () => {
    SettingsDevice(
      {Temperature: route.params.value === 'C' ? 'F' : 'C'},
      user.accounts[0].id,
    ).then(res => {
      route.params.setValue(res.data.data);
    });
  };
  const verticalStaticData = [
    {
      id: 0,
      text: '°C',
      iconStyle: {
        padding: 15,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#CCC',
        outline: 'solid 2px red',
      },
      style: {
        width: '100%',
        marginTop: 20,
        backgroundColor: 'rgba(26,23,45,0.7)',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        height: 76,
        flexDirection: 'row-reverse',
      },
      fillColor: '#2371AB',
      unfillColor: 'transparent',
      textStyle: {
        textDecorationLine: 'none',
        color: COLORS.text,
        fontSize: 20,
        fontFamily: 'AntagometricaBT-Bold',
      },
    },
    {
      id: 1,
      text: '°F',
      iconStyle: {
        borderColor: '#CCC',
        padding: 15,
        borderRadius: 50,
      },
      style: {
        width: '100%',
        marginTop: 8,
        height: 76,
        backgroundColor: 'rgba(26,23,45,0.7)',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
      },
      iconStyle: {
        padding: 15,
        borderRadius: 50,
        borderColor: '#CCC',
      },
      fillColor: '#2371AB',
      unfillColor: 'transparent',
      textStyle: {
        textDecorationLine: 'none',
        color: COLORS.text,
        fontSize: 20,
        fontFamily: 'AntagometricaBT-Bold',
      },
    },
  ];

  return (
    <ImageBackground source={background}>
      <View style={styles.container}>
        <View>
          {loader ? (
            <BouncyCheckboxGroup
              initial={route.params.value === 'F' ? 1 : 0}
              fillColor="red"
              data={verticalStaticData}
              style={styles.bouncyCheckBox}
              onChange={(selectedItem: ICheckboxButton) => {
                setNewValue();
              }}
              textStyle={{
                textDecorationLine: 'none',
              }}
            />
          ) : null}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#2A2E63',
    height: '100%',
  },
  blog: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#1A172D',
    alignItems: 'center',
  },
  bouncyCheckBox: {
    flexDirection: 'column',
  },
});
