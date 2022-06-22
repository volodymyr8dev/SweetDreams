import React, {useState} from 'react';
import {Platform, View, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import {COLORS} from '../../../styles/Constants';
export const SettingsTimePlaying = () => {
  const [value, setValue] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      {/* <DatePicker
        maximumDate={new Date()}
        mode="date"
        theme="dark"
        textColor={Platform.OS === 'ios' ? '#fff' : '#000'}
        format="dd:mm"
        //   locale={'en_GB'}
        date={date}
        onConfirm={date => {}}
        onDateChange={value => {
          let _date = new Date(value);
          setDate(value);
          //   dispatch(
          //     setTime({
          //       value: value,
          //       formatValue: `${_date.getHours()}:${
          //         _date.getMinutes() < 10
          //           ? '0' + _date.getMinutes()
          //           : _date.getMinutes()
          //       }`,
          //     }),
          //   );
          //   dispatch(setWakeUpTime(`${_date.getHours()}:${date.getMinutes()}`));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
      <View style={styles.input}>
        <RNPickerSelect
          mode="dropdown"
          itemStyle={{
            backgroundColor: 'lightgrey',
            marginLeft: 0,
            paddingLeft: 15,
          }}
          style={{
            placeholder: {
              color: COLORS.text,
              fontSize: 12,
              fontWeight: 'bold',
            },
          }}
          onValueChange={value => console.log(value)}
          items={[
            {label: '20 Mins', value: '20 Mins', color: COLORS.text},
            {label: '40 Mins', value: '40 Mins', color: COLORS.text},
            {label: '1 Hour', value: '1 Hour', color: COLORS.text},
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2E63',
    height: '100%',
    paddingTop: 10,
  },
  input: {
    paddingHorizontal: 20,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
