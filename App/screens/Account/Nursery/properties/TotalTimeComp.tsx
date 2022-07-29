import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';

import arrowLeft from '../../../../assets/images/nersery/arrowLeft.png';
import arrowRight from '../../../../assets/images/nersery/arrowRight.png';
import {COLORS} from '../../../../styles/Constants';
import {BarChartComp} from '../../../../components/BarChart/BarChart';

export const TotalTimeComp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Image style={{width: 10.77, height: 18.86}} source={arrowLeft} />

        <View style={styles.headerWraper}>
          <Text style={styles.headerText}>Last 24 hours</Text>
          <Text style={styles.headerTextTime}>24.08.2018 - 25/08.2018</Text>
        </View>

        {/* <Image style={{width: 10.77, height: 18.86}} source={arrowRight} /> */}
      </View>
      <View
        style={{
          width: '100%',
          paddingBottom: 27.21,
          borderBottomColor: COLORS.text,
          borderBottomWidth: 3,
        }}></View>
      <View style={styles.headerDown}>
        <Text
          style={{
            color: COLORS.text,
            fontSize: 13,
            fontFamily: 'AntagometricaBT-Regular',
            paddingBottom: 5,
          }}>
          Total for this 24h
        </Text>
        <Text
          style={{
            color: COLORS.yellow,
            fontSize: 20,
            fontFamily: 'AntagometricaBT-Bold',
          }}>
          Total for this 24h
        </Text>
      </View>
      
        <BarChartComp />
    
    </View>
  );
};

const styles = StyleSheet.create({
  graphStyle: {
    flex: 1,
    paddingRight: 25,
  },
  chartTitle: {
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 10,
    fontFamily: 'AntagometricaBT-Bold',
    fontSize: 16,
  },
  container: {
    paddingTop: 20,
    height: '100%',
    backgroundColor: '#272854',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: '#292C62',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#CE9B51',
    fontSize: 13,
    fontFamily: 'AntagometricaBT-Bold',
  },
  headerTextTime: {
    color: COLORS.text,
  },
  headerWraper: {
    paddingHorizontal: 17.27,
    alignItems: 'center',
  },
  graphicContent: {
    paddingTop: 26.6,
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextGraphic: {
    color: COLORS.textLight,
    fontSize: 14,
  },
  tempValueleft: {
    fontSize: 19,
    paddingTop: 4,
    color: COLORS.yellow,
    fontFamily: 'AntagometricaBT-Bold',
  },
  tempValueRight: {
    paddingTop: 5,
    fontSize: 19,
    color: COLORS.text,
    textAlign: 'center',
    fontFamily: 'AntagometricaBT-Bold',
  },
  InputUnit: {
    position: 'absolute',
    width: '100%',
    height: 'auto',
    bottom: 0,
  },
  bottomButton: {
    height: 76,
  },
  styleText: {
    fontSize: 19,
    color: COLORS.textLight,
  },
  styleImage: {
    marginLeft: 19,
    width: 9.27,
    height: 14.2,
    marginTop: 3,
  },
  headerDown: {
    alignItems: 'center',
    paddingTop: 26.66,
  },
});
