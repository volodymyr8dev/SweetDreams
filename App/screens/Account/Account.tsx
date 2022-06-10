import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CustomButton} from '../../components/CustomButton/CustomButton';

export const Account = () => {
  const handleConnect = () => {};
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20, alignSelf: 'center'}}>
        <Text style={{color: '#fff',fontSize:19}}>connecting...</Text>
      </View>
      <View style={{marginBottom: 40, alignSelf: 'center'}}>
        <Text style={{color: '#fff'}}>
          Is your misty unit displaying the temperature?
        </Text>
      </View>
      <View style={{alignSelf:'center'}}>
        <CustomButton
          styles={styles.button}
          handleOnSubmit={handleConnect}
          text="yes"
        />
        <CustomButton
          styles={styles.button}
          handleOnSubmit={handleConnect}
          text="no"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#221B36',
    height:"100%",
    padding:20
  },
  button: {
    width: 200,
    backgroundColor: 'opacity',
    borderWidth: 1,
    borderColor: '#2A70AA',
  },
});
