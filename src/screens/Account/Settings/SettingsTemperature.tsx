import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch}   from 'react-redux';
import {RootReducerState}           from '../../../redux';

import {
  View,
  StyleSheet,
  ImageBackground
} from 'react-native';

import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import {COLORS}                 from '../../../styles/Constants';
import background               from '../../../assets/images/homeIcon/backgroundHome.png';

import {getCombinedNavigation}  from '../../../hooks/useUpdateNavigationHeaderOptions';

import {
  setTemperature
} from '../../../redux/slices/auth';

export const SettingsTemperature = ({navigation}) => {
  const dispatch = useDispatch();
  const {user}   = useSelector((state: RootReducerState) => state.auth);
  let device     = user.accounts[0]?.devices[0];

  const [type, setType] = useState(device.config?.temperature == 'C' ? 0 : 1);

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'temperature',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
        headerRightText:   'save',
        headerRightMethod: () => {
          toggleTemperature(type);
          navigation.goBack();
        },
      })
    )
  }, [navigation]);

  /* Update options on update */
  const refreshNavigation = (type) => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'temperature',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
        headerRightText:   'save',
        headerRightMethod: () => {
          toggleTemperature(type);
          navigation.goBack();
        },
      })
    )
  }

  const toggleTemperature = (item) => {
    dispatch(setTemperature(item == 0 ? 'C' : 'F'))
  }

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
          <BouncyCheckboxGroup
            initial={device.config?.temperature === 'C' ? 0 : 1}
            fillColor="red"
            data={verticalStaticData}
            style={styles.bouncyCheckBox}
            onChange={(selectedItem: ICheckboxButton) => {
              setType(selectedItem.id);
              refreshNavigation(selectedItem.id);
            }}
            textStyle={{
              textDecorationLine: 'none',
            }}
          />
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
