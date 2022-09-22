import React, {useEffect, useState}                       from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground}  from 'react-native';
import moment, {Moment}                                   from 'moment';
import {InputUnit}                                        from '../../../components/InputUnit/InputUnit';
import {Loader}                                           from '../../../components/Loader/Loader';
import {DatePickerComponent}                              from '../../../components/DatePicker/DatePicker';
import {UpdateEvent, CreateEvent}                        from '../../../api/Diary/Calendar';
import {getCombinedNavigation}                            from '../../../hooks/useUpdateNavigationHeaderOptions';
import {RootReducerState}                                 from '../../../redux';
import {useSelector}                                      from 'react-redux';

import {dateHMFormat, dateTimeFormat, dateFormat}         from '../../../utils/time';
import {COLORS}                                           from '../../../styles/Constants';

import background                                         from '../../../assets/backOrigin.png';

interface ILocation {
  name: string;
  locate: {lat: string; lng: string};
}
export const NewEvent = ({navigation, route}) => {
  let params   = route.params;

  const {user} = useSelector((state: RootReducerState) => state.auth);

  const [title, setTitle]                   = useState('');
  const [location, setLocation]             = useState<ILocation | any>({name: '',locate: {lat: '',lng: ''}});
  const [allDay, setAllDay]                 = useState(false);
  const [starts, setStarts]                 = useState('');
  const [ends, setEnds]                     = useState('');
  const [notes, setNotes]                   = useState('');
  const [breast, setBreast]                 = useState(null);
  const [loaderAddEvent, setLoaderAddEvent] = useState(false);

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: params.event?.id ? 'edit diary entry' : 'new diary entry',
        headerLeftMethod: () => { navigation.goBack(); },
        headerRightText: params.event?.id ? 'save' : 'add',
        headerRightMethod: () => {
          params.event?.id ? hadleEditEvent() : addEvent();
        },
      }),
    );
  }, [navigation, title, location, allDay, starts, ends, notes, breast]);

  const addEvent = () => {
    let eventParams = {
      title,
      location,
      type: 'regular',
      allDay,
      starts,
      ends,
      notes,
      breast
    };

    setLoaderAddEvent(true);

    CreateEvent(user.accounts[0].id, eventParams).then(({data}: any) => {
      console.log('[EVENT] Create event response', data);

      Alert.alert('Event successfully added');

      setLoaderAddEvent(false);

      navigation.navigate('Diary', {date: dateTimeFormat(starts)});
    })
    .catch(err => {
      console.error('[EVENT] Create event response', err.response);

      Alert.alert(err.response.data.message);

      setLoaderAddEvent(false);
    });
  };

  const hadleEditEvent = () => {
    setLoaderAddEvent(true);

    if (params?.event?.id) {
      const newEvent = {title, type: 'regular', location, allDay, starts, ends, notes};

      UpdateEvent(user.accounts[0].id, params.event.id, newEvent).then(data => {
        console.log('[EVENT] Update event response', data);

        Alert.alert('Event successfully added');

        setLoaderAddEvent(false);

        navigation.navigate('Diary');
      })
      .catch(err => {
        console.error('[EVENT] Update event response', err.response);

        Alert.alert(err.response.data.message);

        setLoaderAddEvent(false);
      });
    }
  };

  const handleSetLocation = loc => {setLocation(rest => ({locate: loc.location, name: loc.name}))};

  useEffect(() => {
    if (params.event?.id) {
      setTitle(params.event.title);
      setLocation(params.event.location);
      setNotes(params.event.notes);
      setStarts(moment(params.event.starts_at));
      setEnds(moment(params.event.ends_at));
      setAllDay(params.event.all_day);
    } else {
      setStarts(moment());
      setEnds(moment());
    }
  }, []);

  return (
    <ImageBackground source={background} style={{backgroundColor: COLORS.back}}>
      <View style={styles.container}>

        <InputUnit event={true} value={title} setValueName={value => setTitle(value)} nameOfBox={'input'} placeholder={'Title'} />

        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            navigation.navigate('Location event', {title: 'location', onGoback: handleSetLocation});
          }}>
          <View style={styles.touchC}>
            <View><Text style={styles.touchT}>Location</Text></View>
            <View>
              <Text style={{color: '#fff', fontSize: 18, fontFamily: 'AntagometricaBT-Regular', width: 300, right: 0, textAlign: 'right'}} numberOfLines={1}>
                {location.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <InputUnit event={true} value={allDay} setValueName={value => setAllDay(value)} nameOfBox={'switch'}
          placeholder={'All-day'}
          rightContent="switch"
        />

        <DatePickerComponent
          mode={allDay ? "date" : "datetime"}
          name="Starts"
          value={allDay ? moment(starts).format('YYYY-MM-DD hh:mm') : moment(starts).format('YYYY-MM-DD hh:mm')}
          changeDate={date => setStarts(moment(new Date(date)).format('YYYY-MM-DD hh:mm'))}
        />

        <DatePickerComponent
          mode={allDay ? "date" : "datetime"}
          name="Ends"
          min={starts}
          value={allDay ? moment(ends).format('YYYY-MM-DD hh:mm') : moment(ends).format('YYYY-MM-DD hh:mm')}
          changeDate={date => setEnds(moment(new Date(date)).format('YYYY-MM-DD hh:mm'))}
        />

        <InputUnit event={true} value={notes} style={styles.notes} setValueName={value => setNotes(value)}
        nameOfBox={'input'} placeholder={'Notes'} multiline={true}
        />

        {loaderAddEvent && <Loader text={`saving diary entry...`} />}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    height: '100%',
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
