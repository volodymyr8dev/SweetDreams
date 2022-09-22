import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React                                               from "react";
import arrowRight from '../../assets/images/settings/arrowRight.png';

export const Blog = ({title, rightEl, source, value, navigate, navigation, handleSettings}) => {
  console.log(handleSettings, 'navigatenavigate');
  // const handleSettings = async title => {
  //   if (typeof rightEl !== 'object') {
  //     navigation.navigate(`${title}`, {title: title});
  //   }
  // };
  return (
    <TouchableOpacity onPress={() => handleSettings(navigate)} style={styles.blog}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={{width: 24, height: 24, marginRight: 10}} source={source} resizeMode="contain" />
        <Text style={{color: '#2371AB', fontSize: 19, fontFamily: 'AntagometricaBT-Regular'}}>
          {navigate}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {typeof rightEl === 'object' ? (
          rightEl
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#2371AB', fontSize: 19, fontFamily: 'AntagometricaBT-Regular'}}>{rightEl}</Text>
            <Image
              style={{width: 10, height: 10, marginLeft: 10}}
              source={arrowRight}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blog: {
    paddingHorizontal: 10,
    marginVertical: 4,
    width: '100%',
    height: 76,
    backgroundColor: 'rgba(26,23,45,0.7)',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
