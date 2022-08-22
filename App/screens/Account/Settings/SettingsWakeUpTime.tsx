import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Settings,
  ImageBackground,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setWakeUpTime} from '../../../redux/slice/SettingsSlice';
import {SettingsDevice} from '../../../api/Settings/Settings';
import {RootState} from '../../../redux/configureStore';
import background from '../../../assets/images/homeIcon/backgroundHome.png';

export const SettingsWakeUpTime = ({route}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {wakeUpTime} = useSelector(({settings}) => settings);
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  return (
    <ImageBackground source={background}>
      <View style={styles.container}>
        <View style={styles.item}>
          <DatePicker
            // maximumDate={new Date()}
            mode="time"
            theme="dark"
            textColor={Platform.OS === 'ios' ? '#fff' : '#000'}
            open={open}
            format="hh:mm"
            locale={'en_GB'}
            date={date}
            onConfirm={date => {}}
            onDateChange={value => {
              let _date = new Date(value);
              setDate(value);
              SettingsDevice(
                {
                  'wake_up_time': `${
                    _date.getHours() < 10
                      ? '0' + _date.getHours()
                      : _date.getHours()
                  }:${
                    _date.getMinutes() < 10
                      ? '0' + _date.getMinutes()
                      : _date.getMinutes()
                  }`,
                },
                user.accounts[0].id,
              )
                .then(res => {
                  console.log(res);
                  route.params.setValue(res.data.data);
                })
                .catch(res => {
                  console.log(res);
                });
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 19,
    paddingRight: 29,
    // backgroundColor: '#272A57',
    height: '100%',
  },
  item: {
    alignItems: 'center',
  },
});
