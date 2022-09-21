import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {NurseryTemperatureApi}      from '../../api/Nursery/Nursery';
import { dateTimeFormat}            from '../../utils/time';

export const useFetchTemperature = (id, deviceId, dataStart,dataEnd) => {

    const [labels,setLabels]              = useState<any[]>([])
    const [temperatures,setTemperatures]  = useState<any[]>([])
    const [options,setOptions]  = useState<any>([])
    const [diaries,setDiaries]            = useState<any>(0)

    useEffect(() => {
   
       let start = dateTimeFormat(dataStart)
       let end = dateTimeFormat(dataEnd)

       console.log('start',start)
       console.log('end',end)
       
      NurseryTemperatureApi(id,deviceId, start,end)
        .then(({data}) => {
          console.log('[Average Temperature data resolved]', data);
          
          setDiaries(data.diaries)

          if(Object.keys(data.temperatures).length){
            setOptions(data.temperatures)
          }
          if(data?.temperatures?.data){
            console.log('data?.temperatures?.data',data?.temperatures?.data)
            setTemperatures(Object.values(data?.temperatures?.data))

            let labels: string[] = [];

            Object.keys(data?.temperatures?.data).map((key)=>{
              labels.push( moment(key).format('DD/MM'))
            })

            setLabels(labels)
          }else{
            setTemperatures([])
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

