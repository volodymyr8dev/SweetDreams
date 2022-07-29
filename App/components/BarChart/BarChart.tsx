import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const lines = [
  {start: 14, end: 16.3, isActive: false},
  {start: 12, end: 17.32, isActive: false},
  {start: 15, end: 20.3, isActive: false},
  {start: 12, end: 16.3, isActive: false},
  {start: 12, end: 16.4, isActive: false},
  {start: 12, end: 16.3, isActive: false},
  {start: 12, end: 16.3, isActive: false},
  {start: 12, end: 16.3, isActive: false},
];
const koef = 0.2625;
console.log((Dimensions.get('window').width - 36) / 12);
console.log('qqqqqq', 0.2625 * 150);
const lines2 = [{starts: 13, ends: 15}];
export const BarChartComp = () => {
  const [state, setState] = useState(lines);
  const [location, setLocation] = useState({
    x: 0,
    y: 0,
  });
  console.log('state', state);
  return (
    <View style={styles.container}>
      <View style={styles.containerGraph}>
        {lines.map((item, index) => {
          console.log(item);
          const time = item.end - item.start;
          //   let timeForModal = time.toFixed(2);
          //     const splittedTime = timeForModal.split('.');
          //     console.log(splittedTime);
          //     let timeModal = timeForModal.replace('.',':')
          //     if (+splittedTime[0] < 10){
          //         timeModal = `0${splittedTime[0]}:${splittedTime[1]}`;
          //     }
          //     console.log(timeModal);

          //   console.log(timeForModal, 'timee');
          let w = time * 60 * koef;
          return (
            <>
              <View style={styles.lineContainer}>
                <View style={styles.verticalCont}>
                  <TouchableOpacity
                    onPress={e => {
                      setState(
                        state.map((item, indexMap) => {
                          index == indexMap
                            ? (item.isActive = true)
                            : (item.isActive = false);
                          return item;
                        }),
                      );
                      console.log('y', e.nativeEvent.locationY);
                      setLocation({
                        x: e.nativeEvent.locationX,
                        y: e.nativeEvent.locationY,
                      });
                      console.log('event', e.nativeEvent.locationX);
                    }}
                    style={[
                      styles.blockActivity,
                      !item.start && {backgroundColor: 'transparent'},
                      item?.start && {
                        width: w,
                      },
                    ]}>
                    <View
                      style={{
                        position: 'absolute',
                        // top: location.x,
                        // left: location.y,
                        top: location.y,
                        left: location.x,
                        width: 20,
                        height: 20,
                      }}>
                      {item.isActive ? <Text>{item.isActive}</Text> : null}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        })}
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>1</Text>
        <Text>2</Text>
        <Text>3</Text>
        <Text>4</Text>
        <Text>5</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  graphStyle: {
    flex: 1,
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
    // backgroundColor: 'red',
    // opacity: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineContainer: {
    height: '100%',
    width: 0.77,
    opacity: 0.7,
    backgroundColor: '#fff',
    position: 'relative',
  },
  blockActivity: {
    position: 'relative',

    justifyContent: 'center',
    position: 'absolute',
    top: Dimensions.get('window').height / 6.5,
    left: 1,
    backgroundColor: '#B865C1',
    opacity: 0.8,
    width: (Dimensions.get('window').width - 36) / 12,
    height: 170,
  },
  verticalCont: {
    // alignItems: 'flext-start',
  },
});
