import React, {useEffect, useState} from 'react';
import {NurseryTemperatureApi}      from '../../api/Nursery/Nursery';
import { dateTimeFormat}            from '../../utils/time';

export const useFetchTemperature = (id, deviceId, dataStart,dataEnd) => {

    const [data,setData]                  = useState()
    const [labels,setLabels]              = useState<string[]>([])
    const [temperatures,setTemperatures]  = useState<number[]>([])
    const [diaries,setDiaries]            = useState<number>(0)

    useEffect(() => {
   
       let start = dateTimeFormat(dataStart)
       let end = dateTimeFormat(dataEnd)
    
      NurseryTemperatureApi(id,deviceId, start,end)
        .then(({data}) => {
          console.log('[Average Temperature data resolved]', data);

          setData(data)
          
        //   let labels: string[] = [];
        //   let points = data
        //     .map(item => item.temperature[0])
        //     .map(item => {
        //       labels.push(item[0].time);
        //       return item[0].temperature;
        //     });
        //   labels.sort(
        //     (a: any, b: any) => a.replace(':', '') - b.replace(':', ''),
        //   );

        //   setLabels(labels);
        //   setTemperatures(points.sort((a, b) => a - b));
        })
        .catch(err => {
          console.log('[Average Temperature switch data rejected]', err.response);

          setTemperatures([0]);
        });
  }, [dataStart]);
  return {
    data,
    labels,
    temperatures,
    diaries
  }
};

