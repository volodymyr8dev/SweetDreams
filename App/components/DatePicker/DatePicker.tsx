import moment from 'moment';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../styles/Constants';
import DatePicker from 'react-native-date-picker';
export const DatePickerComponent = ({changeDate, value}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [visibleData, setVisibleData] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setVisibleData(true);
          setOpen(true);
        }}>
        <View style={styles.citizen}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 19,
                color: '#2371AB',
              }}>
              {/* {visibleData ? 'Your Date of Birth' : 'Your Date of Birth'} */}
              Your Date of Birth
            </Text>
          </View>
          <Text style={{color: '#fff', fontSize: 17}}>{value}</Text>
        </View>
      </TouchableOpacity>
      <View style={{marginBottom: 10}}></View>
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
  container: {
    paddingTop: 10,
    backgroundColor: '#221B36',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: 200,
    backgroundColor: 'opacity',
    borderWidth: 1,
    borderColor: '#2A70AA',
  },
  box: {
    height: 66,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.backGround,
    width: '100%',
    marginBottom: 7,
  },
  input: {
    marginBottom: 7,
    height: 66,
    // width: '100%',
    borderRadius: 0,
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  citizen: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 6,
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
