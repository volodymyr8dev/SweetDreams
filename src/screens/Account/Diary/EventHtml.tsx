import React                                             from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';

import moment                                            from 'moment';
import {useNavigation}                                   from '@react-navigation/native';

//contants
import {COLORS, monthNames}                              from '../../../styles/Constants';

//icons
import eventDateImg                                      from '../../../assets/images/documents/dateEventVertical.png';
import feedLine                                          from '../../../assets/images/documents/feedLine.png';


export const EventHtml = (item, selectedDate, points) => {
  let date = moment(item.starts_at).format('hh:mm');
  const navigation = useNavigation<any>();

  const goToEvent = async EventItem => {
    console.log('evemtItem',EventItem)
    let d = new Date(selectedDate);
    let res = points.filter(
      item =>
        moment(item.date).format('YYYY-MM-DD') ==
        moment(selectedDate).format('YYYY-MM-DD'),
    );
    navigation.navigate('entry details', {
      title: 'entry details',
      backTitle: `${monthNames[d.getMonth()]} ${d.getFullYear()}`,
      event: EventItem,
      rightText: 'edit',
    });
  };
  return item ? (
    <TouchableOpacity
      onPress={() => goToEvent(item)}
      style={styles.eventContainer}>
      <View style={styles.eventLeftC}>
        <View style={styles.eventDate}>
          <Text style={{color: COLORS.textLight, fontSize: 10}}>
            {moment(item.starts_at).format('hh:mm').trim()}
          </Text>
        </View>
        <View style={styles.eventDate}>
          <Text style={{color: COLORS.textLight, fontSize: 10}}>
            {moment(item.ends_at).format('hh:mm').trim()}
          </Text>
        </View>
      </View>
      <View>
        <Image
          style={{width: 0.77, height: 40}}
          source={item.type == 'feed' ? feedLine : eventDateImg}
        />
      </View>
      <View
        style={{
          paddingLeft: 7.67,
        }}>
        <View>
          <Text style={styles.eventText}>{item.title}</Text>
        </View>
        <Text style={styles.eventSubText}>
          {item.location?.name ? item.location.name : ''}
        </Text>
      </View>
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
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
  eventDate: {},
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
