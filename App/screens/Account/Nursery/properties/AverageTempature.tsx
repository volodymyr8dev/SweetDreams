import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import arrowLeft from '../../../../assets/images/nersery/arrowLeft.png';
import arrowRight from '../../../../assets/images/nersery/arrowRight.png';
import sleepDiary from '../../../../assets/images/nersery/sleepDiary.png';
import alertUp from '../../../../assets/images/nersery/alertUp.png';
import {
  COLORS,
  time,
  chooseDate,
  chooseTimeOrIndex,
} from '../../../../styles/Constants';
import {LineChart} from 'react-native-chart-kit';
import {Blog} from '../../../../components/Touchable/TouchableInput';
import {NurseryTemperatureApi} from '../../../../api/Nursery/Nursery';
import moment from 'moment';
import { AnyAction } from 'redux';

export const AverageTempature = ({route}) => {
  const [array, setArray] = useState([0]);
  const [labels, setLabels] = useState<string[]>(['']);
  const [activeTime, setActiveTime] = useState('last 24 hours');
  const [diary, setDiary] = useState('');
  const [start, setStart] = useState(
    moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'),
  );
  const [end, setEnd] = useState(moment(new Date()).format('YYYY-MM-DD'));

  useEffect(() => {
    setStart(moment(start).format('YYYY-MM-DD'));
    setEnd(moment(end).format('YYYY-MM-DD'));
    NurseryTemperatureApi(
      route.params.childId,
      moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    )
      .then(({data}) => {
        console.log('success', data);
        setDiary(data[0].diaries);
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

  //left arrow
  const handleLeftData = () => {
    setValue(data => ({...data, value: 0}));

    time.indexOf(activeTime) == 0
      ? setActiveTime(time[activeTime.length - 1])
      : setActiveTime(time[time.indexOf(activeTime) - 1]);

    let start = chooseTimeOrIndex('timeIndex', 'left', activeTime);
    let end = chooseDate(chooseTimeOrIndex('time', 'left', activeTime));
    setStart(moment(start).format('YYYY-MM-DD'));
    setEnd(moment(end).format('YYYY-MM-DD'));
    console.log('start', start);
    console.log('end', end);
    NurseryTemperatureApi(route.params.childId, start, end)
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
        console.log('err', err.response);
        setArray([0]);
      });
  };

  //right arrow
  const handleRightData = () => {
    setValue(data => ({...data, value: 0}));
    time.indexOf(activeTime) == time.length - 1
      ? setActiveTime(time[0])
      : setActiveTime(time[time.indexOf(activeTime) + 1]);

    let start = chooseTimeOrIndex('timeIndex', 'right', activeTime);
    let end = chooseDate(chooseTimeOrIndex('time', 'right', activeTime));
    setStart(moment(start).format('YYYY-MM-DD'));
    setEnd(moment(end).format('YYYY-MM-DD'));
    console.log('start ', start);
    console.log('end ', end);

    NurseryTemperatureApi(route.params.childId, start, end)
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
  const [value, setValue] = useState<any>({value: 0, y: 0, x: 0, yMax: 0, xMax: 0});
  useEffect(() => {
    // let min = Math.min(...array);
    // let max = Math.max(...array);
    // let indexMin = array.indexOf(min);
    // let indexMax = array.indexOf(max);
    // console.log('min', min);
    // console.log('--------------------', indexMax * 70 + 43);
    // setValue(prev => ({
    //   ...prev,
    //   y: min * 10 + 90,
    //   x: indexMin * 100 + 43,
    //   xMax: indexMax * 70 + 43,
    //   yMax: (max * 8.97501) / array.length + 90,
    // }));
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
            <Text style={styles.headerTextTime}>{`${start} - ${end}`}</Text>
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
          onDataPointClick={value => {
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
            opacity: value.value,
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
      </View>
      <View style={styles.InputUnit}>
        <Blog
          styleText={styles.styleText}
          styleImage={styles.styleImage}
          style={styles.bottomButton}
          title={'Sleep Diary'}
          rightEl={`${diary} entries`}
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
