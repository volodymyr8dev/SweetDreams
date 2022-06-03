import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';
import {CustomButton} from '../components/CustomButton/CustomButton';
import {CustomInput} from '../components/CustomInput/CustomInput';

type Nav = {
  navigate: (value: string) => void;
};

export const Login = () => {
  const navigation = useNavigation<Nav>();
  const goToCreateAccount = () => {
    navigation.navigate('CreateNewAccount');
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{fontSize: 17}}>Misty The Cloud App</Text>
        </View>
        <CustomInput text={'userName'} />
        <CustomInput text={'Password'} />
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>yep... i forgot password</Text>
        </View>
        <CustomButton
          handleOnSubmit={() => navigation.navigate('CreateNewAccount')}
          text={'Login'}></CustomButton>
        <CustomButton
          handleOnSubmit={goToCreateAccount}
          text={'register'}></CustomButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 72,
    paddingVertical: 80,
  },
  title: {
    alignItems: 'center',
    fontSize: 27,
    marginBottom: 17,
  },
  forgotPasswordContainer: {
    paddingLeft: 20,
    marginTop: -3,
    marginBottom: 24,
  },
  forgotPassword: {
    color: '#CE9B51',
  },
});
