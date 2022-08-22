import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../../styles/Constants';
import backLocation from '../../../assets/images/documents/backLocation.png';
import point from '../../../assets/images/documents/pointEvent.png';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getRecentLocation} from '../../../api/Diary/locations';
import { RootState } from '../../../redux/interfaceRootState';
import { UserInformationSelector } from '../../../redux/selectors/AccountSelector';
import { setLocationEventDispatch } from '../../../redux/slice/slice';

export interface ILocation {
  name: string;
  locate: {lat: number; lng: number};
}
const CardItem = ({name, locate}: ILocation) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  console.log('name', name);
  const handleSetLocation = () => {
    const res = {
      name: {description: name},
      location: locate,
    };
    dispatch(setLocationEventDispatch(res));
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
  const [recentLocation, setRecentLocation] = useState([]);
  const navigation = useNavigation();
  const {user} = useSelector(UserInformationSelector);

  useEffect(() => {
    getRecentLocation(user.accounts[0].id)
      .then(({data}) => {
        setRecentLocation(data.map(loc => JSON.parse(loc.location)));
        console.log('recent location', JSON.parse(data[0].location));
      })
      .catch(err => {
        console.log('err recent location', err);
      });
  }, []);
  console.log('---', recentLocation);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        keyboardShouldPersistTaps="always"
        placeholder="Enter Location"
        styles={stylesInput}
        textInputProps={{
          placeholderTextColor: 'rgba(35, 113, 171, 0.6)',
        }}
        fetchDetails={true}
        listViewDisplayed="auto"
        onPress={(data, details = null) => {
          console.log('GoogleAutocomplete', data, details);
          const res = {
            name: data,
            location: details?.geometry?.location,
          };
          dispatch(setLocationEventDispatch(res));
          navigation.goBack();
        }}
        onFail={error => console.log('error', error)}
        query={{
          key: 'AIzaSyA7JXSAoMZGvVY2Y9B3OMDG8XF4ZvsL1sA',
          language: 'en',
        }}
        currentLocation={true}
        currentLocationLabel="Current location"
     
      />

      <View style={styles.recentsContainer}>
        <View style={{paddingTop: 6.03, paddingBottom: 7.47}}>
          <Text style={styles.textRecent}>Location suggestions</Text>
        </View>
        <View style={styles.cardResents}>
          {recentLocation.length > 0 &&
            recentLocation.map((item: ILocation) => <CardItem {...item} />)}
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
  // textInputContainer: {
  //   backgroundColor: 'grey',
  // },
  textInput: {
    // width: Dimensions.get('window').width,
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
    // backgroundColor: COLORS.backView,
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
