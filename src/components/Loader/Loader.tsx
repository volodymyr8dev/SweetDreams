import React from 'react';
import {View, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

interface Props {
  text: string;
}

export const Loader = ({text}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{marginTop: -100}}>
        <Spinner visible={true} textContent={text} textStyle={styles.textStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  textStyle: {
    textAlign: 'center',
    marginTop: -30,
    paddingHorizontal: 70,
    color: '#fff',
    fontSize: 19,
  },
});
