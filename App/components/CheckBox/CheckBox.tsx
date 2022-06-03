import React from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export const CheckBox = () => {
  return (
    <BouncyCheckbox
      size={25}
      fillColor="transparent"
      unfillColor="transparent"
      text="Yes"
      iconStyle={{borderColor: '#CCC', borderWidth: 3}}
      onPress={(isChecked: boolean) => {}}
    />
  );
}
