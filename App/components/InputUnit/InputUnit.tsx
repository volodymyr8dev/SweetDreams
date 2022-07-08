import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import arrowRight from '../../assets/images/settings/arrowRight.png';
import {COLORS} from '../../styles/Constants';

interface PropsBox {
  nameOfBox: string;
  title: string;
  nameField?: string;
  rightEl?: string;
  placeholder?: string;
  security?: boolean;
  value?: string;
  setValueName?: Function;
  date?: boolean;
}
export const InputUnit = ({
  nameOfBox,
  title,
  nameField,
  rightEl,
  placeholder,
  security,
  value,
  setValueName,
  date,
}: PropsBox) => {
  const navigation = useNavigation();
  const handleGoToScreen = titleName => {
    navigation.navigate(titleName, {
      title: titleName,
      rightEl: true,
      hideOld: titleName == 'Change Password' ? true : false,
    });
  };

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
          <Text style={{color: COLORS.text, fontSize: 18, fontFamily: 'AntagometricaBT-Regular'}}>{title}</Text>
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
        <Text
          style={{
            color: COLORS.text,
            fontSize: 18,
            fontFamily: 'AntagometricaBT-Regular',
          }}>
          {placeholder}:
        </Text>
      </View>

      <TextInput
        value={value}
        onChangeText={setValueName}
        secureTextEntry={security}
        style={{width: '100%', paddingLeft: 10, color: COLORS.text}}>
        {/* <Text>{nameField && value}</Text> */}
      </TextInput>
      {date && (
        <View style={{position: 'absolute', right: 15}}>
          <Text style={{color: COLORS.text, fontSize: 18}}>{date}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#221B36',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: 200,
    backgroundColor: 'opacity',
    borderWidth: 1,
    borderColor: '#2A70AA',
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
    height: 76,
    // width: '100%',
    borderRadius: 0,
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  citizen: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 6,
    paddingHorizontal: 19,
    backgroundColor: COLORS.backGround,
    width: '100%',
    height: 76,
  },
  bottomButtons: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.backGround,
    justifyContent: 'center',
    alignItems: 'center',
    height: 66,
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    top: 20,
  },
});
