import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {CustomButton} from '../../components/CustomButton/CustomButton';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import owl from '../../assets/images/owl2.png';
import back from '../../assets/images/back.png';

type Nav = {
  navigate: (value: string) => void;
};

export const Login = () => {
  const navigation = useNavigation<Nav>();
  const goToCreateAccount = () => {
    navigation.navigate('CreateNewAccount');
  };
  const handleForgotPassword = () => {};
  return (
    <ImageBackground style={styles.container} source={back}>
      <View style={{marginTop: -80}}>
        <View style={styles.title}>
          <Image
            style={{width: 150, height: 190, resizeMode: 'contain'}}
            source={owl}></Image>
          <Text
            style={{
              fontSize: 27,
              color: '#fff',
              fontFamily: 'Josefin Sans Thin Regular',
            }}>
            Misty The Cloud <Text style={{fontWeight: 'bold'}}> App</Text>
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <CustomInput
            colorOfText="#BDC2CE"
            text={'Username'}
            value={''}
            onChangeText={undefined}
          />
          <CustomInput
            colorOfText="#BDC2CE"
            text={'Password'}
            value={''}
            onChangeText={undefined}
          />
          <TouchableOpacity onPress={handleForgotPassword}>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>
                yep... i forgot password
              </Text>
            </View>
          </TouchableOpacity>
          <CustomButton
            handleOnSubmit={() => navigation.navigate('CreateNewAccount')}
            text={'Login'}
            styles={undefined}></CustomButton>
          <CustomButton
            handleOnSubmit={goToCreateAccount}
            text={'Register'}
            styles={undefined}></CustomButton>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    objectFit: 'cover',
    // paddingHorizontal: Dimensions.get('window').width / 6,
    justifyContent: 'center',
    backgroundColor: '#1F1933',
    height: '100%',
    flex: 1,
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
