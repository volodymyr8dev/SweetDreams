import {useNavigation} from '@react-navigation/native';
import React           from 'react';
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
import {Switch} from '../Switch/Switch';

interface PropsBox {
  nameOfBox: string;
  title?: string;
  nameField?: string;
  rightEl?: string;
  placeholder?: string;
  security?: boolean;
  value?: string | boolean;
  setValueName?: Function;
  date?: boolean;
  rightArrow?: boolean;
  rightContent?: string;
  event?: boolean;
  style?: object;
  multiline?: boolean;
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
  rightArrow,
  rightContent,
  event,
  style,
  multiline,
}: PropsBox) => {
  const navigation = useNavigation();

  const handleGoToScreen = titleName => {
    navigation.navigate(titleName.replace(/\s/g, ''));
  };

  switch (nameOfBox) {
    case 'touch':
      return (
        <TouchableOpacity
          onPress={() => handleGoToScreen(title)}
          style={styles.box}>
          <View style={styles.touchC}>
            <View>
              <Text style={styles.touchT}>{title}</Text>
            </View>
            {rightArrow ? (
              <View>
                <Image
                  style={{height: 14.19, width: 9.26}}
                  source={arrowRight}
                />
              </View>
            ) : (
              <Text style={{color: '#fff', fontSize: 17}}>{rightEl}</Text>
            )}
          </View>
        </TouchableOpacity>
      );
    case 'input':
      return (
        <View style={[styles.input, style]}>
          <View>
            <Text style={styles.inputT}>
              {placeholder}
              {!event ? ':' : ''}
            </Text>
          </View>
          <TextInput
            value={value as any}
            onChangeText={setValueName as any}
            secureTextEntry={security}
            style={styles.inputI}
            multiline={multiline ? true : false}
            numberOfLines={4}
          />
          {date && (
            <View style={{position: 'absolute', right: 15}}>
              <Text style={{color: COLORS.text, fontSize: 18}}>{date}</Text>
            </View>
          )}
        </View>
      );
    case 'switch':
      return (
        <View style={styles.input}>
          <View>
            <Text style={styles.inputT}>{placeholder}</Text>
          </View>
          <TextInput
            value={value as any}
            onChangeText={setValueName as any}
            secureTextEntry={security}
            style={styles.switchI}>
          </TextInput>
          {rightContent == 'switch' ? (
            <View style={styles.rightContainerSwitch}>
              <Switch val={value as any} setVal={setValueName} />
            </View>
          ) : (
            <View style={styles.rightContainer}>
              <Text style={styles.rightText}>{rightContent}</Text>
            </View>
          )}
        </View>
      );
    case 'date':
      return (
        <View style={styles.input}>
          <View>
            <Text style={styles.inputT}>
              {placeholder}
              {!event ? ':' : ''}
            </Text>
          </View>
          <TextInput
            value={value as any}
            onChangeText={setValueName as any}
            secureTextEntry={security}
            style={styles.inputI}></TextInput>

          {date && (
            <View style={{position: 'absolute', right: 15}}>
              <Text style={{color: COLORS.text, fontSize: 18}}>{date}</Text>
            </View>
          )}
        </View>
      );
    case 'handleSwitch':
      return (
        <View style={[styles.input, {justifyContent: 'space-between'}]}>
          <View>
            <Text style={styles.inputT}>{placeholder}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setValueName?.('left')}>
              <Text
                style={[
                  styles.customText,
                  {color: value == 'left' ? '#fff' : COLORS.text},
                ]}>
                Left / 
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setValueName?.('right')}>
              <Text
                style={
                  [styles.customText,
                  {color: value == 'right' ? '#fff' : COLORS.text}]
                }>
              {" "}Right
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
  return <View></View>;
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
    height: 76,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.backGround,
    width: '100%',
    marginBottom: 8.3,
  },
  input: {
    marginBottom: 8.3,
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
  touchC: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchT: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'AntagometricaBT-Regular',
  },
  switchI: {
    width: '100%',
    paddingLeft: 10,
    color: COLORS.text,
    fontSize: 18,

    fontFamily: 'AntagometricaBT-Regular',
  },
  inputI: {
    width: '100%',
    paddingLeft: 10,
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'AntagometricaBT-Regular',
    paddingTop: -8,
  },
  inputT: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'AntagometricaBT-Regular',
  },
  rightContainerSwitch: {
    position: 'absolute',
    right: 17,
  },
  rightContainer: {position: 'absolute', right: 25.29},
  rightText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'AntagometricaBT-Regular',
  },
  customText: {
    color: COLORS.text,
    fontSize: 18,
  },
});
