import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {InputUnit} from '../../../components/InputUnit/InputUnit';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../../styles/Constants';
import {DatePickerComponent} from '../../../components/DatePicker/DatePicker';
import moment, {Moment} from 'moment';
import {EditEventApi, NewEventApi} from '../../../api/Diary/calendar';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/interfaceRootState';

interface ILocation {
  name: string;
  locate: {lat: string; lng: string};
}
export const NewEvent = ({route}) => {
  let params = route.params;
  let feedType = 'feed';
  let regType = 'regular';
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState<ILocation | string>('');
  const [allDay, setAllDay] = useState(false);
  const [starts, setStarts] = useState('');
  const [ends, setEnds] = useState<Moment | string>('');
  const [notes, setNotes] = useState('');
  const [breast, setBreast] = useState('left');
  const global = useSelector(
    ({account}: RootState) => account.userInformation.user.accounts[0],
  );
  const eventSelector = useSelector(
    ({account}: RootState) => account.events.location,
  );

  const addEvent = () => {
    NewEventApi(
      global.id,
      title,
      location,
      params.type,
      allDay,
      starts,
      ends,
      notes,
      breast,
    )
      .then(({data}: any) => {
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
    if (params.event && params.type == regType) {
      setTitle(params.event.title);
      setLocation(params.event.location);
      setNotes(params.event.notes);
      setStarts(moment(params.event.starts_at).format('YYYY-MM-DD hh:mm'));
      setEnds(moment(params.event.ends_at));
    }
    if (params.selectedDate && params.type == regType) {
      setStarts(params.selectedDate);
      console.log('ffffff', params.event?.ends_at);
      if (params.rightText == 'add') {
        setEnds(moment(params.selectedDate));
      }
    }
  }, [params.selectedDate]);

  useEffect(() => {
    if (params.type == feedType) {
      setStarts(moment(new Date()).format('YYYY-MM-DD hh:mm'));
      setEnds(moment(new Date()).format('YYYY-MM-DD hh:mm'));
    }
  }, []);
  return (
    <View style={styles.container}>
      <InputUnit
        event={true}
        value={title}
        setValueName={value => setTitle(value)}
        nameOfBox={'input'}
        placeholder={params.type == feedType ? 'Feed' : 'Title'}
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
            <Text style={styles.touchT}>Location</Text>
          </View>
          <View>
            <Text
              style={{
                color: COLORS.text,
                fontSize: 19,
                fontFamily: 'AntagometricaBT-Regular',
              }}>
               {params?.event?.location?.name
                ? params?.event?.location?.name
                : eventSelector.name.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {params.type == regType ? (
        <InputUnit
          event={true}
          value={allDay}
          setValueName={value => setAllDay(value)}
          nameOfBox={'switch'}
          placeholder={'All-day'}
          rightContent="switch"
        />
      ) : null}
      <DatePickerComponent
        min={starts}
        allDay={allDay}
        mode={params.type == regType ? 'time' : 'datetime'}
        time={true}
        type="Starts"
        value={
          params.type == regType
            ? allDay
              ? moment(starts).format('YYYY-MM-DD')
              : moment(starts).format('YYYY-MM-DD hh:mm')
            : moment(starts).format('YYYY-MM-DD hh:mm')
        }
        changeDate={date => {
          if (params.type == regType) {
            let time = new Date(date);
            let res = `${time.getHours()}:${time.getMinutes()}`;
            let start = moment(starts).format('YYYY-MM-DD');
            setStarts(moment(start + ' ' + res).format('YYYY-MM-DD hh:mm'));
          } else {
            setStarts(moment(date).format('YYYY-MM-DD hh:mm'));
          }
        }}
      />
      <DatePickerComponent
        mode="datetime"
        allDay={allDay}
        time={true}
        type="Ends"
        value={
          params.type == regType
            ? allDay
              ? moment(ends).format('YYYY-MM-DD')
              : moment(ends).format('YYYY-MM-DD hh:mm')
            : moment(ends).format('YYYY-MM-DD hh:mm')
        }
        changeDate={date => {
          console.log('date2', date);
          setEnds(moment(date).format('YYYY-MM-DD hh:mm'));
        }}
        min={starts}
      />
      {params.type == feedType && (
        <InputUnit
          event={true}
          value={breast}
          style={styles.notes}
          setValueName={value => setBreast(value)}
          nameOfBox={'handleSwitch'}
          placeholder={'Breast'}
          multiline={true}
        />
      )}

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
