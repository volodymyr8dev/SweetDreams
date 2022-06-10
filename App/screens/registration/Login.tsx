import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {
  // SafeAreaView, 
  // ScrollView, 
  Text, View, StyleSheet
} from 'react-native';
import {CustomButton} from '../../components/CustomButton/CustomButton';
import {CustomInput} from '../../components/CustomInput/CustomInput';

type Nav = {
  navigate: (value: string) => void;
};

export const Login = () => {
  const navigation = useNavigation<Nav>();
  const goToCreateAccount = () => {
    navigation.navigate('CreateNewAccount');
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text
          style={{
            fontSize: 17,
            color: '#fff',
            fontFamily: 'JosefinSans',
          }}>
          Misty The Cloud App
        </Text>
      </View>
      <CustomInput text={'userName'} />
      <CustomInput text={'Password'} />
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword}>yep... i forgot password</Text>
      </View>
      <CustomButton
        handleOnSubmit={() => navigation.navigate('CreateNewAccount')}
        text={'Login'}
        styles={undefined}></CustomButton>
      <CustomButton
        handleOnSubmit={goToCreateAccount}
        text={'register'}
        styles={undefined}></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 72,
    justifyContent:'center',
    backgroundColor: '#1F1933',
    height:"100%",
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
