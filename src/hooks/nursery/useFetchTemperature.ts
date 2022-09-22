import React, {useEffect, useState} from 'react';
import moment                       from 'moment';
import { Alert }                    from 'react-native';
import {NurseryTemperatureApi}      from '../../api/Nursery/Nursery';
import { dateTimeFormat}            from '../../utils/time';

export const useFetchTemperature = (id, deviceId, dataStart,dataEnd) => {

    const [labels,setLabels]              = useState<string[]>([])
    const [temperatures,setTemperatures]  = useState<number[]>([])
    const [options,setOptions]            = useState<any>()
    const [diaries,setDiaries]            = useState<number>(0)

    useEffect(() => {
      let isMounted = true; 
       let start = dateTimeFormat(dataStart)
       let end = dateTimeFormat(dataEnd)
       
       console.log('start',start)
       console.log('end',end)
if(isMounted){

      NurseryTemperatureApi(id,deviceId, start,end)
        .then(({data}) => {
          console.log('[Average Temperature data resolved]', data);
          
          setDiaries(data.diaries)

       
          if(data?.temperatures?.data){
            setTemperatures(Object.values(data?.temperatures?.data))

            let labels: string[] = [];

            Object.keys(data?.temperatures?.data).map((key)=>{
              
              moment(end).diff(moment(start),'days') == 1 ?  
              labels.push((String(key))) :
              labels.push(moment(key).format('DD/MM'))
            })

            setOptions(data.temperatures)
            setLabels(labels)
          }else{

            setOptions(null)
            setTemperatures([])
            setLabels([])
          };
        })
        .catch(err => {
          console.log('[Average Temperature switch data rejected]', err.response);
         
          Alert.alert(err.response._response)
         
          setLabels([])
          setTemperatures([0]);
          
        });
}
        return () => { isMounted = false };
  }, [dataStart, id]);
  
  return {
    labels,
    temperatures,
    diaries,
    options
  }
};

