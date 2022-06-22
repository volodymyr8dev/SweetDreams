import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS} from '../../../styles/Constants';

export const ChangePassword = () => {
  return (
    <View style={styles.container}>
        <Text>Password</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#221B36',
    height: '100%',
  },
//   box: {
//     height: 60,
//     paddingHorizontal: 20,
//     justifyContent: 'center',
//     backgroundColor: COLORS.backGround,
//     width: '100%',
//     marginBottom: 7,
//   },
//   input: {
//     marginBottom: 7,
//     height: 66,
//     width: '100%',
//     borderRadius: 0,
//     backgroundColor: COLORS.backGround,
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
});
