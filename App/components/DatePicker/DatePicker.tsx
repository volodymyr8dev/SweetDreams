import moment from 'moment';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../styles/Constants';
import DatePicker from 'react-native-date-picker';
export const DatePickerComponent = ({changeDate, value, type}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [visibleData, setVisibleData] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setVisibleData(true);
          a;
          setOpen(true);
        }}>
        <View style={styles.citizen}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 19,
                fontFamily: 'AntagometricaBT-Regular',
                color: '#2371AB',
              }}>
              {/* {visibleData ? 'Your Date of Birth' : 'Your Date of Birth'} */}
              {type == 'parent' ? 'Your Date of Birth' : 'Baby\'s Date of Birth'}
            </Text>
          </View>
          <Text style={{color: '#fff', fontSize: 17}}>{value}</Text>
        </View>
      </TouchableOpacity>
      <View style={{marginBottom: 8.3}}></View>
      <DatePicker
        maximumDate={new Date()}
        mode="date"
        theme="dark"
        textColor={Platform.OS === 'ios' ? '#fff' : '#000'}
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          changeDate(date);
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
});
