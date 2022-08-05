import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';
import arrowLeft from '../../../../assets/images/nersery/arrowLeft.png';
import arrowRight from '../../../../assets/images/nersery/arrowRight.png';
import sleepDiary from '../../../../assets/images/nersery/sleepDiary.png';
import alertUp from '../../../../assets/images/nersery/alertUp.png';
import alertDown from '../../../../assets/images/nersery/alertDown.png';
import {COLORS, timeIndex, time} from '../../../../styles/Constants';
import {LineChart} from 'react-native-chart-kit';
import {Blog} from '../../../../components/Touchable/TouchableInput';
import {NureseryTemperatureApi} from '../../../../api/Nursery/Nuresery';
import moment from 'moment';

export const AverageTempature = ({route}) => {
  const [array, setArray] = useState([22.5, 23, 15, 30, 28]);
  const [labels, setLabels] = useState<string[]>(['']);
  const [activeTime, setActiveTime] = useState('last 24 hours');

  const chooseDate = start => {
    console.log('chooseDate', start);
    let date = new Date();
    switch (start) {
      case 'last 24 hours':
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      case '2 days ago':
        return moment(date).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '3 days ago':
        return moment(date).subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '4 days ago':
        return moment(date).subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '5 days ago':
        return moment(date).subtract(4, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '6 days ago':
        return moment(date).subtract(5, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '7 days ago':
        return moment(date).subtract(6, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '7 days - 14':
        return moment(date).subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '7 days - 14':
        return moment(date).subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '7 days - 21':
        return moment(date).subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '2 weeks ago':
        return moment(date).subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '3 weeks ago':
        return moment(date).subtract(14, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '4 weeks ago':
        return moment(date).subtract(21, 'days').format('YYYY-MM-DD HH:mm:ss');
      case '2 month ago':
        return moment(date).subtract(28, 'days').format('YYYY-MM-DD HH:mm:ss');
    }
  };
  useEffect(() => {
    NureseryTemperatureApi(
      route.params.childId,
      moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    )
      .then(({data}) => {
        console.log('success', data);
        let labels: string[] = [];
        let points = data
          .map(item => item.temperature[0])
          .map(item => {
            labels.push(item[0].time);
            return item[0].temperature;
          });
        labels.sort(
          (a: any, b: any) => a.replace(':', '') - b.replace(':', ''),
        );
        setLabels(labels);
        setArray(points.sort((a, b) => a - b));
      })
      .catch(err => {
        console.log('err', err);
        setArray([0]);
      });
  }, []);
  const chooseTimeOrIndex = (type, direction) => {
    console.log('active', time.length - 1);
    if (direction === 'left') {
      if (type == 'time') {
        return time.indexOf(activeTime) == 0
          ? time[time.length - 1]
          : time[time.indexOf(activeTime) - 1];
      } else {
        return time.indexOf(activeTime) == 0
          ? timeIndex[time.length - 1]
          : timeIndex[time.indexOf(activeTime) - 1];
      }
    } else {
      if (type == 'time') {
        return time.indexOf(activeTime) == time.length - 1
          ? time[0]
          : time[time.indexOf(activeTime) + 1];
      } else {
        return time.indexOf(activeTime) == 0
          ? timeIndex[time.length - 1]
          : timeIndex[time.indexOf(activeTime) - 1];
      }
    }
  };

  //left arrow
  const handleLeftData = () => {
    time.indexOf(activeTime) == 0
      ? setActiveTime(time[activeTime.length - 1])
      : setActiveTime(time[time.indexOf(activeTime) - 1]);

    let start = chooseTimeOrIndex('timeIndex', 'left');
    let end = chooseDate(chooseTimeOrIndex('time', 'left'));
    console.log('start', start);
    console.log('end', end);
    NureseryTemperatureApi(route.params.childId, start, end)
      .then(({data}) => {
        console.log('success', data);
        let labels: string[] = [];
        let points = data
          .map(item => item.temperature[0])
          .map(item => {
            labels.push(item[0].time);
            return item[0].temperature;
          });
        labels.sort(
          (a: any, b: any) => a.replace(':', '') - b.replace(':', ''),
        );
        setLabels(labels);
        setArray(points.sort((a, b) => a - b));
      })
      .catch(err => {
        console.log('err', err);
        setArray([0]);
      });
  };

  //right arrow
  const handleRightData = () => {
    time.indexOf(activeTime) == time.length - 1
      ? setActiveTime(time[0])
      : setActiveTime(time[time.indexOf(activeTime) + 1]);

    let start = chooseTimeOrIndex('timeIndex', 'right');
    let end = chooseDate(chooseTimeOrIndex('time', 'right'));
    console.log('start ', start);
    console.log('end ', start);
    NureseryTemperatureApi(route.params.childId, start, end)
      .then(({data}) => {
        console.log('success', data);
        let labels: string[] = [];
        let points = data
          .map(item => item.temperature[0])
          .map(item => {
            labels.push(item[0].time);
            return item[0].temperature;
          });
        labels.sort(
          (a: any, b: any) => a.replace(':', '') - b.replace(':', ''),
        ),
          setLabels(labels);
        setArray(points.sort((a, b) => a - b));
      })
      .catch(err => {
        console.log('err', err);
        setArray([0]);
      });
  };
  const [value, setValue] = useState({value: 0, y: 0, x: 0, yMax: 0, xMax: 0});
  useEffect(() => {
    let min = Math.min(...array);
    let max = Math.max(...array);
    let indexMin = array.indexOf(min);
    let indexMax = array.indexOf(max);
    console.log('min', min);
    console.log('--------------------', indexMax * 70 + 43);
    setValue(prev => ({
      ...prev,
      y: min * 10 + 90,
      x: indexMin * 100 + 43,
      xMax: indexMax * 70 + 43,
      yMax: (max * 8.97501) / array.length + 90,
    }));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={{paddingHorizontal: 5, paddingVertical: 5}}
            onPress={() => handleLeftData()}>
            <Image style={{width: 10.77, height: 18.86}} source={arrowLeft} />
          </TouchableOpacity>
          <View style={styles.headerWraper}>
            <Text style={styles.headerText}>{activeTime}</Text>
            <Text style={styles.headerTextTime}>24 hours - 1 day</Text>
          </View>
          <TouchableOpacity
            style={{paddingHorizontal: 5, paddingVertical: 5}}
            onPress={handleRightData}>
            <Image style={{width: 10.77, height: 18.86}} source={arrowRight} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.graphicContent}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.TextGraphic}>Now</Text>
          <Text style={styles.tempValueleft}>20 C</Text>
        </View>
        <View>
          <Text style={styles.TextGraphic}>Average for this 24h</Text>
          <Text style={styles.tempValueRight}>19 C</Text>
        </View>
      </View>
      <View>
        <Text style={{paddingTop: 12}}></Text>
        <LineChart
          onDataPointClick={(value, dataset, getColor) => {
            console.log('value', value);
            setValue(value);

            console.log('masoud');
          }}
          fromZero
          getDotColor={(dataPoint, dataPointIndex) => {
            if (dataPointIndex === 0) {
              return COLORS.textLight;
            }
            return COLORS.textLight;
          }}
          data={{
            labels: labels,
            datasets: [
              {
                data: array,
              },
              {
                data: [20], // min
                withDots: false,
              },
              {
                data: [30], // min
                withDots: false,
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={359}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: COLORS.back,
            backgroundGradientTo: COLORS.backGround,
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          //   bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <ImageBackground
          source={alertUp}
          style={{
            position: 'absolute',
            top: value.y - 10,
            left: value.x - 20,
            width: 40.25,
            height: 32.97,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: 2,
          }}>
          <Text style={{color: COLORS.text}}>{value.value}</Text>
        </ImageBackground>
        {/* <ImageBackground
          source={alertUp}
          style={{
            position: 'absolute',
            bottom: value.yMax,
            left: value.xMax,
            width: 40.25,
            height: 32.97,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: 2,
          }}>
          <Text style={{color: COLORS.text}}>{value.value}</Text>
        </ImageBackground> */}
      </View>
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
    paddingTop: 8,
    height: '100%',
    backgroundColor: '#272854',
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
});
