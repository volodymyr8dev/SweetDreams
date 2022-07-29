import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {COLORS} from '../../../styles/Constants';
import arrowRight from '../../../assets/images/settings/arrowRight.png';
import { useNavigation } from '@react-navigation/native';
import background from '../../../assets/images/homeIcon/bacgroundHome.png'

export const SettingsRecording = () => {
    const navigation = useNavigation()
  const handleGoToNewVideo = () => {
navigation.navigate('new Recording');
  };
  return (
      <ImageBackground source={background}>
        <View style={styles.container}>
        <TouchableOpacity onPress={handleGoToNewVideo} style={styles.item}>
          <Text style={{color: COLORS.text, fontSize: 18}}>
            New Custom Recording
          </Text>
          <View>
            <Image style={{width: 15, height: 15}} source={arrowRight}/>
          </View>
        </TouchableOpacity>
        <View style={styles.smallText}>
          <Text style={{color: COLORS.text}}>
            Record up to 3 custom 5 minutes sounds
          </Text>
        </View>
        <View style={styles.smallText}>
          <Text style={{color: COLORS.text}}>
            <Text style={{fontWeight: 'bold'}}>NOTE:</Text> Only one recording can
            be stored on misty at any given time.
          </Text>
        </View>
      </View></ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.backGround,
    paddingHorizontal: 10,
    height: '100%',
  },
  item: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  smallText: {
    paddingTop: 20,
  },
});
