import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {Switch} from '../../../components/Switch/Switch';
import {COLORS} from '../../../styles/Constants';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {setTime, setWakeUpTime} from '../../../redux/slice/SettingsSlice';
export const SettingsTime = () => {
  const [value, setValue] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const changeValue = state => {
    console.log('ssss', state);
    setValue(state);
  };
  useEffect(() => {
    
  }, []);
  return (
    <View style={styles.container}>
      {value ? (
        <>
          <View style={{alignItems: 'center'}}>
            <DatePicker
              maximumDate={new Date()}
              mode="time"
              theme="dark"
              textColor={Platform.OS === 'ios' ? '#fff' : '#000'}
              open={open}
              format="hh:mm"
              //   locale={'en_GB'}
              date={date}
              onConfirm={date => {}}
              onDateChange={value => {
                let _date = new Date(value);
                setDate(value);
                dispatch(
                  setTime({
                    value: value,
                    formatValue: `${_date.getHours()}:${
                      _date.getMinutes() < 10
                        ? '0' + _date.getMinutes()
                        : _date.getMinutes()
                    }`,
                  }),
                );
                dispatch(
                  setWakeUpTime(`${_date.getHours()}:${date.getMinutes()}`),
                );
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View style={styles.box}>
            <Text style={{color: COLORS.text, fontSize: 16}}>
              Set Time Automaticly
            </Text>
            <View>
              <Switch
                val={value}
                setVal={value => {
                  console.log('-------');
                  setValue(value);
                }}
              />
            </View>
          </View>
        </>
      ) : (
        <View style={styles.box}>
          <Text style={{color: COLORS.text, fontSize: 16}}>
            Set Time Automaticly
          </Text>
          <View>
            <Switch val={value} setVal={changeValue} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2E63',
    height: '100%',
    paddingTop: 10,
  },
  box: {
    height: 50,
    backgroundColor: COLORS.backGround,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
});
