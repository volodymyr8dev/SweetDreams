import React, {useEffect, useState}                       from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity}  from 'react-native';
import moment, {Moment}                                   from 'moment';
import {InputUnit}                                        from '../../../components/InputUnit/InputUnit';
import {Loader}                                           from '../../../components/Loader/Loader';
import {DatePickerComponent}                              from '../../../components/DatePicker/DatePicker';
import {EditEventApi, NewEventApi}                        from '../../../api/Diary/calendar';
import {getCombinedNavigation}                            from '../../../hooks/useUpdateNavigationHeaderOptions';
import {RootReducerState}                                 from '../../../redux';
import {useSelector}                                      from 'react-redux';

import {dateHMFormat, dateTimeFormat, monthNameDate}      from '../../../utils/time';
import {COLORS}                                           from '../../../styles/Constants';

interface ILocation {
  name: string;
  locate: {lat: string; lng: string};
}
export const NewEvent = ({navigation, route}) => {
  let params   = route.params;
  let feedType = 'feed';
  let regType  = 'regular';

  console.log('paras %%%', params)
  const {id} = useSelector((state: RootReducerState) => state.auth.user.accounts[0]);

  const [title, setTitle]                   = useState('');
  const [location, setLocation]             = useState<ILocation | any>({name: '',locate: {lat: '',lng: ''}});
  const [allDay, setAllDay]                 = useState(false);
  const [starts, setStarts]                 = useState('');
  const [ends, setEnds]                     = useState<Moment | string>('');
  const [notes, setNotes]                   = useState('');
  const [breast, setBreast]                 = useState('left');
  const [loaderAddEvent, setLoaderAddEVent] = useState(false);

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'new feed entry',
        headerLeftText:  (params.type == regType||params.type == feedType) ? 'entry type' : params.editable ? 'cancel' 
        : monthNameDate(params.selectedDate) , 
        headerLeftMethod: () => {params.editable ?navigation.goBack() : navigation.navigate('Diary')},
        headerRightText: params?.editable ? 'save' : 'add',
        headerRightMethod: () => {
          params.editable ? hadleEditEvent() : addEvent();
        },
      }),
    );
  }, [navigation, title, location, allDay, starts, ends, notes]);

  const addEvent = () => {
    let eventParams = {id,title,location,type: params.type,allDay,starts,ends,notes,breast};
    
    setLoaderAddEVent(true);

    NewEventApi(eventParams)
      .then(({data}: any) => {
        console.log('[Feed] new feed response', data);

        Alert.alert('Event successfully added');

        setLoaderAddEVent(false);

        navigation.navigate('Diary', {date: dateTimeFormat(starts)});
      })
      .catch(err => {
        console.log('[Feed] new feed reject', err.response.data.message);

        Alert.alert(err.response.data.message);

        setLoaderAddEVent(false);
      });
  };
  const hadleEditEvent = () => {
    if (params?.event?.id) {
      const newEVent = {title, location, allDay, starts, ends, notes, breast};

      EditEventApi(id, params.event.id, newEVent)
        .then(data => {
          Alert.alert('event successfully updated');

          navigation.navigate('Diary');
        })
        .catch(Err => {
          console.log('[Edit Event reject] ', Err.response.data.message);

          Alert.alert('event successfully updated');

        });
    }
  };

  useEffect(() => {
    if (params.event) {
      setTitle(params.event.title);
      setLocation(params.event.location);
      setNotes(params.event.notes);
      setStarts(dateTimeFormat(params.event.starts_at));
      setEnds(moment(params.event.ends_at));
    }
    if (params.selectedDate && params.type == regType) {
      setStarts(params.selectedDate);
      if (params.rightText == 'add')setEnds(moment(params.selectedDate).add(30,'minutes'));
    }
  }, [params.selectedDate]);

  useEffect(() => {
    if (params.type == feedType) {
      setStarts(dateTimeFormat(new Date()));
      setEnds(dateTimeFormat(new Date()));
    }
  }, []);
  const handleSetLocation = loc => {setLocation(rest => ({locate:loc.location, name: loc.name}))};
  return (
    <View style={styles.container}>
      <InputUnit event={true} value={title} setValueName={value => setTitle(value)} nameOfBox={'input'}
        placeholder={params.type == feedType ? 'Feed' : 'Title'}
      />
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          navigation.navigate('Location event', {title: 'location', onGoback: handleSetLocation});
        }}>
        <View style={styles.touchC}>
          <View><Text style={styles.touchT}>Location</Text></View>
          <View>
            <Text style={{color: COLORS.text}}>
              {location.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {params.type == regType ? (
        <InputUnit event={true} value={allDay} setValueName={value => setAllDay(value)} nameOfBox={'switch'}
          placeholder={'All-day'}
          rightContent="switch"
        />
      ) : null}
      <DatePickerComponent min={starts} allDay={allDay} time={true} type="Starts"
        mode={params.type == regType ? 'time' : 'datetime'}
        value={
          params.type == regType
            ? allDay
              ? moment(starts).format('YYYY-MM-DD'): dateTimeFormat(starts) 
            : dateTimeFormat(starts)
        }
        changeDate={date => {
          if (params.type == regType) {
            let time = new Date(date);
            let res = `${time.getHours()}:${time.getMinutes()}`;
            let start = moment(starts).format('YYYY-MM-DD');
            setStarts(moment(start + ' ' + res).format('YYYY-MM-DD hh:mm'));
          } else {
            setStarts(dateHMFormat(date));
          }
        }}
      />
      <DatePickerComponent mode="datetime" allDay={allDay} time={true} type="Ends" min={starts}
        value={
          params.type == regType
            ? allDay
              ? moment(ends).format('YYYY-MM-DD')
              : dateHMFormat(ends)
            : dateHMFormat(ends)
        }
        changeDate={date =>setEnds(dateHMFormat(date))}
      />
      {params.type == feedType && (
        <InputUnit event={true} value={breast} style={styles.notes} setValueName={value => setBreast(value)} 
        nameOfBox={'handleSwitch'} placeholder={'Breast'} multiline={true}
        />
      )}

      <InputUnit event={true} value={notes} style={styles.notes} setValueName={value => setNotes(value)} 
      nameOfBox={'input'} placeholder={'Notes'} multiline={true}
      />
      {loaderAddEvent && <Loader text={`adding new ${params.type}...`} />}
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
