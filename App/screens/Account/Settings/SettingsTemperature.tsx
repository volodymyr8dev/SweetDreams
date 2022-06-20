import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLORS} from '../../../styles/Constants';
import {useDispatch} from 'react-redux';
import SettingsSlice, {
  setTemperature,
} from '../../../redux/slice/SettingsSlice';
import {useSelector} from 'react-redux';
export const SettingsTemperature = () => {
  const [typeC, setTypeC] = useState(false);
  const [typeF, setTypeF] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const {temperature} = useSelector(({settings}) => settings);
  console.log(temperature);
  useEffect(() => {
    setLoader(true);
  }, [temperature]);
  const verticalStaticData = [
    {
      id: 0,
      text: '*C',
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
        backgroundColor: '#1A172D',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        height: 50,
        flexDirection: 'row-reverse',
      },
      fillColor: '#2371AB',
      unfillColor: 'transparent',
      textStyle: {textDecorationLine: 'none', color: COLORS.text},
    },
    {
      id: 1,
      text: '*F',
      iconStyle: {
        borderColor: '#CCC',
        padding: 15,
        borderRadius: 50,
      },
      style: {
        width: '100%',
        marginTop: 20,
        height: 50,
        backgroundColor: '#1A172D',
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
      textStyle: {textDecorationLine: 'none', color: COLORS.text},
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        {loader ? (
          <BouncyCheckboxGroup
            initial={temperature}
            fillColor="red"
            data={verticalStaticData}
            style={styles.bouncyCheckBox}
            onChange={(selectedItem: ICheckboxButton) => {
              dispatch(setTemperature(selectedItem.id));
              if (selectedItem.id == 0) {
                setTypeC(true);
                setTypeF(false);
              } else {
                setTypeC(false);
                setTypeF(true);
              }
            }}
            textStyle={{
              textDecorationLine: 'none',
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2E63',
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
