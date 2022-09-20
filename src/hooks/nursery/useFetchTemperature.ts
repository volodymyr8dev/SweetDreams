import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {NurseryTemperatureApi}      from '../../api/Nursery/Nursery';
import { dateTimeFormat}            from '../../utils/time';

export const useFetchTemperature = (id, deviceId, dataStart,dataEnd) => {

    const [labels,setLabels]              = useState<string[]>(['10/01'])
    const [temperatures,setTemperatures]  = useState<number[]>([0])
    const [options,setOptions]  = useState<any>([])
    const [diaries,setDiaries]            = useState<number>(0)

    useEffect(() => {
   
       let start = dateTimeFormat(dataStart)
       let end = dateTimeFormat(dataEnd)

      NurseryTemperatureApi(id,deviceId, start,end)
        .then(({data}) => {
          console.log('[Average Temperature data resolved]', data);
          
          setDiaries(data.diaries)

          if(Object.keys(data.temperatures).length){
            setOptions(data.temperatures)
          }
          if(data?.temperatures?.data){
            
            setTemperatures(Object.values(data?.temperatures?.data))

            let labels: string[] = [];

            Object.keys(data?.temperatures?.data).map((key)=>{
              labels.push( moment(key).format('DD/MM'))
            })

            setLabels(labels)
          };
        })
        .catch(err => {
          console.log('[Average Temperature switch data rejected]', err.response);
          setTemperatures([0]);
        });
  }, [dataStart]);
  return {
    labels,
    temperatures,
    diaries,
    options
  }
};

