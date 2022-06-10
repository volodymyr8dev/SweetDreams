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
  secure?:boolean;
}

export const CustomInput = ({
  text,
  styling,
  hidden,
  value,
  onChangeText,
  secure,
}: Props) => {
  const container = {
    backgroundColor: '#2371AB',
    width: 270,
    height: 54,
    color: '#FFF',
    paddingHorizontal: 21,
    borderRadius: 40,
    marginBottom: 11,
    fontSize: 19,
    ...styling,
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <TextInput
        placeholderTextColor="#22436F"
        placeholder={text}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={showPassword || secure}
        style={container}
      />
      {hidden && (
        <TouchableOpacity style={styles.hide} onPress={handleShowPassword}>
          <View>
            <Image style={{width: 28, height: 18}} source={eye} />
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
