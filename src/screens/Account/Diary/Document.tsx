import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {Dimensions} from 'react-native';
import { RootReducerState } from '../../../redux';
import {LocaleConfig} from 'react-native-calendars';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import {COLORS} from '../../../styles/Constants';
import eventDateimportant from '../../../assets/images/documents/dateEventVerticalImportant.png';
import backImg from '../../../assets/images/documents/background.png';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {GetEventApi} from '../../../api/Diary/calendar';
import SearchBar from '../../../components/SearchBar';
import {EventHtml} from './EventHtml';
import { RootState } from '../../../redux/interfaceRootState';

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
  console.log('appointments', appointments);
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

export const Document = ({navigation}) => {
  /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: 'baby\'s diary'
    })
  }, [navigation]);

  const isFocused = useIsFocused();
  const [shown, setShown] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date(2022, 6, 12));
  
  const { loadingCheckLogin, user, verified } = useSelector((state: RootReducerState) => state.auth);
  const global = user.accounts[0];

  const [filteredPoints, setFilteredPoints] = useState<IPoints[] | ['']>([
    {title: '', date: ''},
  ]);
  const [points, setPoints] = useState([]);

  const handleClicked = () => {
    setShown(true);
    setClicked(false);
  };
  useEffect(() => {
    console.log('clecked', clicked);
    navigation.setParams({
      headerShown: clicked,
      searchClicked: handleClicked,
    });
  }, [isFocused]);
  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  console.log('points here', points);
  useEffect(() => {
    console.log('update', global);
    GetEventApi(global.id)
      .then(({data}) => {
        console.log('daat', data);
        let res = data.map(item => {
          if (isJsonString(item.location)) {
            item.location = JSON.parse(item.location);
          }
          item.date = item.starts_at;
          item.date = moment(item.date).format('YYYY-MM-DD');
          if (item.type == 'feed') item.title = 'Feed';
          return item;
        });
        console.log('ressss', res);
        setPoints(res);
      })
      .catch(err => {
        console.log('err', err.response.data);
      });
  }, [isFocused]);
  useEffect(() => {
    navigation.setParams({
      addEvent: sendSelectedDate,
    });
  }, [selectedDate, isFocused]);

  const sendSelectedDate = () => {
    console.log('selectedDate2', selectedDate);
    navigation.navigate('addEvent', {
      selectedDate,
      title: 'new event entry',
      backTitle: 'entry type',
      global,
      rightText: 'add',
      type: 'regular',
    });
  };
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(true);
  const [fakeData, setFakeData] = useState();
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        'https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages',
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);
  console.log('%c Filtered Data', 'background-color:blue', filteredPoints);
  useEffect(() => {
    console.log('shown', shown);
    if (shown) {
      let res = points?.filter((item:any) => {
        console.log('item f', item);
        if (item?.title?.toLowerCase().includes(searchPhrase.toLowerCase())) {
          return item;
        }
      });
      setFilteredPoints(res);
    }
  }, [searchPhrase]);
  useEffect(() => {
    if (!shown) {
      setFilteredPoints([]);
    } else if (shown) {
      setFilteredPoints(['']);
    }
  }, [shown]);
  console.log('getMarkedDates', getMarkedDates(selectedDate, points));

  return (
    <ImageBackground source={backImg} style={styles.container}>
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
              // hideExtraDays={true}
              // minDate={subWeeks(baseDate, 1)}
              // maxDate={addWeeks(baseDate, 1)}
              onDayPress={day => {
                setSelectedDate(new Date(day.year, day.month - 1, day.day));
                console.log('selected day', day);
              }}
              markedDates={getMarkedDates(selectedDate, points)}
              disabledDaysIndexes={[1, 6]}
              theme={{
                textDayHeaderFontSize: 13,
                textDayHeaderFontFamily: 'AntagometricaBT-Bold',
                textDefaultColor: COLORS.yellow,
                //@ts-ignore
                'stylesheet.calendar.header': {
                  week: {
                    color: COLORS.yellow,
                    flexDirection: 'row',
                    // backgroundColor: '#000',
                    justifyContent: 'space-between',
                    paddingHorizontal: 14,
                    paddingTop: 9.23,
                    paddingBottom: 6.97,
                  },
                  header: {
                    flexDirection: 'row',
                    marginLeft: -30,
                    // justifyContent: 'flex-start',
                    alignItems: 'center',
                    color: COLORS.yellow,
                    width: '120%',
                    borderBottomWidth: 0.4,
                    borderBottomColor: 'rgba(35, 113, 171, .4)',
                    marginBottom: 4,
                    // backgroundColor: '#2A305A',
                    dayHeader: {
                      marginTop: 2,
                      marginBottom: 7,
                      width: 30,
                      textAlign: 'center',
                      fontSize: 14,
                      color: '#fff',
                    },
                  },
                  dayTextAtIndex0: {
                    color: 'red',
                    padding: 10,
                    backgroundColor: 'red',
                  },
                  headerTitle: {
                    color: COLORS.yellow,
                  },
                },
                // 'stylesheet.day.single': {
                //   base: {
                //     overflow: 'hidden',
                //     height: 34,
                //     alignItems: 'center',
                //     backgroundColor: 'red',
                //     width: 38,
                //   }
                // },
                // 'stylesheet.day.basic': {
                //   text: {
                //     // marginBottom: 4,
                //     color: COLORS.textLight,
                //     alignText: 'center',
                //     dispay: 'flex',
                //     justifyContent: 'center',
                //     alignItems: 'center',
                //     marginTop: 14, // specify the margin you want
                //     paddingLeft: 5,
                //     // ...otherTextStyles
                //   },
                // },
                'stylesheet.calendar.main': {
                  monthView: {
                    // backgroundColor: COLORS.yellow,
                  },
                  // week: {
                  //   flexDirection: 'row',
                  //   justifyContent: 'space-around',
                  //   backgroundColor: '#fff',
                  //   // margin: 1,

                  //   // borderBottomWidth: 1,
                  //   // borderBottomColor: colors.grey30,
                  // },
                  dayContainer: {
                    // borderColor: '#D1D3D4',
                    // borderWidth: 1,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // padding: 10,
                    justifyContent: 'space-between',
                  },

                  week: {
                    height: 60,
                    width: '100%',
                    // borderBottomWidth: 0.4,
                    borderTopColor: 'rgba(35, 113, 171, .4)',
                    borderTopWidth: 0.4,
                    flexDirection: 'row',
                    // borderBottomColor: 'rgba(35, 113, 171, .4)',
                    alignItems: 'flex-start',
                    justifyContent: 'space-around',
                    paddingTop: 7,
                    // marginTop: 7,
                  },
                },
                textMonthColor: COLORS.yellow,
                textDayFontFamily: 'AntagometricaBT-Bold',
                textDayFontSize: 18,
                arrowStyle: {
                  opacity: 0,
                },
                textDayFontWeight: 'bold',
                textDayStyle: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  // backgroundColor: 'green',
                  // color: 'red',
                },
                // textDayFontWeight: "bold",
                selectedStyle: {
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                dotStyle: {
                  marginTop: 11,
                  width: 5.76,
                  height: 5.76,
                  borderRadius: 50,
                },
                todayTextColor: '#CE9B51',
                calendarBackground: '#1F1933',
                backgroundColor: '#ffffff',
                selectedDayBackgroundColor: '#2371AB',

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
              }}
            />
          )}
          <ScrollView
            style={{
              paddingBottom: 150,
              height: Dimensions.get('window').height / 3,
            }}>
            <View style={{paddingBottom: 40}}>
              {(filteredPoints.length > 0 ? filteredPoints : points).map(
                item => {
                  return filteredPoints.length > 0
                    ? EventHtml(item, selectedDate, points)
                    : moment(item.date).format('YYYY-MM-DD') ==
                        moment(selectedDate).format('YYYY-MM-DD') &&
                        EventHtml(item, selectedDate, points);
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
    // marginTop: 50,
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

  dateIcon: {
    padding: 10,
  },
});
