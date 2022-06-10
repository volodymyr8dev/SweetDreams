import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export const CheckBox = ({text, value, setValue}) => {
  return (
    <BouncyCheckbox
      size={25}
      fillColor="transparent"
      unfillColor="transparent"
      text={text}
      textStyle={{textDecorationLine: 'none'}}
      iconStyle={{
        borderColor: '#CCC',
        borderWidth: 3,
        marginRight: -2,
        marginLeft: 15,
      }}
      isChecked={value}
      onPress={setValue}
    />
  );
};
