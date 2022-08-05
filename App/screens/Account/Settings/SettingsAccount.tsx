import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import arrowRight from '../../..//assets/images/settings/arrowRight.png';
import connection from '../../../assets/images/settings/connection.png';
import lock from '../../../assets/images/settings/lock.png';
import clock from '../../../assets/images/settings/clock.png';
import wakeUp from '../../../assets/images/settings/wakeUp.png';
import colorPicker from '../../../assets/images/settings/colorPicker.png';
import brightness from '../../../assets/images/settings/brightness.png';
import displayBrightness from '../../../assets/images/settings/colorPicker.png';
import smartCRY from '../../../assets/images/settings/smartCRY.png';
import Temperature from '../../../assets/images/settings/Temperature.png';
import smartSRYSensetivity from '../../../assets/images/settings/smartCrySensetivity.png';
import music from '../../../assets/images/settings/music.png';
import musicTime from '../../../assets/images/settings/musicTime.png';
import volumeImg from '../../../assets/images/settings/volume.png';
import {Switch} from '../../../components/Switch/Switch';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import background from '../../../assets/images/homeIcon/bacgroundHome.png';
import COLORS from '../../../styles/Constants';
import {RootState} from '../../../redux/configureStore';
import {GetRecord} from '../../../api/Recording/Recording';

export const SettingsAccount = ({route}) => {
  const [settingsData, setSettingsData] = useState(route.params.data);
  const {formatWakeUpTime, formatTime, volume} = useSelector(
    ({settings}) => settings,
  );
  const {temperatureNew} = useSelector(({settings}) => settings);
  const {playingTime} = useSelector(({settings}) => settings);
  // const {volume} = useSelector(
  //   ({settings}) => settings,
  // );
  // useEffect(()=>{
  //   setState(route.params.childLock)
  //
  // },[])
  // console.log(data, "datadatadata");
  // useEffect(() => {
  //   setValSwitch(true);
  // }, []);
  const Blog = ({title, rightEl, source, value, navigate}) => {
    const navigation = useNavigation();

    const handleSettings = async title => {
      if (typeof rightEl !== 'object') {
        console.log(title, 'title');
        navigation.navigate(`${navigate}`, {
          title: title,
          value: value,
          setValue: obj => {
            setSettingsData(obj);
          },
        });
      }
      if (navigate === 'Custom Recording') {
        getCustomRecord();
      }
    };

    const {user} = useSelector(
      ({account}: RootState) => account.userInformation,
    );

    const getCustomRecord = () => {
      navigation.navigate('Custom Recording', {
        title: title,
        value: value,
        setValue: obj => {
          setSettingsData(obj);
        },
      });
      // GetRecord(user.accounts[0].id)
      //   .then(res => {
      //     console.log(res);
      //     navigation.navigate('Custom Recording',{
      //       title: title,
      //       value: value,
      //       setValue: obj => {
      //         setSettingsData(obj);
      //       },
      //       data: res.data.recordings,
      //     });
      //   })
      //   .catch(res => {
      //     console.log(res);
      //   });
    };

    return (
      <TouchableOpacity
        onPress={() => handleSettings(title)}
        style={styles.blog}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{width: 24, height: 24, marginRight: 10}}
            source={source}
            resizeMode="contain"
          />
          <Text
            style={{
              color: '#2371AB',
              fontSize: 19,
              fontFamily: 'AntagometricaBT-Regular',
            }}>
            {navigate}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {typeof rightEl === 'object' ? (
            rightEl
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#2371AB', fontSize: 19}}>{rightEl}</Text>
              <Image
                style={{width: 10, height: 10, marginLeft: 10}}
                source={arrowRight}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground source={background}>
      <ScrollView style={styles.container}>
        <View style={{paddingBottom: 40}}>
          <Blog
            title="connection"
            navigate="Connection"
            rightEl="Connected"
            source={connection}
          />
          <Blog
            title="child Lock"
            navigate="Child Lock"
            rightEl={
              <Switch
                title={'Child Lock'}
                val={settingsData['Child Lock']}
                valueSmart={null}
                setData={setSettingsData}
              />
            }
            source={lock}
          />
          <View style={{paddingLeft: 15, marginVertical: 15}}>
            <Text
              style={{
                color: '#2371AB',
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'AntagometricaBT-Bold',
              }}>
              Display Settings
            </Text>
          </View>
          <Blog
            title="time"
            navigate="Time"
            rightEl={settingsData.Time}
            value={settingsData.Time}
            source={clock}
          />
          <Blog
            title="wake Up Time"
            navigate="Wake Up Time"
            value={settingsData['Wake Up Time']}
            source={wakeUp}
            rightEl={settingsData['Wake Up Time']}
          />
          <Blog
            title="colour Picker"
            navigate="Colour Picker"
            source={colorPicker}
            rightEl={undefined}
          />
          <Blog
            title="dome Brightness"
            navigate="Dome Brightness"
            source={brightness}
            rightEl={'3%'}
          />
          <Blog
            title="display Brightness"
            navigate="Display Brightness"
            source={displayBrightness}
            rightEl={'25%'}
          />
          <Blog
            title="temperature"
            navigate="Temperature"
            source={Temperature}
            rightEl={`°${settingsData.Temperature}`}
            value={settingsData.Temperature}
          />
          <View style={{paddingLeft: 15, marginVertical: 15}}>
            <Text
              style={{
                color: '#2371AB',
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'AntagometricaBT-Bold',
              }}>
              {' '}
              Sound Settings
            </Text>
          </View>
          <Blog
            title="smartCRY Sensor"
            navigate="smartCRY Sensor"
            source={smartCRY}
            rightEl={
              <Switch
                val={null}
                valueSmart={settingsData['smartCRY Sensor']}
                title={'smartCRY Sensor'}
                setData={setSettingsData}
              />
            }
          />
          <Blog
            title="smartCRY Sensor Sensitivity"
            navigate="smartCRY Sensor Sensitivity"
            source={smartSRYSensetivity}
            value={settingsData['smartCRY Sensor Sensitivity']}
            rightEl={Number(
              settingsData['smartCRY Sensor Sensitivity'],
            ).toFixed(0)}
          />
          <Blog
            title="custom recording"
            navigate="Custom Recording"
            source={music}
            rightEl={'Dad reading s...'}
          />
          <Blog
            title="sound playing time"
            navigate="Sound Playing Time"
            source={musicTime}
            value={settingsData['Sound Playing Time']}
            rightEl={settingsData['Sound Playing Time']}
          />
          <Blog
            title="volume"
            navigate="Volume"
            source={volumeImg}
            rightEl={Number(settingsData.Volume).toFixed(0)}
          />
          <View style={{paddingLeft: 15, marginVertical: 15}}>
            <Text
              style={{
                color: '#2371AB',
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'AntagometricaBT-Bold',
              }}>
              Notifications
            </Text>
          </View>
          <Blog
            title="smartCRY Sensor Activation"
            navigate="smartCRY Sensor Activation"
            source={smartCRY}
            rightEl={<Switch />}
          />
          <Blog
            title="temperature"
            navigate="Temperature"
            source={Temperature}
            rightEl={<Switch />}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#2A2E63',
    height: '100%',
  },
  blog: {
    paddingHorizontal: 10,
    marginVertical: 4,
    width: '100%',
    height: 76,
    // backgroundColor: '#1A172D',
    backgroundColor: 'rgba(26,23,45,0.7)',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
