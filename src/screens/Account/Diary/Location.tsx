import React, {useEffect, useState}                             from 'react';
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity, Alert} from 'react-native';
import {GooglePlacesAutocomplete}                               from 'react-native-google-places-autocomplete';
import {useNavigation}                                          from '@react-navigation/native';
import {useDispatch, useSelector}                               from 'react-redux';
import { RootReducerState }                                     from '../../../redux/store';
import {setLocationEvent}                                       from '../../../redux/slice';
import {getRecentLocation}                                      from '../../../api/Diary/locations';

import point                                                    from '../../../assets/images/documents/pointEvent.png';
import backLocation                                             from '../../../assets/images/documents/backLocation.png';

import {COLORS}                                                 from '../../../styles/Constants';

export interface ILocation {
  name: string;
  locate: {lat: number|null; lng: number|null};
  route?:any
}
const CardItem = ({name, locate,route}: ILocation) => {
  const navigation = useNavigation<any>();
 
  const handleSetLocation = () => {
   
            const res = {name,location: locate};
 
            route.params.onGoback(res);

            navigation.goBack();
   
  };
  return (
    <TouchableOpacity onPress={handleSetLocation} style={styles.itemcard}>
      <View style={{paddingBottom: 11.44, paddingTop: 13.75}}>
        <Image style={{width: 26.16, height: 26.16}} source={point} />
      </View>
      <View style={styles.rightBlockLocation}>
        <Text style={styles.textLocation}>{name}</Text>
        {/* <Text style={styles.textSubLocation}>34dsdfds</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export const Location = ({route}) => {
  const location = route.params.location;
  const navigation = useNavigation();

  const {id} = useSelector((state: RootReducerState) => state.auth.user.accounts[0]);
  
  const [recentLocation, setRecentLocation] = useState([]);

  useEffect(() => {
    getRecentLocation(id)
      .then(({data}) => {setRecentLocation(data.map(loc => JSON.parse(loc.location)))})
      .catch(err => {
        console.log('[Recent location]', err.response.data.message);

        Alert.alert(err.response.data.message);
        
      });
  }, []);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        keyboardShouldPersistTaps="always"
        placeholder="Enter Location"
        styles={stylesInput}
        textInputProps={{placeholderTextColor: 'rgba(35, 113, 171, 0.6)'}}
        fetchDetails={true}
        listViewDisplayed="auto"
        onPress={(data, details = null) => {
          console.log('GoogleAutocomplete', data, details);
          
          const res = {name: data.description, location: details?.geometry?.location };
          
          route.params.onGoback(res);

          navigation.goBack();
        }}
        onFail={error => console.log('error', error)}
        query={{key: 'AIzaSyA7JXSAoMZGvVY2Y9B3OMDG8XF4ZvsL1sA', language: 'en'}}
        currentLocation={true}
        currentLocationLabel="Current location"
      />
      <View style={styles.recentsContainer}>
        <View style={{paddingTop: 6.03, paddingBottom: 7.47}}><Text style={styles.textRecent}>Location suggestions</Text></View>
        <View style={styles.cardResents}>
          {recentLocation.length > 0 && recentLocation.map((item: ILocation) => <CardItem {...item} route={route}/>)}
        </View>
      </View>
    </View>
  );
};

const stylesInput = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: 400,
    zIndex: 1051,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 75.67,
    color: COLORS.text,
    fontSize: 16,
    backgroundColor: '#1A172D',
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  poweredContainer: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderColor: COLORS.text,
    borderTopWidth: 0.5,
    backgroundColor: COLORS.back,
  },
  row: {
    backgroundColor: COLORS.back,
    padding: 13,
    height: 43,
    color: '#fff',
  },
  separator: {
    height: 0.5,
    backgroundColor: COLORS.text,
  },
  description: {
    color:"#ddd"
  },
  listView: {},
  powered: {
    color: '#fff',
  },
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#272854',
  },
  recentsContainer: {
    zIndex: 1,

    marginTop: 82.77,
    paddingHorizontal: 12.97,
  },
  
  input: {
    width: '100%',
    height: 76.77,
    backgroundColor: COLORS.backGround,
    paddingLeft: 16.73,
    color: COLORS.text,
    fontSize: 19,
    fontFamily: 'AntagometricaBT-Regular',
  },
  itemcard: {
    flexDirection: 'row',
    height: 52.76,
    width: Dimensions.get('window').width,
    paddingHorizontal: 13,
  },
  textRecent: {
    color: COLORS.textLight,
    fontSize: 19,
    fontFamily: 'AntagometricaBT-Bold',
  },
  textLocation: {
    color: COLORS.textLight,
    fontSize: 18,
    fontFamily: 'AntagometricaBT-Bold',
  },
  textSubLocation: {
    color: COLORS.textLight,
    fontSize: 10,
    fontFamily: 'AntagometricaBT-Bold',
  },
  cardResents: {
    marginLeft: -13,
    width: Dimensions.get('window').width,
    backgroundColor: '#201F3F',
    height: Dimensions.get('window').height,
  },
  rightBlockLocation: {
    marginLeft: 16.19,
    width: '100%',
    borderBottomColor: COLORS.text,
    borderBottomWidth: 0.67,
    paddingBottom: 11.44,
    paddingTop: 9.77,
    justifyContent: 'center',
  },
});
