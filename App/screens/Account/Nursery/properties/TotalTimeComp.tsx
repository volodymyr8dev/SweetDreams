import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import arrowLeft from '../../../../assets/images/nersery/arrowLeft.png';
import arrowRight from '../../../../assets/images/nersery/arrowRight.png';
import {COLORS} from '../../../../styles/Constants';
import {BarChartComp} from '../../../../components/BarChart/BarChart';
import sleepDiary from '../../../../assets/images/nersery/sleepDiary.png';
import {Blog} from '../../../../components/Touchable/TouchableInput';
import {BarChart} from 'react-native-chart-kit';
import {AlertComp} from '../../../../components/Alert/AlertComp';
import finger from '../../../../assets/images/nersery/fingerOver.png';

const time = [
  'last 24 hours',
  '2 days ago',
  '3 days ago',
  '4 days ago',
  '5 days ago',
  '6 days ago',
  '7 days ago',
  '7 days - 14',
  '7 days - 21',
  '2 weeks ago',
  '3 weeks ago',
  '4 weeks ago',
  '2 month ago',
];

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

export const TotalTimeComp = () => {
  useEffect(() => {
    // Alert.alert('Run finger over table to pin point data');
  }, []);
  const [value, setValue] = useState(false);
  const [activeTime, setActiveTime] = useState('last 24 hours');
  console.log('rrrrrrrrr2', time.length);
  const data = {
    labels: ['19/08', '20/08', '21/08', '22/08', '23/08', '24/08'],
    legend: ['L1', 'L2', 'L3', 'L4', 'L5'],
    datasets: [
      {
        data: [19.46, 19.45, 19.47, 19.45, 19.5, 19.5],
      },
    ],
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <TouchableOpacity
          onPress={() => {
            if (time.indexOf(activeTime) == 0) {
              setActiveTime(time[activeTime.length - 1]);
            } else {
              setActiveTime(time[time.indexOf(activeTime) - 1]);
            }
          }}>
          <Image style={{width: 10.77, height: 18.86}} source={arrowLeft} />
        </TouchableOpacity>
        <View style={styles.headerWraper}>
          <Text style={styles.headerText}>{activeTime}</Text>
          <Text style={styles.headerTextTime}>24.08.2018 - 25/08.2018</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (time.indexOf(activeTime) == time.length - 1) {
              setActiveTime(time[0]);
            } else {
              setActiveTime(time[time.indexOf(activeTime) + 1]);
            }
          }}>
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

      {value ? (
        <BarChartComp />
      ) : (
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
      )}

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
      {/* <View style={styles.modal}>
        <View>
          <Text>12345</Text>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  graphStyle: {
    paddingTop: 20,
    flex: 1,
    marginRight: -35,
    paddingRight: 35,
  },
  chartTitle: {
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
    bottom: 10,
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
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    transform: [{translateX: 50}],
  },
});
