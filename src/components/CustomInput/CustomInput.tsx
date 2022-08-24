import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import eye from '../../assets/images/eye.png';

interface Props {
  text: string;
  styling?: object;
  hidden?: boolean;
  value: string;
  onChangeText: any;
  secure?: boolean;
  colorOfText?: string;
}

export const CustomInput = ({
  text,
  styling,
  hidden,
  value,
  onChangeText,
  colorOfText = '#2371AB',
  secure,
}: Props) => {
  const container = {
    paddingHorizontal: 21,
    marginBottom: 11,
    fontSize: 19,
    fontFamily: 'AntagometricaBT-Regular',
    marginLeft: -20,
    width: '115%',
    borderRadius: 0,
    backgroundColor: '#201F3F',
    height: 76,
    color: '#2371AB',

    ...styling,
  };

  const [secureState, setSecureState] = useState(secure);

  const handleShowPassword = () => {
    console.log('[CustomInput] Show password', !secureState);
    
    setSecureState(!secureState);
  };

  return (
    <View>
      <TextInput
        placeholderTextColor={colorOfText}
        placeholder={text}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureState}
        style={container}
      />
      {hidden && (
        <TouchableOpacity style={styles.hide} onPress={handleShowPassword}>
          <View>
            <Image style={{width: 28, height: 18, top: 12}} source={eye} />
          </View>
        </TouchableOpacity>
      )}
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
  hide: {
    position: 'absolute',
    top: 18,
    right: 0,
  },
});
