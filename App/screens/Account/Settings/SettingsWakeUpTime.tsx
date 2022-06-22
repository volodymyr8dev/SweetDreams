import React, {useState, useEffect} from 'react';
import {View, Text, Platform, StyleSheet, Settings} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setWakeUpTime} from '../../../redux/slice/SettingsSlice';

export const SettingsWakeUpTime = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {wakeUpTime} = useSelector(({settings}) => settings);
  const dispatch = useDispatch();
  useEffect(() => {
    setDate(wakeUpTime);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.item}>
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
              setWakeUpTime({
                value: value,
                formatValue: `${_date.getHours()}:${
                  _date.getMinutes() < 10
                    ? '0' + _date.getMinutes()
                    : _date.getMinutes()
                }`,
              }),
            );
            // dispatch(setWakeUpTime(`${_date.getHours()}:${date.getMinutes()}`));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </View>
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
  item: {
    alignItems: 'center',
  },
});
