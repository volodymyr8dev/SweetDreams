import React, { useState} from 'react';
import {View, Text, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../styles/Constants';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

export const DatePickerComponent = ({
  changeDate,
  value,
  name,
  mode
}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => { setOpen(true); }}>
        <View style={styles.citizen}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.typeText}>{name}</Text>
          </View>
          <Text style={{color: '#fff', fontSize: 18, fontFamily: 'AntagometricaBT-Regular'}}>
            {value ? moment(value).format(mode == 'date' ? 'DD MMMM YYYY' : 'DD MMMM YYYY hh:mm a') : 'Select'}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{marginBottom: 8.3}}></View>
      
      <DatePicker
        mode={mode}
        theme="dark"
        textColor={Platform.OS === 'ios' ? '#fff' : '#000'}
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setDate(date);
          changeDate(date);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  citizen: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 19,
    backgroundColor: COLORS.backGround,
    width: '100%',
    height: 76,
  },
  bottomButtons: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.backGround,
    justifyContent: 'center',
    alignItems: 'center',
    height: 66,
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    top: 20,
  },
  timeText: {
    color: '#fff',
    fontFamily: 'AntagometricaBT-Regular',
    fontSize: 19,
  },
  typeText: {
    fontSize: 19,
    fontFamily: 'AntagometricaBT-Regular',
    color: '#2371AB',
  },
});
