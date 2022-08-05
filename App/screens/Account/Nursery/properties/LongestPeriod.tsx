import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {COLORS} from '../../../../styles/Constants';
import {BarChart} from 'react-native-chart-kit';
import arrowLeft from '../../../../assets/images/nersery/arrowLeft.png';
import {Blog} from '../../../../components/Touchable/TouchableInput';
import sleepDiary from '../../../../assets/images/nersery/sleepDiary.png';

const chartConfig = {
  topRadius: 8,
  bottomRadius: 20,
  backgroundGradientFrom: '#272854',
  backgroundGradientTo: '#272854',
  barPercentage: 1,
  decimalPlaces: 1, // optional, defaults to 2dp
  color: (opacity = 1) => `rgb(184, 101, 193)`,
  labelColor: (opacity = 1) => COLORS.text,
  fillShadowGradient: `rgb(184, 101, 193)`,
  fillShadowGradientOpacity: 1,
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: '#efefef',
    strokeDasharray: '.3',
  },
  propsForLabels: {},
};

const data = {
  labels: ['19/08', '20/08', '21/08', '22/08', '23/08', '24/08'],
  legend: ['L1', 'L2', 'L3', 'L4', 'L5'],
  datasets: [
    {
      data: [19.46, 19.47, 19.47, 19.48, 19.49, 19.5],
    },
  ],
};
export const LongestPeriod = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => {}}>
          <Image style={{width: 10.77, height: 18.86}} source={arrowLeft} />
        </TouchableOpacity>
        <View style={styles.headerWraper}>
          <Text style={styles.headerText}>{'activeTime'}</Text>
          <Text style={styles.headerTextTime}>24.08.2018 - 25/08.2018</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Image
            style={{
              width: 10.77,
              height: 18.86,
              transform: [{rotateY: '180deg'}],
            }}
            source={arrowLeft}
          />
        </TouchableOpacity>

        {/* <Image style={{width: 10.77, height: 18.86}} source={arrowRight} /> */}
      </View>
      <View
        style={{
          width: '100%',
          paddingBottom: 27.21,
          borderBottomColor: COLORS.text,
          borderBottomWidth: 0.6,
        }}></View>
      <View>
        <Text style={styles.textData}>24.08.2018</Text>
        <Text style={styles.textTime}>04h 59m</Text>
      </View>
      <BarChart
        style={styles.graphStyle}
        showBarTops={true}
        showValuesOnTopOfBars={true}
        withInnerLines={true}
        segments={5}
        data={data}
        width={Dimensions.get('window').width - 50}
        height={364.21}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
      />
      <View style={styles.InputUnit}>
        <Blog
          styleText={styles.styleText}
          styleImage={styles.styleImage}
          style={styles.bottomButton}
          title={'Sleep Diary'}
          rightEl={'2 entries'}
          source={sleepDiary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    height: '100%',
    backgroundColor: '#272854',
    alignItems: 'center',
  },
  graphStyle: {
    paddingTop: 20,
    flex: 1,
    marginRight: -35,
    paddingRight: 35,
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
  InputUnit: {
    position: 'absolute',
    width: '100%',
    height: 'auto',
    bottom: 10,
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
  bottomButton: {
    height: 76,
  },
  textData: {
    color: COLORS.text,
    paddingTop: 26.66,
    fontSize: 13,
    fontFamily: 'AntagometricaBT-Regular',
  },
  textTime: {
    color: COLORS.yellow,
    paddingBottom: 31.1,
    fontSize: 20,
    fontFamily: 'AntagometricaBT-Bold',
  },
});
