import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {COLORS} from '../../../styles/Constants';
import backLocation from '../../../assets/images/documents/backLocation.png';
import point from '../../../assets/images/documents/pointEvent.png';
export const Location = ({value, setValue}) => {
  const CardItem = () => {
    return (
      <View style={styles.itemcard}>
        <View style={{paddingBottom: 11.44, paddingTop: 13.75}}>
          <Image style={{width: 26.16, height: 26.16}} source={point} />
        </View>
        <View style={styles.rightBlockLocation}>
          <Text style={styles.textLocation}>sadasd</Text>
          <Text style={styles.textSubLocation}>34dsdfds</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Enter Location"
          placeholderTextColor={COLORS.textLight}
          style={styles.input}
          value={value}
          onChange={setValue}
        />
      </View>
      <View style={styles.recentsContainer}>
        <View style={{paddingTop: 6.03, paddingBottom: 7.47}}>
          <Text style={styles.textRecent}>Recents</Text>
        </View>
        <View style={styles.cardResents}>
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#272854',
  },
  recentsContainer: {
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
    fontSize: 19,
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
