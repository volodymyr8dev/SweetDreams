import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface Props {
  text: string;
  styling?: object;
}

export const CustomInput = ({text, styling}: Props) => {


  const container = {
    backgroundColor: '#2371AB',
    width: 270,
    height: 54,
    color: '#FFF',
    paddingHorizontal: 21,
    borderRadius: 40,
    marginBottom: 11,
    fontSize: 19,
    
    ...styling
  };
  return (
    <View>
      <TextInput
        placeholderTextColor="#22436F"
        placeholder={text}
        style={container}></TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2371AB',
    width: 270,
    height: 54,
    color: '#FFF',
    paddingHorizontal: 21,
    borderRadius: 40,
    marginBottom: 11,
    fontSize: 19,
  },
});
