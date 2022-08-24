import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Button} from 'react-native-paper';

export const CustomButton = ({text, handleOnSubmit, styles}) => {
  const container = {
    width: 270,
    backgroundColor: '#2371AB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    height: 54,
    marginBottom: 11,
    ...styles
  };
  return (
    <TouchableOpacity onPress={handleOnSubmit}>
      <View style={container}>
        <Text style={{color: 'white', fontSize: 20,fontWeight: 'bold', fontFamily: 'AntagometricaBT-Bold'}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({

});
