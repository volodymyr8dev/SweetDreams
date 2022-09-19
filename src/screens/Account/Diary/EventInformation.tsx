import React, {useEffect, useState}                                               from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert}  from 'react-native';
import MapView, {Marker}                                                          from 'react-native-maps';
import {useNavigation}                                                            from '@react-navigation/native';
import {useSelector}                                                              from 'react-redux';

import {DeleteEvent}                                                           from '../../../api/Diary/Calendar';
import { ILocation }                                                              from './Location';

import iconEue                                                                    from '../../../assets/images/documents/point.png';

import {COLORS}                                                                   from '../../../styles/Constants';
import { RootReducerState }                                                       from '../../../redux/store';
import { getCombinedNavigation }                                                  from '../../../hooks/useUpdateNavigationHeaderOptions';


type Nav = {
  navigate: (value: string, obj?: any) => void;
  setParams: (value: any) => void;
  goBack: () => void;
  setOptions:(obj:any) => any;
};


export const EventInformation = ({route}) => {
  const params     = route.params
  const navigation = useNavigation<Nav>();
  
  const {id} = useSelector((state: RootReducerState) => state.auth.user.accounts[0]);
  
  const [locationEvent, setLocationEvent] = useState<ILocation>({name: '',locate: {lat: null,lng: null}});
  const [event, setEvent]                 = useState(params.event);
  
  useEffect(() => {
    params.event.location.name && setLocationEvent(params.event.location);
    setEvent(route.params.event);
  }, []);

    /* Set default navigation options */
  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'new feed entry',
        headerLeftMethod: () => {navigation.goBack()},
        headerRightText: 'edit',
        headerRightMethod: () => {goToEdit()},
      }),
    );
  }, [navigation]);
  
  const goToEdit = () => {
    navigation.navigate('NewEvent', {
        event: event, 
    });
  }

  const handleDeleteEvent = () => {
    DeleteEvent(id, event.id).then(data => {
      console.log('[Delete Event successfully]', data);
      
      Alert.alert('event successfully deleted');
      
      navigation.goBack();
    })
    .catch(err => {
      Alert.alert(err.response.data.message);

      console.log('[Delete Event reject]',err.response.data);
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topBox}>
          <View style={styles.containerText}><Text style={styles.textTitle}>{event.title}</Text></View>
          <View style={styles.containerText}><Text style={styles.subTitle}>{locationEvent?.name}</Text></View>
          <View style={styles.containerTime}><Text style={styles.subTitle}>{event.starts_at}</Text></View>
          <View style={styles.containerTime}><Text style={styles.subTitle}>{event.ends_at}</Text></View>
        </View>
        <View style={styles.containerTextNotes}>
          <View style={{flexDirection: 'row'}}>
            {event.breast && (<>
                <Text style={styles.subTitleNotes}>breast: </Text>
                <Text style={styles.subTitleNotes}>{event.breast}</Text></>
            )}
          </View>
          <View><Text style={styles.subTitleNotes}>notes:</Text></View>
          <View><Text style={styles.subTitle}>{event.notes}</Text></View>
        </View>
        <View style={styles.containerMap}>
          {(locationEvent.locate?.lat !== null &&locationEvent.locate?.lng !== null) ? (
            <MapView
              style={{flex: 1, borderRadius: 20}}
              initialRegion={{
                latitude: locationEvent.locate?.lat,
                longitude: locationEvent.locate?.lng,
                latitudeDelta: 0.0922, longitudeDelta: 0.0421,
              }}
              region={{
                latitude: locationEvent.locate?.lat,
                longitude: locationEvent.locate?.lng,
                latitudeDelta: 0.0822, longitudeDelta: 0.0921,
              }}>
              <Marker style={{width: 16.865, height: 19.845}} icon={4} image={iconEue}
                coordinate={{latitude: locationEvent.locate?.lat,longitude: locationEvent.locate?.lng}}
              />
            </MapView>
          ) : null}
        </View>
        <View style={styles.containerText}></View>
      </ScrollView>
      <TouchableOpacity onPress={handleDeleteEvent} style={styles.deleteTouch}>
        <View><Text style={{color: '#CE9B51', fontSize: 20}}>delete entry</Text></View>
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
    paddingTop: 7.33,
    borderTopWidth: 2,
  },
  containerTime: {},
  deleteTouch:{
    height: 88.17,
    width: Dimensions.get('window').width,
    backgroundColor: '#1C1A34',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -15,
    }
});
