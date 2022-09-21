import React, {useState, useEffect}                      from 'react';
import {StyleSheet,Text,View,Image,
       ImageBackground,TouchableOpacity}                 from 'react-native';
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

import {COLORS,time,HandleStartTime,EndTime,startFirst}  from '../../../../styles/Constants';
import { AverageGraph }                                  from './AverageGraph';
import { dateFormat }                                    from '../../../../utils/time';


export const AverageTempature = ({route}) => {

  const { user } = useSelector((state: RootReducerState) => state.auth);

  let option     = route.params.option
  let timeArray  = time[option]

  const [activeTime, setActiveTime] = useState(option);
  const [start, setStart]           = useState(startFirst[option]);
  const [end, setEnd]               = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [value, setValue]           = useState<any>({value: 0, y: 0, x: 0, yMax: 0, xMax: 0});
  // const [fetchedTemp, setFetchedTemp] = useState<any>();

  const device   = user.accounts[0]?.devices[0];
  const accounts = user.accounts;
  
  
  const {diaries,labels,temperatures,options}   = useFetchTemperature(accounts[0].id,device.id,start,end) 
  
  console.log('[Average Temperature fetch]',temperatures)

  //left right arrow
  const handleSwitchData = (type) => {
    // setValue(data => ({...data, value: 0}));
 let indexActiveT   =  timeArray.indexOf(activeTime)
 let start          =  '';
 let tempActiveTime = '' 
 
  if(type == 'left'){

  timeArray.indexOf(activeTime) == 0
  ? tempActiveTime =(timeArray[timeArray.length - 1])
  : tempActiveTime =(timeArray[indexActiveT - 1]);

   start = HandleStartTime('left',option,activeTime);

  } else{

  indexActiveT == timeArray.length - 1
  ? tempActiveTime = (timeArray[0])
  : tempActiveTime =(timeArray[indexActiveT + 1]);

   start = HandleStartTime('right',option,activeTime);
}
    setActiveTime(tempActiveTime)
    
    setStart(dateFormat(start));
    setEnd(dateFormat(EndTime(tempActiveTime,option)));
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
              onPress={() => handleSwitchData('left')}>
              <Image style={{width: 10.77, height: 18.86}} source={arrowLeft} />
            </TouchableOpacity>
            <View style={styles.headerWraper}>
              <Text style={styles.headerText}>{activeTime}</Text>
              <Text style={styles.headerTextTime}>{`${start} - ${end}`}</Text>
            </View>
            <TouchableOpacity
              style={{paddingHorizontal: 5, paddingVertical: 5}}
              onPress={()=>handleSwitchData('right')}>
              <Image style={{width: 10.77, height: 18.86}} source={arrowRight} />
            </TouchableOpacity>
          </View>
        </View>
      {route.params.option == 'last 24 hours' ? (
        <View style={styles.graphicContent}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.TextGraphic}>Now</Text>
            <Text style={styles.tempValueleft}>{options ? options.average:0}°C</Text>
          </View>
          <View>
            <Text style={styles.TextGraphic}>Average for this 24h</Text>
            <Text style={styles.tempValueRight}>
            {temperatures.length?(temperatures.reduce((acc, val)=>acc+val,0)/temperatures.length).toFixed(2):0}°C
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.addInformation}>
          <Text style={styles.headerTextTime}>Total for these days</Text>
          <Text style={styles.headerTextTime}>(average over 28 days)</Text>
          <Text style={styles.addText}>
            {temperatures.length?(temperatures.reduce((acc, val)=>acc+val,0)/temperatures.length).toFixed(2):0}°C
          </Text>
          <Text></Text>
        </View>
      )}
      <AverageGraph
          option={route.params.option}
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
          rightEl={`${diaries ? diaries :0} entries`}
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
    fontFamily: 'AntagometricaBT-Bold',
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
    fontFamily: 'AntagometricaBT-Bold',
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
  bottomButton: {height: 76},
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

