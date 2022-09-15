import React, {useEffect} from 'react';
import { RootReducerState } from '../../../redux';
import {useDispatch, useSelector}   from 'react-redux';

import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import happy from '../../../assets/images/graph/iconList/happy.png';
import sad from '../../../assets/images/graph/iconList/sad.png';
import tempretute from '../../../assets/images/graph/iconList/tempreture.png';
import book from '../../../assets/images/graph/iconList/book.png';
import arrowRight from '../../../assets/images/settings/arrowRight.png';
import {COLORS} from '../../../styles/Constants';
interface IBlog {
  title: string;
  rightEl: any;
  source: ImageSourcePropType;
  subTitle: string;
  width?: number;
  height?: number;
}
const Blog = ({title, rightEl, source, subTitle, width, height}: IBlog) => {
  const dispatch = useDispatch();
  const {user}   = useSelector((state: RootReducerState) => state.auth);
  let device     = user.accounts[0]?.devices[0];

  const navigation = useNavigation();
  const accounts = user.accounts;
  const handleSettings = async () => {
    if (typeof rightEl !== 'object') {
      if (title == 'Diary Entries') {
        navigation.navigate(`Diary`, {
          title:   title,
          childId: accounts[0].id,
        });
      } else {
        navigation.navigate(`${title}`, {
          title:   title,
          childId: accounts[0].id,
        });
      }
    }
  };
  return (
    <TouchableOpacity onPress={handleSettings} style={styles.blog}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{
            width: width ? width : 30,
            height: height ? height : 30,
            marginRight: 10,
          }}
          source={source}
          resizeMode="contain"
        />
        <View>
          <Text
            style={{color: '#2371AB', fontSize: title.length > 20 ? 17 : 20, fontFamily: 'AntagometricaBT-Regular'}}>
            {title}
          </Text>

          {subTitle ? (
            <Text style={{color: '#2371AB', fontSize: 12, fontFamily: 'AntagometricaBT-Regular'}}>{subTitle}</Text>
          ) : null}
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {typeof rightEl == 'object' ? (
          rightEl
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: COLORS.textLight, fontSize: 19, fontFamily: 'AntagometricaBT-Regular'}}>
              {rightEl}
            </Text>
            <Image
              style={{width: 10, height: 11, marginLeft: 10}}
              source={arrowRight}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const ContentNavigation = ({options, diaries, averageTemp}) => {
  const dispatch = useDispatch();
  const {user}   = useSelector((state: RootReducerState) => state.auth);
  let device     = user.accounts[0]?.devices[0];
  
  useEffect(() => {}, [options]);
  return (
    <View style={styles.container}>
      <Blog
        title="Average Temperature"
        subTitle={options.value5.subTitle}
        source={tempretute}
        rightEl={averageTemp+"°"+device.config.temperature}
        width={30}
        height={27}
      />
      <Blog
        title="Diary Entries"
        subTitle={options.value4.subTitle}
        source={book}
        rightEl={diaries}
        width={30}
        height={26}
      />
      {user.accounts[0]?.devices[0]?.is_deluxe == false ? null : (
        <Blog
          title="Total Time Without Activation"
          subTitle={options.value1.subTitle}
          source={happy}
          rightEl={options.value1.value}
        />
      )}
      {user.accounts[0]?.devices[0]?.is_deluxe == false ? null : (
        <Blog
          title="Longest Period Without Activation"
          subTitle={options.value2.subTitle}
          source={happy}
          rightEl={options.value2.value}
        />
      )}
      {user.accounts[0]?.devices[0]?.is_deluxe == false ? null : (
        <Blog
          title="Number of smartCRY Activations"
          subTitle={options.value3.subTitle}
          source={sad}
          rightEl={options.value3.value}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    height: '100%',
  },
  text: {
    color: COLORS.text,
  },
  blog: {
    paddingHorizontal: 10,
    marginVertical: 5,
    width: '100%',
    height: 70,
    backgroundColor: '#1A172D',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  border: {backgroundColor: '#292C62', height: 4},
  borderActive: {backgroundColor: '#CE9B51', height: 4},
});
