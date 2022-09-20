import React, {useEffect, useRef, useState} from 'react';
import {Platform, View, StyleSheet, ImageBackground} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import {COLORS} from '../../../styles/Constants';
import {SettingsDevice} from '../../../api/Settings/Settings';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/configureStore';
import background from '../../../assets/backOrigin.png'
import {setPlayingTime} from '../../../redux/slice/SettingsSlice';

export const SettingsTimePlaying = ({route}) => {
  const dispatch = useDispatch();
  // const {user} = useSelector(({account}: RootState) => account.userInformation);
  const [value, setValue] = useState(route.params.value);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const firstRun = useRef(false);

  useEffect(() => {
    if (firstRun.current) {
      // if (value !== 'Ukraine') {
      //   const valueString = value.replace(/\D/g, '');
      //   SettingsDevice(
      //     {'sound_playing_time': valueString},
      //     user.accounts[0].id,
      //   ).then(res => {
      //     route.params.setValue(res.data.data);
      //   });
      // }
    } else {
      firstRun.current = true;
    }
  }, [value]);

  return (
      <ImageBackground source={background}><View style={styles.container}>
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
          <RNPickerSelect placeholder={{
            label: 'Developer',
            value: "Developer",
            color: 'white'
          }}
                          mode="dropdown"
                          itemStyle={{
                            backgroundColor: 'lightgrey',
                            marginLeft: 0,
                            paddingLeft: 15,
                          }}
                          style={{
                            placeholder: {
                              color: 'white',
                              fontSize: 12,
                              fontWeight: 'bold',
                            },
                          }}
                          onValueChange={value => {
                            setValue(value);
                            console.log(value);
                          }}
                          items={[
                            {label: '20 Mins', value: '20 Mins', color: COLORS.text},
                            {label: '40 Mins', value: '40 Mins', color: COLORS.text},
                            {label: '60 Mins', value: '60 Mins', color: COLORS.text},
                          ]}
          />
        </View>
      </View></ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#2A2E63',
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
