import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../styles/Constants';
import MapView, {Marker} from 'react-native-maps';
import iconEue from '../../../assets/images/documents/point.png';
import {useNavigation} from '@react-navigation/native';
type Nav = {
  navigate: (value: string, obj?: any) => void;
  setParams: (value: any) => void;
};

export const EventInformation = ({route}) => {
  console.log('route', route.params);
  const navigation = useNavigation<Nav>();
  const [event, setEvent] = useState(route.params.event);
  useEffect(() => {
    setEvent(route.params.event);
  }, []);
  const goToEdit = () => {
    navigation.navigate('addEvent', {
      title: 'edit entry',
      rightText: 'done',
      backTitle: 'cancel',
      selectedDate: event.created_at,
      event: event,
    });
  };
  useEffect(() => {
    navigation.setParams({goToEdit: goToEdit});
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topBox}>
          <View style={styles.containerText}>
            <Text style={styles.textTitle}>{event.title}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.subTitle}>{event.location}</Text>
          </View>
          <View style={styles.containerTime}>
            <Text style={styles.subTitle}>{event.created_at}</Text>
          </View>
          <View style={styles.containerTime}>
            <Text style={styles.subTitle}>{event.ends_at}</Text>
          </View>
        </View>

        <View style={styles.containerTextNotes}>
          <View>
            <Text style={styles.subTitleNotes}>notes:</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>{event.notes}</Text>
          </View>
        </View>
        <View style={styles.containerMap}>
          <MapView
            style={{flex: 1, borderRadius: 20}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              style={{width: 33.73, height: 39.69}}
              icon={4}
              image={iconEue}
              coordinate={{latitude: 37.78825, longitude: -122.4324}}
            />
          </MapView>
        </View>
        <View style={styles.containerText}></View>
      </ScrollView>
      <TouchableOpacity
        style={{
          height: 88.17,
          width: Dimensions.get('window').width,
          backgroundColor: '#1C1A34',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: -15,
        }}>
        <View>
          <Text style={{color: '#CE9B51', fontSize: 20}}>delete entry</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    height: '100%',
    backgroundColor: '#272854',
    paddingHorizontal: 15.86,
  },
  topBox: {marginBottom: 15},
  containerText: {
    paddingBottom: 14.29,
  },
  textTitle: {
    color: '#CE9B51',
    fontSize: 22,
    fontFamily: 'AntagometricaBT-Bold',
  },
  subTitle: {
    color: COLORS.textLight,
    lineHeight: 18,
    fontWeight: '400',
    fontSize: 15,
    fontFamily: 'AntagometricaBT-Bold',
  },
  subTitleNotes: {
    color: COLORS.textLight,
    fontSize: 18,
    marginBottom: 12,
    fontFamily: 'AntagometricaBT-Bold',
  },
  containerMap: {
    marginTop: 30,
    width: '100%',
    height: 400,
  },
  containerTextNotes: {
    borderTopColor: '#292C62',
    paddingTop: 10,
    borderTopWidth: 2,
  },
  containerTime: {},
});
