import React, {useState, useEffect}                      from 'react';
import {StyleSheet,Text,View,Image,Dimensions,
          ImageBackground,  TouchableOpacity }           from 'react-native';
import { useSelector }                                   from 'react-redux';
import { RootReducerState }                              from '../../../../redux';
import moment                                            from 'moment';

//icons
import arrowLeft                                         from '../../../../assets/images/nursery/arrowLeft.png';
import arrowRight                                        from '../../../../assets/images/nursery/arrowRight.png';
import sleepDiary                                        from '../../../../assets/images/nursery/sleepDiary.png';
import alertUp                                           from '../../../../assets/images/nursery/alertUp.png';

//components
import {Blog}                                            from '../../../../components/Touchable/TouchableInput';

//hooks
import { useFetchTemperature }                           from '../../../../hooks/nursery/useFetchTemperature';

import {COLORS,time,chooseDate,chooseTimeOrIndex}        from '../../../../styles/Constants';
import { dateFormat }                                    from '../../../../utils/time';
import { AverageGraph }                                  from './AverageGraph';


export const AverageTempature = ({route}) => {

  const { user } = useSelector((state: RootReducerState) => state.auth);

  const [activeTime, setActiveTime] = useState('last 24 hours');
  const [start, setStart]           = useState(moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'));
  const [end, setEnd]               = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [value, setValue]           = useState<any>({value: 0, y: 0, x: 0, yMax: 0, xMax: 0});


  const device   = user.accounts[0]?.devices[0];
  const accounts = user.accounts;
  let   option   = route.params.option;


  const {diaries,labels,temperatures}   = useFetchTemperature(accounts[0].id,device.id,start,end) 


  console.log('[Average Temperature fetch]',diaries,labels,temperatures)

  //left arrow
  const handleLeftData = () => {
    // setValue(data => ({...data, value: 0}));

    time.indexOf(activeTime) == 0
      ? setActiveTime(time[activeTime.length - 1])
      : setActiveTime(time[time.indexOf(activeTime) - 1]);

    let start = chooseTimeOrIndex('timeIndex', 'left', activeTime);
    let end = chooseDate(chooseTimeOrIndex('time', 'left', activeTime));

    setStart(dateFormat(start));
    setEnd(dateFormat(end));
  };

  //right arrow
  const handleRightData = () => {
    // setValue(data => ({...data, value: 0}));

    time.indexOf(activeTime) == time.length - 1
      ? setActiveTime(time[0])
      : setActiveTime(time[time.indexOf(activeTime) + 1]);

    let start = chooseTimeOrIndex('timeIndex', 'right', activeTime);
    let end = chooseDate(chooseTimeOrIndex('time', 'right', activeTime));
   
    setStart(dateFormat(start));
    setEnd(dateFormat(end));
  };

  useEffect(() => {
    // let min = Math.min(...array);
    // let max = Math.max(...array);
    // let indexMin = array.indexOf(min);
    // let indexMax = array.indexOf(max);
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
      {option == 'last 24 hours' ? (
        <View style={styles.graphicContent}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.TextGraphic}>Now</Text>
            <Text style={styles.tempValueleft}>20°C</Text>
          </View>
          <View>
            <Text style={styles.TextGraphic}>Average for this 24h</Text>
            <Text style={styles.tempValueRight}>
              19°C
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.addInformation}>
          <Text style={styles.headerTextTime}>Total for these days</Text>
          <Text style={styles.headerTextTime}>(average over 28 days)</Text>
          <Text style={styles.addText}>
            {/* {averageFor24 ? averageFor24.toFixed(2) : averageTemp} */}
            19°C
          </Text>
          <Text></Text>
        </View>
      )}
      <AverageGraph
          option={option}
          labels={labels}
          temperatures={temperatures}
        />
      <View>
        <Text style={{paddingTop: 12}}></Text>
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
          rightEl={`${diaries} entries`}
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
  addInformation: {
    paddingTop: 43,
    alignItems: 'center',
  },
  addText: {
    paddingTop: 5.55,
    color: COLORS.yellow,
    fontSize: 20,
    fontFamily: 'AntagometricaBT-Bold',
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
