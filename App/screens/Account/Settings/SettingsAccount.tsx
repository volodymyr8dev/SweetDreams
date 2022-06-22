import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
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
export const SettingsAccount = () => {
  const {formatWakeUpTime, formatTime, volume} = useSelector(
    ({settings}) => settings,
  );
  const Blog = ({title, rightEl, source}) => {
    const navigation = useNavigation();

    const handleSettings = async title => {
      if (typeof rightEl !== 'object') {
        console.log(title, 'title');

        navigation.navigate(`${title}`, {title: title});
      }
    };
    return (
      <TouchableOpacity
        onPress={() => handleSettings(title)}
        style={styles.blog}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{width: 15, height: 15, marginRight: 10}}
            source={source}
            resizeMode="contain"
          />
          <Text style={{color: '#2371AB', fontSize: 16}}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {typeof rightEl == 'object' ? (
            rightEl
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#2371AB', fontSize: 15}}>{rightEl}</Text>
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
    <ScrollView style={styles.container}>
      <View style={{paddingBottom: 40}}>
        <Blog title="Connection" rightEl="Connected" source={connection} />
        <Blog title="Child Lock" rightEl={<Switch />} source={lock} />
        <View style={{paddingLeft: 15}}>
          <Text style={{color: '#2371AB', fontSize: 17}}>Display Settings</Text>
        </View>
        <Blog title="Time" rightEl={`${formatTime}`} source={clock} />
        <Blog
          title="Wake Up Time"
          source={wakeUp}
          rightEl={`${formatWakeUpTime}`}
        />
        <Blog title="Colour Picker" source={colorPicker} rightEl={undefined} />
        <Blog title="Dome Brightness" source={brightness} rightEl={'3%'} />
        <Blog
          title="Display Brightness"
          source={displayBrightness}
          rightEl={'25%'}
        />
        <Blog title="Temperature" source={Temperature} rightEl={'*C'} />
        <View style={{paddingLeft: 15}}>
          <Text style={{color: '#2371AB', fontSize: 17}}> Sound Settings</Text>
        </View>
        <Blog title="smartCRY Sensor" source={smartCRY} rightEl={<Switch />} />
        <Blog
          title="smartCRY Sensor Sensitivity"
          source={smartSRYSensetivity}
          rightEl={'Moder...'}
        />
        <Blog
          title="Custom Recording"
          source={music}
          rightEl={'Dad reading s...'}
        />
        <Blog
          title="Sound Playing Time"
          source={musicTime}
          rightEl={'20 mins'}
        />
        <Blog
          title="Volume"
          source={volumeImg}
          rightEl={Number(volume.toFixed(1))}
        />
        <View style={{paddingLeft: 15}}>
          <Text style={{color: '#2371AB', fontSize: 17}}>Notifications</Text>
        </View>
        <Blog
          title="smartCRY Sensor Activation"
          source={smartCRY}
          rightEl={<Switch />}
        />
        <Blog title="Temperature" source={Temperature} rightEl={<Switch />} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2E63',
    height: '100%',
  },
  blog: {
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#1A172D',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
