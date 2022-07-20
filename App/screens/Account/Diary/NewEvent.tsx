import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomInput} from '../../../components/CustomInput/CustomInput';
import {InputUnit} from '../../../components/InputUnit/InputUnit';
import {useNavigation} from '@react-navigation/native';
import {COLORS, monthNames} from '../../../styles/Constants';
import {DatePickerComponent} from '../../../components/DatePicker/DatePicker';
import moment from 'moment';
import {NewEventApi} from '../../../api/Diary/calendar';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/configureStore';

export const NewEvent = ({route}) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [starts, setStarts] = useState('');
  const [ends, setEnds] = useState('');
  const [notes, setNotes] = useState('');
  const [event, setEvent] = useState('');
  const global = useSelector(
    ({account}: RootState) => account.userInformation.user.accounts[0],
  );
  console.log('event', event);
  const addEvent = ({route}) => {
    console.log('here i am ');
    NewEventApi(global.id, title, location, allDay, starts, ends, notes)
      .then(({data}) => {
        console.log('%c React', 'color:white;background-color:#61dbfb', data);
        Alert.alert('Event successfully added');
      })
      .catch(err => {
        console.log('error', err.response.data.message);
        Alert.alert(err.response.data.message);
      });
  };
  useEffect(() => {
    navigation.setParams({
      addEvent: addEvent,
    });
  }, [title, location, allDay, starts, ends, notes]);
  useEffect(() => {
    let selected = new Date(route.params.selectedDate);
    if (route.params.event) {
      setTitle(route.params.event.title);
      setLocation(route.params.event.location);
      setNotes(route.params.event.notes);
      setTitle(route.params.event.title);
      setEnds(moment(route.params.date).format('YYYY-MM-DD   hh:mm'));
    }
    console.log('roteu1111111,', route);

    // console.log(new Date(route.params.selectedDate).getDate());
    let selectedDate = `
      ${selected.getDate()} ${
      monthNames[selected.getMonth()]
    }  ${selected.getFullYear()}`;
    console.log({selectedDate});
    setStarts(selectedDate.trim());
  }, [route.params.selectedDate]);
  return (
    <View style={styles.container}>
      <InputUnit
        event={true}
        value={title}
        setValueName={value => setTitle(value)}
        nameOfBox={'input'}
        placeholder={'Title'}
      />
      <InputUnit
        event={true}
        value={location}
        setValueName={value => setLocation(value)}
        nameOfBox={'touch'}
        placeholder={'Location'}
        title={'Location event'}
      />
      <InputUnit
        event={true}
        value={allDay}
        setValueName={value => setAllDay(value)}
        nameOfBox={'switch'}
        placeholder={'All-day'}
        rightContent="switch"
      />
      <DatePickerComponent
        min={starts}
        mode="time"
        time={true}
        type="Starts"
        value={starts}
        changeDate={date => {
          let time = new Date(date);
          let res = `${time.getHours()}:${time.getMinutes()}`;
          console.log('res', res);
          // console.log('dateeeeeee', new Date(date).getHours());
          console.log('startsssssss', starts);
          setStarts(moment(starts + ' ' + res).format('YYYY-MM-DD    hh:mm'));
        }}
      />
      <DatePickerComponent
        mode=""
        time={true}
        type="Ends"
        value={ends}
        changeDate={date => {
          console.log('date2', date);

          setEnds(moment(date).format('YYYY-MM-DD   hh:mm'));
        }}
        min={starts}
      />

      <InputUnit
        event={true}
        value={notes}
        style={styles.notes}
        setValueName={value => setNotes(value)}
        nameOfBox={'input'}
        placeholder={'Notes'}
        multiline={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    height: '100%',
    backgroundColor: '#272854',
  },
  notesContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 6,
    paddingHorizontal: 19,
    backgroundColor: COLORS.backGround,
    width: '100%',
    height: 76,
  },
  notes: {
    height: 200,
    alignItems: 'flex-start',
    paddingTop: 25.88,
  },
});
