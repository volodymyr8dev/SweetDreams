import React, {useEffect, useState}                                    from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity, Alert }  from 'react-native';
import {Calendar}                                                      from 'react-native-calendars';
import {Dimensions}                                                    from 'react-native';
import {LocaleConfig}                                                  from 'react-native-calendars';
import {useIsFocused, useNavigation}                                   from '@react-navigation/native';
import moment                                                          from 'moment';
import {useSelector}                                                   from 'react-redux';
import { RootReducerState }                                            from '../../../redux';
import SearchBar                                                       from '../../../components/SearchBar';
import {RetrieveEvent}                                                 from '../../../api/Diary/Calendar';
import {EventHtml}                                                     from './EventHtml';
import eventDateimportant                                              from '../../../assets/images/documents/dateEventVerticalImportant.png';
import {COLORS}                                                        from '../../../styles/Constants';
import { getCombinedNavigation }                                       from '../../../hooks/useUpdateNavigationHeaderOptions';
import Plus                                                            from '../../../assets/images/svg/diary/Plus'
import Search                                                          from '../../../assets/images/svg/diary/Search'
import background                                                      from '../../../assets/backOrigin.png';
interface IPoints {
  title: string;
  date: string;
}

LocaleConfig.locales.en = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okc',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  dayNamesShort: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
};
LocaleConfig.defaultLocale = 'en';


const formatDate = (date = new Date()) => {
  return moment(date).format('YYYY-MM-DD');
};

const getMarkedDates = (baseDate, appointments) => {
  const markedDates = {};
  
  markedDates[formatDate(baseDate)] = {selected: true};
  
  appointments.forEach(appointment => {
    const formattedDate = formatDate(new Date(appointment.date));
    markedDates[formattedDate] = {
      ...markedDates[formattedDate],
      marked: true,
      color: '#000',
      textAlign: 'center',
      fontSize: 19,
    };
  });
  
  return markedDates;
};

export const Document = ({navigation,route}) => {
  const isFocused = useIsFocused();

  const { loadingCheckLogin, user, verified } = useSelector((state: RootReducerState) => state.auth);
  const global = user.accounts[0];
  
  const [shown, setShown]                   = useState(false);
  const [selectedDate, setSelectedDate]     = useState(new Date());
  const [filteredPoints, setFilteredPoints] = useState<IPoints[] | ['']>([{title: '', date: ''}]);
  const [points, setPoints]                 = useState([]);
  const [searchPhrase, setSearchPhrase]     = useState('');
  const [clicked, setClicked]               = useState(true);

  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: global.baby_name ? `${global.baby_name.toLowerCase()}'s diary`: "baby's diary",
        // headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
        headerRightText:         
        <><TouchableOpacity style={{ paddingRight: 23.5, paddingLeft: 15, paddingVertical: 10 }}
            onPress={() => {handleClicked()}}>
            <Search style={{ width: 15, height: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingVertical: 10,paddingRight:15 }}
            onPress={() => {handleAddEvent()}}>
              <Plus style={undefined} />
            </TouchableOpacity></>,
        headerRightMethod: () => {},
      }),
    );
  }, [navigation,selectedDate, isFocused]);

  const handleNavigationUpdate = () => {
    navigation.setOptions(
      getCombinedNavigation({
        title: global.baby_name ? `search in ${global.baby_name.toLowerCase()}'s diary`: "search in baby's diary",
        headerStyle: {
          paddingLeft: 20,
          backgroundColor: '#2A305A',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        buttonPaddingLeft: 20,
        headerLeftText: <></>,
        headerLeftMethod: () => {
          setClicked(true);
          setShown(false);

          navigation.setOptions(
            getCombinedNavigation({
              title: global.baby_name ? `${global.baby_name.toLowerCase()}'s diary`: "baby's diary",
              // headerLeftMethod: navigation.canGoBack() ? () => { navigation.goBack(); } : undefined,
              headerRightText:         
              <><TouchableOpacity style={{ paddingRight: 23.5, paddingLeft: 15, paddingVertical: 10 }}
                  onPress={() => {handleClicked()}}>
                  <Search style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 10,paddingRight:15 }}
                  onPress={() => {handleAddEvent()}}>
                    <Plus style={undefined} />
                  </TouchableOpacity></>,
              headerRightMethod: () => {},
            }),
          );
        },
        headerRightText: <></>,
        headerRightMethod: () => {},
      }),
    );
  };

  const handleClicked = () => {
    setShown(true);
    setClicked(false);
    handleNavigationUpdate();
  };

   useEffect(() => {
     if (route.params?.date) setSelectedDate(route?.params.date);
   }, [route.params?.date, isFocused]);


  function isJsonString(str) {
    try {JSON.parse(str)} 
    catch (e) {return false}
    return true;
  }

  useEffect(() => {
    RetrieveEvent(global.id)
      .then(({data}) => {

        let res = data.map(item => {

          if (isJsonString(item.location)) item.location = JSON.parse(item.location)
          item.date = item.starts_at;
          item.date = moment(item.date).format('YYYY-MM-DD');

          return item;
        });
        setPoints(res);
      })
      .catch(err => {
        console.log('Diary getEvent failed ', err.response.data);
        
        Alert.alert(err.response.data.message);
        
      });
  }, [isFocused]);

  const handleAddEvent = () => {
    navigation.navigate('NewEvent', {selectedDate, global, type: 'regular'});
  };

  useEffect(() => {
    if (shown) {
      let res = points?.filter((item:any) => {
        if (item?.title?.toLowerCase().includes(searchPhrase.toLowerCase())) {
          return item;
        }
      });
      setFilteredPoints(res);
    }
  }, [searchPhrase]);

  useEffect(() => {
    !shown ? setFilteredPoints([]) : setFilteredPoints([''])
  }, [shown]);

  return (
    <ImageBackground source={background} style={styles.container}>
      <SafeAreaView style={{alignItems: 'center', marginTop: 10}}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
          shown={shown}
          setShown={setShown}
        />
      </SafeAreaView>

      <SafeAreaView>
        <View>
          {!shown && (
            <Calendar
              selected={'2012-05-16'}
              showScrollIndicator={true}
              enableSwipeMonths={true}
              current={formatDate(selectedDate)}
              onDayPress={day => {setSelectedDate(new Date(day.year, day.month - 1, day.day))}}
              markedDates={getMarkedDates(selectedDate, points)}
              disabledDaysIndexes={[1, 6]}
              theme={{
                textDayHeaderFontSize: 13,
                textDayHeaderFontFamily: 'AntagometricaBT-Bold',
                textDefaultColor: COLORS.yellow,
                //@ts-ignore
                'stylesheet.calendar.header': {
                  monthText: {
                    fontSize: 22,
                    fontFamily: 'AntagometricaBT-Bold',
                    color: COLORS.yellow,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                  },

                  week: {
                    color: COLORS.yellow,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 14,
                    paddingTop: 9.23,
                    paddingBottom: 6.97,
                  },
                  
                  header: {
                    flexDirection: 'row',
                    marginLeft: -30,
                    alignItems: 'center',
                    color: COLORS.yellow,
                    width: '120%',
                    borderBottomWidth: 0.4,
                    borderBottomColor: 'rgba(35, 113, 171, .4)',
                    marginBottom: 4,
                    dayHeader: {marginTop: 2,marginBottom: 7,width: 30,textAlign: 'center',fontSize: 14,color: '#fff',},
                  },
                  headerTitle: {color: COLORS.yellow },
                },
                'stylesheet.calendar.main': {
                  monthView: {
                  },
                  dayContainer: {justifyContent: 'space-between'},

                  week: {
                    height: 60,
                    width: '100%',
                    borderTopColor: 'rgba(35, 113, 171, .4)',
                    borderTopWidth: 0.4,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-around',
                    paddingTop: 7,
                  },
                },
                textMonthColor: COLORS.yellow,
                textDayFontFamily: 'AntagometricaBT-Bold',
                textDayFontSize: 18,
                arrowStyle: {opacity: 0},
                textDayFontWeight: 'bold',
                textDayStyle: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  paddingTop: -1,
                },
                selectedStyle: {alignItems: 'center',justifyContent: 'center'},
                dotStyle: {marginTop: 11,width: 5.76, height: 5.76, borderRadius: 50},
                todayTextColor: '#CE9B51',
                calendarBackground: 'rgba(255, 255, 255, .0)',
                backgroundColor: '#ffffff',
                selectedDayBackgroundColor: COLORS.yellow,
                selectedDayTextColor: '#fff',
                selectedDotColor: '#fff',
                textSectionTitleColor: '#2371AB',
                textSectionTitleDisabledColor: COLORS.textLight,
                dayTextColor: COLORS.textLight,
                textDisabledColor: '#729DAF',
                dotColor: '#DBE9EE',
                monthTextColor: '#DBE9EE',
                textMonthFontWeight: 'bold',
                arrowColor: '#DBE9EE',
                fontFamily: 'AntagometricaBT-Regular'
              }}
            />
          )}
          <ScrollView
            style={{paddingBottom: 150,height: Dimensions.get('window').height / 3}}>
            <View style={{paddingBottom: 40}}>
              {(filteredPoints.length > 0 ? filteredPoints : points).map(
                item => {
                  return filteredPoints.length > 0
                    ? EventHtml(item, selectedDate, points)
                    : moment(item.date).format('YYYY-MM-DD') == 
                    moment(selectedDate).format('YYYY-MM-DD') && EventHtml(item, selectedDate, points);
                },
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272854',
    heaight: '100%',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },

  singleElement: {
    display: 'flex',
    flex: 4,
    flexDirection: 'column',
  },

  textInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 1,
  },

  dateInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 1,
    margin: 2,
  },

  dateIcon: {padding: 10},
});
