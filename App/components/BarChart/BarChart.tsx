import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import alertUp from '../../assets/images/nersery/alertUp.png';
import {COLORS} from '../../styles/Constants';
import {BarChart} from 'react-native-chart-kit';

const chartConfig = {
  topRadius: 8,
  bottomRadius: 20,
  backgroundGradientFrom: '#272854',
  backgroundGradientTo: '#272854',
  barPercentage: 0.65,
  decimalPlaces: 1,
  height: 400,
  color: (opacity = 1) => `rgb(184, 101, 193)`,
  labelColor: (opacity = 1) => COLORS.text,
  fillShadowGradient: `rgb(184, 101, 193)`,
  fillShadowGradientOpacity: 1,
  style: {borderRadius: 16},
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: '#efefef',
    strokeDasharray: '.005',
  },
  propsForLabels: {
    fontSize: 13,
  },
};
const lines = [
  {start: 12.5, end: 13.9, isActive: false},
  {start: 0, end: 0, isActive: false},
  {start: 18.1, end: 19, isActive: false},
  {start: 21, end: 22.32, isActive: false},
  {start: 0, end: 0, isActive: false},
  {start: 0, end: 0, isActive: false},
  {start: 0, end: 0, isActive: false},
  {start: 0, end: 0, isActive: false},
  {start: 0, end: 0, isActive: false},
  {start: 20, end: 21.32, isActive: false},
  {start: 0, end: 0, isActive: false},
  {start: 20, end: 22, isActive: false},
  {start: 0, end: 0, isActive: false},
];
const koef = 0.2625;
const lines2 = [{starts: 13, ends: 15}];
export const BarChartComp = ({activeLabels, activeData}) => {
  const [dataTemerature, setDataTemp] = useState([10, 0, 10, 10, 0, 10, 10, 10, 0, 10, 10, 10, 10, 10]);

  useEffect(() => {
    console.log('activeData',activeData)
    setDataTemp(activeData);
  }, [activeData]);
  const [state, setState] = useState(lines);
  const [location, setLocation] = useState({
    x: 0,
    y: 0,
  });

  const data = {
    labels: activeLabels,
    // legend: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'],
    datasets: [
      {
        data: dataTemerature,
        // data:[[10,5],[5,3],[2,1]]
      },
      {
        data: [5], // min
      },
      {
        data: [25], // max
      },
    ],
  };
  const handlePress = (e, index) => {
    setState(
      state.map((item, indexMap) => {
        index == indexMap ? (item.isActive = true) : (item.isActive = false);
        return item;
      }),
    );
    setLocation({
      x: e.nativeEvent.locationX,
      y: e.nativeEvent.locationY,
    });
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.containerGraph}>
        {state.map((item, index) => {
          const time = item.end - item.start;
          let timeForModal = time.toFixed(2);
          const splittedTime = timeForModal.split('.');
          let timeModal = timeForModal.replace('.', ':');
          if (+splittedTime[0] < 10) {
            timeModal = `0${splittedTime[0]}:${splittedTime[1]}`;
          }

          let w = time * 60 * koef;
          return (
            <View>
              <View style={styles.lineContainer}>
                <View style={styles.verticalCont}>
                  {item.end - item.start > 0 && (
                    <TouchableOpacity
                      onPress={e => handlePress(e, index)}
                      style={[
                        styles.blockActivity,
                        item?.start
                          ? {
                              width: w,
                              zIndex: item.isActive ? 100 : 50,
                            }
                          : null,
                      ]}>
                      <View
                        onStartShouldSetResponder={event => true}
                        onTouchEnd={e => {
                          e.stopPropagation();
                        }}
                        style={{
                          position: 'absolute',
                          top: location.y,
                          left: location.x,
                          width: 20,

                          transform: [{translateX: -25}, {translateY: -42}],
                          height: 35,
                          // zIndex: item.isActive ? 10 : 1,
                        }}>
                        {item.isActive ? (
                          <ImageBackground
                            style={{
                              width: 47.92,
                              height: 40.97,
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingBottom: 12,
                              paddingHorizontal: 5,
                              zIndex: 200,
                            }}
                            source={alertUp}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: COLORS.text,
                              }}>
                              03:50
                            </Text>
                          </ImageBackground>
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 5.42,
          marginHorizontal: -5,
        }}>
        <Text
          style={{
            color: COLORS.text,
            fontSize: 13,
            fontFamily: 'AntagometricaBT-Bold',
          }}>
          12
        </Text>
        <Text
          style={{
            color: COLORS.text,
            fontSize: 13,
            fontFamily: 'AntagometricaBT-Bold',
          }}>
          18
        </Text>
        <Text
          style={{
            color: COLORS.text,
            fontSize: 13,
            fontFamily: 'AntagometricaBT-Bold',
          }}>
          24
        </Text>
        <Text
          style={{
            color: COLORS.text,
            fontSize: 13,
            fontFamily: 'AntagometricaBT-Bold',
          }}>
          6
        </Text>
        <Text
          style={{
            color: COLORS.text,
            fontSize: 13,
            fontFamily: 'AntagometricaBT-Bold',
          }}>
          12
        </Text>
      </View> */}

      <BarChart
        style={styles.graphStyle}
        showBarTops={false}
        showValuesOnTopOfBars={false}
        withInnerLines={true}
        // segments={2}
        data={data}
        width={Dimensions.get('window').width - 40}
        height={364.21}
        chartConfig={chartConfig}
        withHorizontalLabels={false}
        // verticalLabelRotation={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  graphStyle: {
    flex: 1,
    paddingRight: -15,
    // marginRight: 10,
    // paddingLeft: -15,
  },
  chartTitle: {
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 10,
    fontFamily: 'AntagometricaBT-Bold',
    fontSize: 16,
  },
  containerGraph: {
    width: Dimensions.get('window').width - 36,
    height: Dimensions.get('window').height / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
  },
  lineContainer: {
    height: '100%',
    width: 0.77,
    backgroundColor: '#fff',

    position: 'relative',
  },
  blockActivity: {
    justifyContent: 'center',
    position: 'absolute',
    top: Dimensions.get('window').height / 6.5,
    left: 1,
    backgroundColor: '#B865C1',
    width: (Dimensions.get('window').width - 36) / 13,
    height: 170,
  },
  verticalCont: {
    // alignItems: 'flext-start',
    backgroundColor: 'red',
  },
});
