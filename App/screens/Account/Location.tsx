import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../styles/Constants';

export const Location = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: COLORS.text, fontSize: 18}}>Location</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 15,
    height: '100%',
    backgroundColor: COLORS.backGround,
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
