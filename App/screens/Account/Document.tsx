import React, {useState} from 'react';
import {Calendar, CalendarList} from 'react-native-calendars';
// import dateFns from 'date-fns';
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  subWeeks,
  addWeeks,
} from 'date-fns';
// import {format, formatDistance, formatRelative, subDays} from 'date-fns';
import {LocaleConfig} from 'react-native-calendars';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import DatePicker from 'react-native-date-picker';
import {COLORS} from '../../styles/Constants';
import eventDateImg from '../../assets/images/documents/dateEventVertical.png';
import eventDateimportant from '../../assets/images/documents/dateEventVerticalImportant.png';
import backImg from '../../assets/images/documents/background.png';
LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'Янв.',
    'Фев.',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль.',
    'Авг.',
    'Сент.',
    'Окт.',
    'Нояб.',
    'Дек.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};

LocaleConfig.locales.en = LocaleConfig.locales[''];
// LocaleConfig.defaultLocale = 'fr';
const formatDate = (date = new Date()) => {
  console.log('date', date);
  return moment(date).format('YYYY-MM-DD');
};

const getMarkedDates = (baseDate, appointments) => {
  const markedDates = {};

  markedDates[formatDate(baseDate)] = {selected: true};

  appointments.forEach(appointment => {
    const formattedDate = formatDate(new Date(appointment.date));
    console.log('formattedDate', formattedDate);
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

export const Document = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2022, 6, 12));

  // const baseDate = new Date(2019, 6, 15);
  // console.log('base', baseDate);
  const APPOINTMENTS = [
    {
      date: '2022-07-13T05:00:00.000Z',
      title: "It's a past thing!",
    },
    {
      date: '2022-07-15T05:00:00.000Z',
      title: "It's a today thing!",
    },
    {
      date: '2022-07-18T05:00:00.000Z',
      title: "It's a future thing!",
    },
  ];
  return (
    <ImageBackground source={backImg} style={styles.container}>
      <View>
        <Calendar
          selected={'2012-05-16'}
          showScrollIndicator={true}
          enableSwipeMonths={true}
          current={formatDate(selectedDate)}
          // hideExtraDays={true}
          // minDate={subWeeks(baseDate, 1)}
          // maxDate={addWeeks(baseDate, 1)}
          dayNames={[
            'Sonntag',
            'Montag',
            'Dienstag',
            'Mittwoch',
            'Donnerstag',
            'Freitag',
            'Samstag',
          ]}
          onDayPress={day => {
            setSelectedDate(new Date(day.year, day.month - 1, day.day));
            console.log('selected day', day);
          }}
          markedDates={getMarkedDates(selectedDate, APPOINTMENTS)}
          theme={{
            //@ts-ignore
            'stylesheet.calendar.header': {
              header: {
                flexDirection: 'row',
                marginLeft: -30,
                justifyContent: 'flex-start',
                alignItems: 'center',
                color: COLORS.yellow,
              },
            },
            // 'stylesheet.day.single': {
            //   base: {
            //     overflow: 'hidden',
            //     height: 34,
            //     alignItems: 'center',
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
              // monthView: {
              //   backgroundColor: colors.grey30,
              // },
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
                borderBottomWidth: 0.4,

                flexDirection: 'row',
                borderBottomColor: 'rgba(35, 113, 171, .4)',
                alignItems: 'flex-start',
                justifyContent: 'space-around',
                marginTop: 7,
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

            dayTextColor: COLORS.textLight,
            textDisabledColor: '#729DAF',
            dotColor: '#DBE9EE',
            monthTextColor: '#DBE9EE',
            textMonthFontWeight: 'bold',

            arrowColor: '#DBE9EE',
          }}
        />
        <View>
          {APPOINTMENTS.map(item => {
            return (
              <View style={styles.eventContainer}>
                <View style={styles.eventLeftC}>
                  <View style={styles.eventDate}>
                    <Text style={{color: COLORS.textLight, fontSize: 10}}>
                      13:00
                    </Text>
                  </View>
                  <View style={styles.eventDate}>
                    <Text style={{color: COLORS.textLight, fontSize: 10}}>
                      13:30
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    style={{width: 0.77, height: 40}}
                    source={eventDateImg}
                  />
                </View>
                <View
                  style={{
                    paddingLeft: 7.67,
                  }}>
                  <View>
                    <Text style={styles.eventText}>{item.title}</Text>
                  </View>
                  <Text style={styles.eventSubText}> home</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
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
  eventContainer: {
    paddingHorizontal: 35.24,
    paddingVertical: 10,
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgba(35, 113, 171, .4)',
  },
  eventText: {
    fontSize: 18,
    color: COLORS.textLight,
    fontFamily: 'AntagometricaBT-Bold',
  },
  eventSubText: {
    fontSize: 10,
    color: COLORS.textLight,
    fontFamily: 'AntagometricaBT-Bold',
  },
  eventLeftC: {
    // paddingTop: 11.55,
    paddingRight: 12,
    justifyContent: 'center',
  },
});
