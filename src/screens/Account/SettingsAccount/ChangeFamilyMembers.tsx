import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS} from '../../../styles/Constants';

import arrowRight from '../../../assets/images/settings/arrowRight.png';

interface PropsBox {
  nameOfBox: string;
  title: string;
  nameField: string;
  rightEl?: string;
  placeholder?: string;
}

export const ChangeFamilyMembers = () => {
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
             <Text style={{color: COLORS.text, fontSize: 18}}>
               {placeholder}:
             </Text>
           </View>

           <TextInput
             style={{width: '100%', paddingLeft: 10, color: COLORS.text}}>
             <Text>{nameField}</Text>
           </TextInput>
         </View>
       );
     };
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20, marginVertical: 20}}>
        <Text style={{color: COLORS.text}}>
          To add a family, and share both data and control of your devices
          please enter their details below.
        </Text>
      </View>
      <Box
        title={'Email Address'}
        nameOfBox={'input'}
        placeholder={'Email Address'}
      />
      <Box 
      title={'Name'} 
      nameOfBox={'input'}
       placeholder={'Name'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#221B36',
    height: '100%',
  },
  box: {
    height: 60,
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
