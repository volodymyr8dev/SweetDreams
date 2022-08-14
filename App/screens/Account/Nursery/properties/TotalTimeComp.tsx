import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import {
  chooseDate,
  chooseTimeOrIndex,
  COLORS,
  time,
} from '../../../../styles/Constants';
import {BarChartComp} from '../../../../components/BarChart/BarChart';
import {Blog} from '../../../../components/Touchable/TouchableInput';
import {BarChart} from 'react-native-chart-kit';

//assets
import sleepDiary from '../../../../assets/images/nersery/sleepDiary.png';
import arrowLeft from '../../../../assets/images/nersery/arrowLeft.png';
import AlertData from '../../../../assets/images/nersery/alertData.png';
import {NureseryGetChartsApi} from '../../../../api/Nursery/Nuresery';
import {array, object} from 'yup/lib/locale';
import {useSelector} from 'react-redux';

const chartConfig = {
  topRadius: 8,
  bottomRadius: 20,
  backgroundGradientFrom: '#272854',
  backgroundGradientTo: '#272854',

  barPercentage: 1,
  decimalPlaces: 1,
  color: (opacity = 1) => `rgb(184, 101, 193)`,
  labelColor: (opacity = 1) => COLORS.text,
  fillShadowGradient: `rgb(184, 101, 193)`,
  fillShadowGradientOpacity: 1,
  style: {borderRadius: 16},
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: '#efefef',
    strokeDasharray: '.3',
  },
};

const data = {
  labels: ['19/08', '20/08', '21/08', '22/08', '23/08', '24/08'],
  legend: ['L1', 'L2', 'L3', 'L4', 'L5'],
  datasets: [
    {
      data: [19.46, 19.45, 19.47, 19.45, 19.5, 19.5],
    },
  ],
};
const labels = ['19/08', '20/08', '21/08', '22/08', '23/08', '24/08'];

export const TotalTimeComp = ({route}) => {
  let date = new Date();
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState(true);
  const [activeTime, setActiveTime] = useState('last 24 hours');
  const [activeLabels, setActivelabels] = useState(labels);
  const [start, setStart] = useState(
    moment(date).subtract(1, 'days').format('YYYY-MM-DD'),
  );
  const [end, setEnd] = useState(moment(date).format('YYYY-MM-DD'));
  const [average, setAverage] = useState();
  const [total, setTotal] = useState();
  const nerseryId = useSelector(({account}) => account.nersery.id);
  console.log('average', average);
  useEffect(() => {
    setStart(moment(start).format('YYYY-MM-DD'));
    setEnd(moment(end).format('YYYY-MM-DD'));
  }, []);

  useEffect(() => {
    let diff = getDayDiff(end, start);
    console.log('diff', diff);
    if (diff == 1) {
      setValue(true);
    } else {
      setValue(false);
    }
  }, [start]);
  useEffect(() => {
    const getData = async () => {
      try {
        if (nerseryId && start && end) {
          const {data} = await NureseryGetChartsApi(
            route.params.childId,
            nerseryId,
            start,
            end,
          );

          // setTotal(data[`${end}_${end}`][`${end}_${end}`]);
        }
        // setAverage(result[`${start}_${end}`]['average over 28 days']);
        // setTotal(
        //   result[`${start}_${end}`]['total_28days_time_without_activation'],
        // );
        // Object.keys()
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  function getDayDiff(dateOne, dateTwo) {
    dateOne = moment(dateOne);
    dateTwo = moment(dateTwo);
    return dateOne.diff(dateTwo, 'days');
  }

  const getValuesApi = async (start, end) => {
    try {
      const {data} = await NureseryGetChartsApi(
        route.params.childId,
        nerseryId,
        start,
        end,
      );
      if (getDayDiff(end, start) == 1 && !Array.isArray(data)) {
        console.log('data', data);

        let temperature = [];
        let twoDays = data[`${start}_${end}`][`${start}_${end}`];

        setAverage(
          twoDays[`${start}`] !== null
            ? twoDays[`${start}`]['average_over_24hours']
            : twoDays[`${end}`]['average_over_24hours'],
        );

        if (twoDays[`${start}`]) {
          Object.values(twoDays[`${start}`]).forEach((item: any) => {
            item?.temperature ? temperature.push(item) : '';
          });
          console.log('temperature', temperature)
        }
      }

      // setTotal(
      //   result[`${start}_${end}`]['total_28days_time_without_activation'],
      // );
      // Object.keys()
    } catch (err) {
      console.log('getValuesError', err);
    }
  };

  //left
  const handleLeftTime = () => {
    time.indexOf(activeTime) == 0
      ? setActiveTime(time[activeTime.length - 1])
      : setActiveTime(time[time.indexOf(activeTime) - 1]);

    let start = chooseTimeOrIndex('timeIndex', 'left', activeTime);
    let end = chooseDate(chooseTimeOrIndex('time', 'left', activeTime));

    setStart(moment(start).format('YYYY-MM-DD'));
    setEnd(moment(end).format('YYYY-MM-DD'));

    getValuesApi(
      moment(start).format('YYYY-MM-DD'),
      moment(end).format('YYYY-MM-DD'),
    );
    let diff = getDayDiff(end, start);
    if (diff == 1) {
      setActivelabels(['12', '16', '20', '24', '4', '8']);
    } else {
      let daysStart = Number(moment(start).format('D'));
      let daysEnd = Number(moment(end).format('D'));
      let arr: string[] = [];
      let countOfDays = Number(moment(start).daysInMonth());
      console.log('daysStart', daysStart);
      console.log('daysEnd', daysEnd);
      console.log('activeTime', activeTime);
      if (activeTime == 'last 24 hours') {
        console.log('2 month', moment(start).add(5, 'days').format('DD'));
        arr.push(`${daysStart}-${moment(start).add(7, 'days').format('DD')}`);
        arr.push(
          `${moment(start).add(7, 'days').format('DD')}-${moment(start)
            .add(14, 'days')
            .format('DD')}`,
        );
        arr.push(
          `${moment(start).add(14, 'days').format('DD')}-${moment(start)
            .add(21, 'days')
            .format('DD')}`,
        );
        arr.push(
          `${moment(start).add(21, 'days').format('DD')}-${moment(start)
            .add(28, 'days')
            .format('DD')}`,
        );
        setActivelabels(arr);
      } else if (daysEnd > daysStart) {
        console.log('countOfDays', countOfDays);
        for (let i = daysStart; i < daysEnd; i++) {
          console.log('i', i);
          arr.push(`${i}`);
        }
        setActivelabels(arr);
      } else {
        for (let i = daysStart; i < countOfDays; i++) {
          console.log('i', i);
          arr.push(`${i}`);
        }
        for (let i = 1; i < daysEnd; i++) {
          arr.push(`${i}`);
        }
        setActivelabels(arr);
      }
    }
  };

  //right
  const handleRightTime = () => {
    time.indexOf(activeTime) == time.length - 1
      ? setActiveTime(time[0])
      : setActiveTime(time[time.indexOf(activeTime) + 1]);

    let start = chooseTimeOrIndex('timeIndex', 'right', activeTime);
    let end = chooseDate(chooseTimeOrIndex('time', 'right', activeTime));

    setStart(moment(start).format('YYYY-MM-DD'));
    setEnd(moment(end).format('YYYY-MM-DD'));

    console.log('start ', start);
    console.log('end ', end);

    //   NureseryTemperatureApi(route.params.childId, start, end)
    //     .then(({data}) => {
    //       console.log('success', data);
    //       let labels: string[] = [];
    //       let points = data
    //         .map(item => item.temperature[0])
    //         .map(item => {
    //           labels.push(item[0].time);
    //           return item[0].temperature;
    //         });
    //       labels.sort((a: any, b: any) => a.replace(':', '') - b.replace(':', '')),
    //         setLabels(labels);
    //       setArray(points.sort((a, b) => a - b));
    //     })
    //     .catch(err => {
    //       console.log('err', err);
    //       setArray([0]);
    //     });
  };

  useEffect(() => {
    if (value) {
      setActivelabels(['12', '16', '20', '24', '4', '8']);
    } else {
      setActivelabels(['']);
    }
  }, [value]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={handleLeftTime}>
          <Image style={{width: 10.77, height: 18.86}} source={arrowLeft} />
        </TouchableOpacity>
        <View style={styles.headerWraper}>
          <Text style={styles.headerText}>{activeTime}</Text>
          <Text style={styles.headerTextTime}>{`${start} - ${end}`}</Text>
        </View>
        <TouchableOpacity onPress={handleRightTime}>
          <Image style={styles.arrowIcon} source={arrowLeft} />
        </TouchableOpacity>
      </View>
      <View style={styles.borderBlock}></View>
      <View style={styles.headerDown}>
        <Text style={styles.totalTime}>Total for this 24h</Text>
        <Text style={styles.totalTop}>{average}</Text>
      </View>

      {value ? (
        <BarChartComp activeLabels={activeLabels} />
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
          yAxisLabel=""
          yAxisSuffix=""
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
      {isOpen ? (
        <View style={styles.modal}>
          <View style={{paddingTop: 25}}>
            <Image style={{width: 69.71, height: 52.07}} source={AlertData} />
          </View>
          <View>
            <Text style={styles.alertTitle}>
              Run finger over table to pin point data
            </Text>
          </View>
          <View style={styles.alertSubContainer}></View>
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => {
              setIsOpen(false);
            }}>
            <Text style={styles.alertOk}>ok, Got it</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
    position: 'relative',
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
    width: 300,
    height: 220,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 42,
    transform: [
      {
        translateX: -150,
      },
      {
        translateY: -120,
      },
    ],
  },
  alertSubContainer: {
    height: 1,
    width: 300,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  alertTitle: {
    paddingBottom: 22.9,
    marginTop: 10,
    color: COLORS.text,
    fontSize: 20,
    fontFamily: 'AntagometricaBT-Bold',
    textAlign: 'center',
  },
  alertOk: {
    paddingTop: 19.19,
    color: COLORS.text,
    fontFamily: 'AntagometricaBT-Regular',
    fontSize: 19,
  },
  borderBlock: {
    width: '100%',
    paddingBottom: 27.21,
    borderBottomColor: COLORS.text,
    borderBottomWidth: 3,
  },
  totalTime: {
    color: COLORS.text,
    fontSize: 13,
    fontFamily: 'AntagometricaBT-Regular',
    paddingBottom: 5,
  },
  totalTop: {
    color: COLORS.yellow,
    fontSize: 20,
    fontFamily: 'AntagometricaBT-Bold',
  },
  arrowIcon: {
    width: 10.77,
    height: 18.86,
    transform: [{rotateY: '180deg'}],
  },
});
