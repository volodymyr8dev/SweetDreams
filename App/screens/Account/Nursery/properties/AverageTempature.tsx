import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import arrowLeft from '../../../../assets/images/nersery/arrowLeft.png';
import arrowRight from '../../../../assets/images/nersery/arrowRight.png';
import sleepDiary from '../../../../assets/images/nersery/sleepDiary.png';
import alertUp from '../../../../assets/images/nersery/alertUp.png';
import alertDown from '../../../../assets/images/nersery/alertDown.png';
import {InputUnit} from '../../../../components/InputUnit/InputUnit';
import {COLORS} from '../../../../styles/Constants';
import {Blog} from '../../Settings/SettingsAccount';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
export const AverageTempature = () => {
  const array = [22.5, 23, 10, 30];

  const [value, setValue] = useState({value: 0, y: 0, x: 0, yMax: 0, xMax: 0});
  useEffect(() => {
    // let min = Math.min(...array);
    // let max = Math.max(...array);
    // let indexMin = array.indexOf(min);
    // let indexMax = array.indexOf(max);
    // console.log('min', min);
    // console.log('--------------------', indexMax * 70 + 43);
    // setValue(prev => ({
    //   ...prev,
    //   y: min * 8.97501 + 90,
    //   x: indexMin * 70 + 43,
    //   xMax: indexMax * 70 + 43,
    //   yMax: (max * 8.97501) / array.length + 90,
    // }));
  }, []);
  console.log('value222', value);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={{width: 10.77, height: 18.86}} source={arrowLeft} />
          <View style={styles.headerWraper}>
            <Text style={styles.headerText}>24 hours - 1 day</Text>
            <Text style={styles.headerTextTime}>24 hours - 1 day</Text>
          </View>
          <Image style={{width: 10.77, height: 18.86}} source={arrowRight} />
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
          data={{
            labels: ['12', '18', '24', '6', '12'],
            datasets: [
              {
                data: array,
              },
              {
                data: [1], // min
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
});
