import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../styles/Constants';

import arrowRight from '../../../assets/images/settings/arrowRight.png';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native';
import {InputUnit} from '../../../components/InputUnit/InputUnit';

interface PropsBox {
  nameOfBox: string;
  title: string;
  nameField?: string;
  rightEl?: string;
  placeholder?: string;
}
export const ChangePassword = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    navigation.navigate('Login');
  };
  const handleGoToScreen = title => {
    console.log(title);
    navigation.navigate(title);
  };
  const Box = ({
    nameOfBox,
    title,
    nameField,
    rightEl,
    placeholder,
  }: PropsBox) => {
    return nameOfBox == 'touch' ? (
      <TouchableOpacity
        onPress={() => handleGoToScreen(title)}
        style={styles.box}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{color: COLORS.text, fontSize: 18}}>{title}</Text>
          </View>
          {!rightEl ? (
            <View>
              <Image style={{height: 15, width: 15}} source={arrowRight} />
            </View>
          ) : (
            <Text style={{color: '#fff', fontSize: 17}}>{rightEl}</Text>
          )}
        </View>
      </TouchableOpacity>
    ) : (
      <View style={styles.input}>
        <View>
          <Text style={{color: COLORS.text, fontSize: 18}}>{placeholder}:</Text>
        </View>

        <TextInput
          style={{
            width: '100%',
            paddingLeft: 10,
            color: COLORS.text,
          }}>
          <Text>{nameField}</Text>
        </TextInput>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <InputUnit
        title={'Reset Code'}
        nameOfBox={'input'}
        placeholder={'Reset Code'}
        nameField={'************'}
        security={true}
      />
      <View style={{paddingHorizontal: 20, marginVertical: 15}}>
        <Text style={{color: COLORS.text}}>
          Please enter the reset code we recently sent to your email address
          supplied
        </Text>
      </View>
      <InputUnit
        title={'New Password'}
        nameOfBox={'input'}
        placeholder={'New Password'}
        nameField={'************'}
        security={true}
      />
      <View style={{paddingHorizontal: 20, marginVertical: 15}}>
        <Text style={{color: COLORS.text}}>
          Please enter the new password 8-64 charapters (letters, numbers AND
          special characters)
        </Text>
      </View>
      <InputUnit
        title={'Confirtm New Password'}
        nameOfBox={'input'}
        placeholder={'Confirtm New Password'}
        nameField={'************'}
        security={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    backgroundColor: '#221B36',
    height: '100%',
  },
  box: {
    height: 66,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.backGround,
    width: '100%',
    marginBottom: 7,
  },
  input: {
    marginBottom: 7,
    height: 66,
    width: '100%',
    borderRadius: 0,
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
