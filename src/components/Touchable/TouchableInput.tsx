import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import arrowRight from '../../assets/images/settings/arrowRight.png';

interface IBlog {
  title: string;
  rightEl?: any;
  source: any;
  value?: string | number;
  navigate?: any;
  styleText: object;
  styleImage: object;
  style:object;
}
export const Blog = ({
  title,
  rightEl,
  source,
  value,
  navigate,
  styleText,
}: IBlog) => {
  const navigation: any = useNavigation();

  const handleSettings = async title => {
    if (typeof rightEl !== 'object') {
      console.log(title, 'title');
      navigation.navigate(`${navigate}`, {
        title: title,
        value: value,
      });
    }
  };
  return (
    <TouchableOpacity onPress={() => handleSettings(title)} style={styles.blog}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{width: 24, height: 24, marginRight: 10}}
          source={source}
          resizeMode="contain"
        />
        <Text
          style={{
            color: '#2371AB',
            fontSize: 19,
            fontFamily: 'AntagometricaBT-Regular',
          }}>
          {title}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {typeof rightEl === 'object' ? (
          rightEl
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#2371AB', fontSize: 19}}>{rightEl}</Text>
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
  container: {
    // backgroundColor: '#2A2E63',
    height: '100%',
  },
  blog: {
    paddingHorizontal: 10,
    marginVertical: 4,
    width: '100%',
    height: 76,
    // backgroundColor: '#1A172D',
    backgroundColor: 'rgba(26,23,45,0.7)',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    color: '#2371AB',
    fontSize: 16,
    fontFamily: 'AntagometricaBT-Regular',
  },
  textRight: {
    color: '#2371AB',
    fontSize: 15,
    fontFamily: 'AntagometricaBT-Regular',
  },
});
