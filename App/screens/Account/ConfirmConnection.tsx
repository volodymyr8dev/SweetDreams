import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import connectionStatus from '../../assets/images/homeIcon/connection.png';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';

import {COLORS} from '../../styles/Constants';
import {useNavigation} from '@react-navigation/native';
import {AlertComp} from '../../components/Alert/AlertComp';
import {connect, useDispatch, useSelector} from 'react-redux';
import {setConnection} from '../../redux/slice/powerSlice';
const ConfirmConnection = props => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [conect, setConnect] = useState(false);
  //   const conection = useSelector()
  const handleCheckInternet = () => {
    props.toggleButton((prev) => !prev);
    // setConnect(!conect);
    // console.log('xxx', netInfo.isConnected);
    // if (netInfo.isConnected) {
    //   dispatch(setConnection(true));
    // } else {
    //   AlertComp('no internet connection ', 'reconect', 'cancel');
    // }
  };
//   useEffect(() => {
//     console.log('netInfo.isConnected)', netInfo.isConnected);
//     if (netInfo.isConnected) {
//       dispatch(setConnection(true));
//     } else {
//       AlertComp('no internet connection ', 'reconect', 'cancel');
//     }
//   }, [conect]);
  return (
    <View style={{marginTop: 40}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image resizeMode="contain" source={connectionStatus}></Image>
      </View>
      <View>
        <Text
          style={{
            color: '#fff',
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 15,
          }}>
          confirm connection
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 7,
          }}>
          Please check your connection
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            textAlign: 'center',
          }}>
          Ensure you have a stable internet connection
        </Text>
      </View>
      <View style={{marginTop: 35, alignItems: 'center'}}>
        <TouchableOpacity onPress={handleCheckInternet}>
          <View
            style={{
              borderWidth: 1,
              padding: 15,
              borderRadius: 50,
              borderColor: '#2C8AD0',
            }}>
            <Text style={{color: '#fff', fontSize: 18}}>check connection</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmConnection;