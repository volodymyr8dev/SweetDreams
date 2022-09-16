import React, {useEffect, useState}                         from 'react';
import {Dimensions, StyleSheet, View, Text}                 from 'react-native';
import { useIsFocused }                                     from '@react-navigation/native';
import {BarChart, LineChart}                                from 'react-native-chart-kit';
import { useSelector }                                      from 'react-redux';
import { RootReducerState }                                 from '../../../../redux';
import  moment                                              from 'moment';

import {chartConfigDays, chartConfigMonth, LineChartConfig} from './_dataGraph';
import { IAvrageGraph }                                     from './interface';
import {COLORS}                                             from '../../../../styles/Constants';


export const AverageGraph = ({option,labels,temperatures}: IAvrageGraph) => {


  const { user } = useSelector((state: RootReducerState) => state.auth);
  const {id}     = user.accounts[0];

  const isFocused = useIsFocused();

  const data = {
    labels: labels,
    legend: ['L1', 'L2', 'L3', 'L4', 'L5'],
    datasets: [{data: temperatures}],
  };


  //days
  const daysData = data => {

  };

  //weeks
  const weekData = data => {
   
  };

  //monts
  const monthsData = data => {
  };

  return (
    <View style={styles.container}>
      {option == 'last 24 hours' ? (
        temperatures.length ? (
          <LineChart
            fromZero
            getDotColor={(dataPoint, dataPointIndex) => {
              return dataPointIndex === 0 ? COLORS.textLight : COLORS.textLight;
            }}
            data={{
              labels: labels,
              datasets: [{data: temperatures}],
            }}
            width={Dimensions.get('window').width}
            height={359}
            yAxisInterval={1}
            chartConfig={LineChartConfig}
            style={{marginVertical: 8,borderRadius: 16}}
          />
        ) : (
          <View style={{paddingRight: 8, paddingTop: 10}}>
            <Text style={styles.noDisplay}>There is no data to display</Text>
          </View>
        )
      ) :(
        <BarChart
          style={styles.graphStyle}
          showBarTops={true}
          showValuesOnTopOfBars={true}
          withInnerLines={true}
          segments={5}
          data={data}
          width={Dimensions.get('window').width - 50}
          height={364.21}
          chartConfig={ option == 'last 7 days' ? chartConfigDays: chartConfigMonth}
          verticalLabelRotation={0}
          yAxisLabel=""
          yAxisSuffix=""
          fromZero
        />
      )}
    </View>
  );
};

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