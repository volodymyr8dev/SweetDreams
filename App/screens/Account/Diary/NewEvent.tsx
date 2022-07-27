import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomInput} from '../../../components/CustomInput/CustomInput';
import {InputUnit} from '../../../components/InputUnit/InputUnit';
import {useNavigation} from '@react-navigation/native';
import {COLORS, monthNames} from '../../../styles/Constants';
import {DatePickerComponent} from '../../../components/DatePicker/DatePicker';
import moment from 'moment';
import {EditEventApi, NewEventApi} from '../../../api/Diary/calendar';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/configureStore';
import {navigationOptions} from '../../../navigation/routes/AppStackRoutes';
import {ChildInformation} from '../../../redux/selectors/AccountSelector';

export const NewEvent = ({route}) => {
  let params = route.params;
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [starts, setStarts] = useState('');
  const [ends, setEnds] = useState('');
  const [notes, setNotes] = useState('');

  const global = useSelector(
    ({account}: RootState) => account.userInformation.user.accounts[0],
  );
  const eventSelector = useSelector(
    ({account}: RootState) => account.events.location,
  );
  console.log('eventSelector,', eventSelector);
  console.log('params,', params.event);
  // useEffect(() => {
  //   if (params?.event) {
  //     setStarts(
  //       moment(params.event.starts_at).format('YYYY-MM-DD hh:mm'),
  //     );
  //     console.log('params.event.ends_at', params.event.ends_at);
  //     setEnds(moment(params.event.ends_at));
  //   }
  // }, [params.event]);
  const addEvent = () => {
    console.log('location22222', location);
    NewEventApi(global.id, title, location, allDay, starts, ends, notes)
      .then(({data}) => {
        console.log('%c React', 'color:white;background-color:#61dbfb', data);
        navigation.navigate('document');
        Alert.alert('Event successfully added');
      })
      .catch(err => {
        console.log('error', err.response.data.message);
        Alert.alert(err.response.data.message);
      });
  };
  const hadleEditEvent = () => {
    if (params?.event?.id) {
      const newEVent = {
        title,
        location,
        all_day: allDay,
        starts_at: moment(starts).format('YYYY-MM-DD hh:mm:ss'),
        ends_at: moment(ends).format('YYYY-MM-DD hh:mm:ss'),
        notes,
      };
      EditEventApi(global.id, params.event.id, newEVent)
        .then(data => {
          Alert.alert('event successfully updated');
          navigation.navigate('document');
        })
        .catch(Err => {
          console.log('Errrr', Err.response.data.message);
        });
    }
  };
  useEffect(() => {
    console.log('title', params.title);
    if (params.title) {
      navigation.setParams({
        editEvent: hadleEditEvent,
        editable: true,
      });
      console.log('You can edit this');
    }
  }, [title, location, allDay, starts, ends, notes]);
  const handleSetLocation = () => {};
  useEffect(() => {
    navigation.setParams({
      addEvent: addEvent,
    });
  }, [title, location, allDay, starts, ends, notes]);

  useEffect(() => {
    if (location !== eventSelector.name.description) {
      setLocation({
        name: eventSelector.name.description,
        locate: eventSelector.locate,
      });
    }
  }, [eventSelector.name.description]);
  useEffect(() => {
    let selected = new Date(params.selectedDate);
    if (params.event) {
      setTitle(params.event.title);
      setLocation(params.event.location);
      setNotes(params.event.notes);
      setStarts(moment(params.event.starts_at).format('YYYY-MM-DD hh:mm'));
      console.log('3333333', params.event.ends_at);
      setEnds(moment(params.event.ends_at));
    }
    // let selectedDate = `
    //   ${selected.getDate()} ${
    //   monthNames[selected.getMonth()]
    // }  ${selected.getFullYear()}`;
    if (params.selectedDate) {
      setStarts(params.selectedDate);
      console.log('ffffff', params.event?.ends_at);
      if (params.rightText == 'add') {
        setEnds(moment(params.selectedDate));
      }
    }
  }, [params.selectedDate]);
  console.log('222222', eventSelector.name.description);
  return (
    <View style={styles.container}>
      <InputUnit
        event={true}
        value={title}
        setValueName={value => setTitle(value)}
        nameOfBox={'input'}
        placeholder={'Title'}
      />
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          navigation.setParams({
            onGoback: handleSetLocation,
          });
          navigation.navigate('Location event', {
            title: 'location',
            location: eventSelector,
            setLocation: setLocation,
          });
        }}>
        <View style={styles.touchC}>
          <View>
            <Text style={styles.touchT}>location</Text>
          </View>
          <View>
            <Text style={{color: COLORS.text}}>
              {params?.event?.location?.name
                ? params?.event?.location?.name
                : eventSelector.name.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
        allDay={allDay}
        mode="time"
        time={true}
        type="Starts"
        value={
          allDay
            ? moment(starts).format('YYYY-MM-DD')
            : moment(starts).format('YYYY-MM-DD hh:mm')
        }
        changeDate={date => {
          let time = new Date(date);
          let res = `${time.getHours()}:${time.getMinutes()}`;
          console.log('res', res);
          console.log('startsssssss', starts);
          let start = moment(starts).format('YYYY-MM-DD');
          console.log('start', start);

          setStarts(
            // moment(date).format('YYYY-MM-DD hh:mm'),
            moment(start + ' ' + res).format('YYYY-MM-DD hh:mm'),
          );
        }}
      />
      <DatePickerComponent
        mode="datetime"
        allDay={allDay}
        time={true}
        type="Ends"
        value={
          allDay
            ? moment(ends).format('YYYY-MM-DD')
            : moment(ends).format('YYYY-MM-DD hh:mm')
        }
        changeDate={date => {
          console.log('date2', date);
          setEnds(moment(date).format('YYYY-MM-DD hh:mm'));
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
  touchC: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchT: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'AntagometricaBT-Regular',
  },
  box: {
    height: 76,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.backGround,
    width: '100%',
    marginBottom: 8.3,
  },
});
