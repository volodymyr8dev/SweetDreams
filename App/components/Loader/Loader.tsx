import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import AwesomeLoading from 'react-native-awesome-loading';
import Spinner from 'react-native-loading-spinner-overlay';
interface Props {
  text: string;
}
export const Loader = ({text}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <AwesomeLoading
          indicatorId={1}
          size={60}
          textStyle={styles.textStyle}
          isActive={true}
          text={text}
        /> */}
        <Spinner
          visible={true}
          textContent={text}
          textStyle={styles.textStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    opacity: 0.7,
    backgroundColor: 'transparent',
  },
  content: {
    marginTop: -100,
  },
  textStyle: {
    textAlign: 'center',
    marginTop: -30,
    paddingHorizontal: 70,
    color: '#fff',
    fontSize: 19,
  },
});
