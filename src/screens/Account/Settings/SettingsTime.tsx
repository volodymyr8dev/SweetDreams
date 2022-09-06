import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch}                from 'react-redux';
import {RootReducerState}                        from '../../../redux';
import moment                                    from 'moment';
import {debounce}                                from 'lodash';

import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground
} from 'react-native';

import {Switch}   from '../../../components/Switch/Switch';
import {COLORS}   from '../../../styles/Constants';
import DatePicker from 'react-native-date-picker';
import background from '../../../assets/images/homeIcon/backgroundHome.png';

import {getCombinedNavigation} from '../../../hooks/useUpdateNavigationHeaderOptions';

import {
  setTime,
  setTimeAutomatically
} from '../../../redux/slices/auth';

export const SettingsTime = ({navigation}) => {
  const dispatch = useDispatch();
  const {user}   = useSelector((state: RootReducerState) => state.auth);
  let device     = user.accounts[0]?.devices[0];
  let dateNow    = moment(moment().format('YYYY-MM-DD') + ' ' + device.config?.time + ':00');

  const [newTime, setNewTime] = useState(
    dateNow.toDate()
  );
  const [newTimeAutomatically, setNewTimeAutomatically] = useState(device.config?.time_set_up_automatically ? true : false);

  const toggleTime = useCallback(
    debounce((newTime, newTimeAutomatically) => {
      dispatch(setTimeAutomatically(newTimeAutomatically));
      if (newTimeAutomatically) {
        dispatch(setTime(moment(new Date()).format('HH:mm')));
      } else {
        dispatch(setTime(moment(newTime).format('HH:mm')));
      }
    }, 100),
    []
  );
  
  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'time',
        headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
      })
    )
  }, [navigation]);

  return (
    <ImageBackground source={background}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text
            style={{
              color: COLORS.text,
              fontSize: 20,
              fontFamily: 'AntagometricaBT-Regular',
            }}>
              Set Time Automatically
          </Text>
          <View>
            <Switch val={newTimeAutomatically} setData={
              () => {
                setNewTimeAutomatically(!newTimeAutomatically);
                toggleTime(newTime, !newTimeAutomatically);
              }
            } />
          </View>
        </View>
          
        {!newTimeAutomatically ? (
          <>
            <View style={{alignItems: 'center'}}>
              <DatePicker
                mode="time"
                theme="dark"
                textColor={Platform.OS === 'ios' ? '#fff' : '#000'}
                open={true}
                format="hh:mm"
                locale={'en_GB'}
                date={newTime}
                onConfirm={date => {}}
                onDateChange={value => {
                  setNewTime(new Date(value));
                  toggleTime(new Date(value), false);
                }}
              />
            </View>
          </>
        ) : (
          <View/>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 10,
  },
  box: {
    height: 76,
    backgroundColor: 'rgba(26,23,45,0.7)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
});
