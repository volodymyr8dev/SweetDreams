import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../styles/Constants';
import DatePicker from 'react-native-date-picker';
import {minTime} from 'date-fns';
import moment from 'moment';
export const DatePickerComponent = ({
  changeDate,
  value,
  type,
  mode,
  time,
  min,
  allDay,
}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  let dater = new Date(min);
  console.log('dater', dater);

  return (
    <>
      {!time ? (
        <TouchableOpacity
          disabled={allDay}
          onPress={() => {
            setOpen(true);
          }}>
          <View style={styles.citizen}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.typeText}>{type}</Text>
            </View>
            <Text style={{color: '#fff', fontSize: 17}}>{value}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={allDay}
          onPress={() => {
            setOpen(true);
          }}>
          <View style={styles.citizen}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.typeText}>{type}</Text>
            </View>
            <View>
              <View>
                <Text style={{color: '#fff', fontSize: 17}}>{value}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}

      <View style={{marginBottom: 8.3}}></View>
      {min ? (
        type !== 'Starts' ? (
          <DatePicker
            //fix here
            minimumDate={
              new Date(
                `${dater.getFullYear()}-${dater.getMonth()}-${dater.getDate()}`,
              )
            }
            maximumDate={
              type == 'Starts'
                ? new Date(
                    `${dater.getFullYear()}-${
                      dater.getMonth() + 1
                    }-${dater.getDate()}`,
                  )
                : null
            }
            mode={mode}
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
        ) : (
          <DatePicker
            mode={mode}
            theme="dark"
            textColor={Platform.OS === 'ios' ? '#fff' : '#000'}
            modal
            open={open}
            date={date}
            onConfirm={date => {
              console.log('errror', date);
              setOpen(false);
              setDate(date);

              changeDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        )
      ) : (
        <DatePicker
          maximumDate={new Date()}
          mode={mode}
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
      )}
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
