import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch}   from 'react-redux';
import {RootReducerState}           from '../../../redux';
import moment                       from 'moment';

import {
  View,
  Platform,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import DatePicker              from 'react-native-date-picker';

import background              from '../../../assets/images/homeIcon/backgroundHome.png';

import {getCombinedNavigation} from '../../../hooks/useUpdateNavigationHeaderOptions';

import {
  setWakeUpTime
} from '../../../redux/slices/auth';

export const SettingsWakeUpTime = ({navigation}) => {
  const dispatch = useDispatch();
  const {user}   = useSelector((state: RootReducerState) => state.auth);
  let device     = user.accounts[0]?.devices[0];
  let dateNow    = moment(moment().format('YYYY-MM-DD') + ' ' + device.config?.wake_up_time + ':00');

  const [newWakeUpTime, setNewWakeUpTime] = useState(
    dateNow.toDate()
  );
  
  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'wake up time',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
        headerRightText:   'save',
        headerRightMethod: () => {
          toggleWakeUpTime(newWakeUpTime);
          navigation.goBack();
        },
      })
    )
  }, [navigation]);

  /* Update options on update */
  const refreshNavigation = (newWakeUpTime) => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'wake up time',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
        headerRightText:   'save',
        headerRightMethod: () => {
          toggleWakeUpTime(newWakeUpTime);
          navigation.goBack();
        },
      })
    )
  }

  const toggleWakeUpTime = (newWakeUpTime) => {
    dispatch(setWakeUpTime(moment(newWakeUpTime).format('HH:mm')));
  }

  return (
    <ImageBackground source={background}>
      <View style={styles.container}>
        <View style={styles.item}>
          <DatePicker
            mode="time"
            theme="dark"
            textColor={Platform.OS === 'ios' ? '#fff' : '#000'}
            open={true}
            format="hh:mm"
            locale={'en_GB'}
            date={newWakeUpTime}
            onConfirm={date => {}}
            onDateChange={value => {
              setNewWakeUpTime(new Date(value));
              refreshNavigation(new Date(value));
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
    height: '100%',
  },
  item: {
    alignItems: 'center',
  },
});
