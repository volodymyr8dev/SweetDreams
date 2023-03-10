import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import {COLORS} from '../../styles/Constants';
import checkButton from '../../assets/images/checkButton.png'

export const Gender = ({setValue, type, initialId}) => {
  const verticalStaticData = [
    {
      id: 0,
      isChecked: true,
      text: type !== 'child' ? 'male' : 'boy',
      iconStyle: {
        borderColor: '#CCC',
        borderWidth: 3,
        height: 44,
        width: 44,
        borderRadius: 50,
      },
      style: {
        marginLeft: 25,
      },
      fillColor: 'transparent',
      unfillColor: 'transparent',
      textStyle: {
        textDecorationLine: 'none',
        color: COLORS.text,
        fontFamily: 'AntagometricaBT-Regular',
        fontSize: 19,
      },
      checkIconImageSource: checkButton,
      iconImageStyle: {height: 17.2, width: 20.36},
    },
    {
      id: 1,
      text: type !== 'child' ? 'female' : 'girl',

      style: {
        marginLeft: 25,
      },
      iconStyle: {
        borderColor: '#CCC',
        borderWidth: 3,
        height: 44,
        width: 44,
        borderRadius: 50,
      },
      fillColor: 'transparent',
      unfillColor: 'transparent',
      textStyle: {
        textDecorationLine: 'none',
        color: COLORS.text,
        fontFamily: 'AntagometricaBT-Regular',
        fontSize: 19,
      },
      checkIconImageSource: checkButton,
      iconImageStyle: {height: 17.2, width: 20.36},
    },
  ];

  return (
    <View>
      <View style={styles.citizen}>
        <Text
          style={{
            fontSize: 19,
            color: '#2371AB',
            fontFamily: 'AntagometricaBT-Regular',
          }}>
          Gender
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <BouncyCheckboxGroup
            initial={initialId}
            data={verticalStaticData as ICheckboxButton[]}
            style={{flexDirection: 'row'}}
            onChange={(selectedItem: ICheckboxButton) => {
              console.log('selectedItem', selectedItem);
              selectedItem.id == 0 ? setValue('male') : setValue('female');
            }}
            textStyle={{
              textDecorationLine: 'none',
            }}
          />
        </View>
      </View>
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
    height: 66,
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
