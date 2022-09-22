import React, {useState}                                    from 'react';
import {Dimensions, StyleSheet, View, Text}                 from 'react-native';
import {BarChart, LineChart}                                from 'react-native-chart-kit';
import * as _                                               from 'lodash';

import {chartConfigDays, chartConfigMonth, LineChartConfig} from './_dataGraph';

import {IAvrageGraph}                                       from './interface';
import {COLORS}                                             from '../../../../styles/Constants';
import { splitToChunks }                                    from '../../../../utils/helper';

export const AverageGraph = React.memo(
  ({option, labels, temperatures}: IAvrageGraph) => {

    const data = {labels: [], datasets: [{data: temperatures}]};


    // function* chunks(arr, n) {
    //   for (let i = 0; i < arr.length; i += n) {
    //     yield arr.slice(i, i + n);
    //   }
    // }

    const getAverageValue = (array)=>{
      return array.map(arr =>(arr.reduce((partialSum, a) => partialSum + a, 0)/array.length).toFixed(2));
    }

    const daysData = () => {
      const chunkLabels = _.chunk(labels, 4);
      const chunkTemperatures = _.chunk(temperatures, 4);
     
      const arrayTemperatures = chunkTemperatures.map(array => {
        return array.length ? array[0] : null;
      });
     
      const arrayOfLabels = chunkLabels.map(array => {
        return array.length ? array[0] : null;
      });

      return {
        labels: arrayOfLabels,
        datasets: [{data: arrayTemperatures? arrayTemperatures: data}],
      };
    };

    const monthsData = () => {
      const tempLabels = splitToChunks(labels, 4);
      const tempTemperatures = _.chunk(temperatures, 7);

      let sum = getAverageValue(tempTemperatures)

      const arrayOfLabels = tempLabels.map(labelArray => {
        const {0: first, length, [length - 1]: last} = labelArray; //getting first and last el from array

        return first && last
          ? [first?.split('/')[0] + '-' + last?.split('/')[0]]
          : null;
      });

      return {labels: arrayOfLabels, datasets: [{data: sum}]};
    };


    return (
      <View style={styles.container}>
        {option == 'last 24 hours' ? (
          temperatures.length ? (
            <LineChart
              fromZero
              getDotColor={(dataPoint, dataPointIndex) => {
                return dataPointIndex === 0
                  ? COLORS.textLight
                  : COLORS.textLight;
              }}
              data={daysData()}
              width={Dimensions.get('window').width}
              height={359}
              yAxisInterval={1}
              chartConfig={LineChartConfig}
              style={{marginVertical: 8, borderRadius: 16}}
            />
          ) : (
            <View style={{paddingRight: 8, paddingTop: 10}}>
              <Text style={styles.noDisplay}>There is no data to display</Text>
            </View>
          )
        ) : temperatures.length ? (
          <BarChart
            style={styles.graphStyle}
            showBarTops={true}
            showValuesOnTopOfBars={true}
            withInnerLines={true}
            segments={5}
            data={temperatures.length > 1 ? monthsData() : data}
            width={Dimensions.get('window').width - 50}
            height={364.21}
            chartConfig={
              option == 'last 7 days' ? chartConfigDays : chartConfigMonth
            }
            verticalLabelRotation={0}
            yAxisLabel=""
            yAxisSuffix=""
            fromZero
          />
        ) : (
          <View style={{paddingRight: 8, paddingTop: 10}}>
            <Text style={styles.noDisplay}>There is no data to display</Text>
          </View>
        )}
        
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  graphStyle: {
    paddingTop: 20,
    flex: 1,
    marginRight: -35,
    paddingRight: 39,
  },
  noDisplay: {
    fontSize: 16,
    fontFamily: 'AntagometricaBT-Regular',
    color: 'white',
  },
});
