import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Button} from 'react-native-paper';

export const CustomButton = ({text, handleOnSubmit}) => {
  return (
    <TouchableOpacity onPress={handleOnSubmit}>
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 20}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 270,
    backgroundColor: '#2371AB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    height: 54,
    marginBottom: 11,
  },
});
