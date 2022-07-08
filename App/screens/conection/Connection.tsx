import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CustomButton} from '../../components/CustomButton/CustomButton';

export const Connection = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    navigation.setParams({
      connectionStep: 0,
      show: true,
      title: 'connection',
    });
  }, []);

  const handleConnect = () => {
    navigation.navigate('conectionStep1',{title:"connect misty"});
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{marginBottom: 10}}>
          <Text style={{color: '#FFFFFF', fontFamily: 'AntagometricaBT-Bold'}}>Your Mistly device </Text>
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={{color: '#FFFFFF', fontFamily: 'AntagometricaBT-Regular'}}>status : </Text>
        </View>
        <View style={{marginBottom: 30}}>
          <Text style={{color: '#FFFFFF', fontFamily: 'AntagometricaBT-Regular'}}>
            Your Mistly device is not connected
          </Text>
        </View>
        <View>
          <CustomButton
            styles={styles.button}
            handleOnSubmit={handleConnect}
            text="connect"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 19,
    paddingRight: 29,
    height: '100%',
    backgroundColor: '#272A57',
  },
  card: {
    backgroundColor: '#36365D',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    height: 206,
  },
  button: {
    width: 200,
    backgroundColor: 'opacity',
    borderWidth: 1,
    borderColor: '#2A70AA',
  },
  content: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  buttonDown: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '120%',
    marginLeft: -14,
    height: 85,
    justifyContent: 'center',
    backgroundColor: '#1D1A34',
  },
});
