import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import {useNavigation, useIsFocused} from '@react-navigation/native';

interface ILocation {
  name: string;
  locate: string;
}
export const Feed = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  useEffect(() => {
    navigation.navigate('addEvent', {
      type: 'feed',
      editable:false,
    });
  }, [isFocused]);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    height: '100%',
    backgroundColor: '#272854',
  },
});
