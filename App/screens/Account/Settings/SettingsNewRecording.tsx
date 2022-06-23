import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
interface PropsBox {
  title: string;
  nameField: string;
  placeholder: string;
}
import {COLORS} from '../../../styles/Constants';
import play from '../../../assets/images/player/Group_7506.png';
import record from '../../../assets/images/player/Component.png';
import stop from '../../../assets/images/player/stop_recording.png';
import { TextInput } from 'react-native';

export const SettingsNewRecording = () => {
  const [startRecording, setStartRecording] = useState(false);
  const handleStartRecord = () => {
    setStartRecording(!startRecording);
  };
  const Box = ({title, nameField, placeholder}: PropsBox) => {
    return (
      <View style={styles.input}>
        <View>
          <Text style={{color: COLORS.text, fontSize: 18}}>{placeholder}:</Text>
        </View>

        <TextInput style={{width: '100%', paddingLeft: 10, color: COLORS.text}}>
          <Text>{nameField}</Text>
        </TextInput>
      </View>
    );
  };
  const Player = () => {

    return (
      <View style={styles.input}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>

            <Image style={{width: 35, height: 35}} source={play} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={handleStartRecord}>
              <Image
                style={{width: 45, height: 45}}
                source={startRecording ? stop : record}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 20, color: '#707070', marginLeft: 60}}>
              00:00:00
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Box title={'Recording name'} placeholder={'Recording name'} />
      <Player />
      <View style={{paddingHorizontal: 20, marginTop: 15}}>
        <Text style={{color: COLORS.text}}>
          Record a custom sound for up to 5 minutes
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    backgroundColor: '#221B36',

    height: '100%',
  },
  box: {
    height: 66,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.backGround,
    width: '100%',
    marginBottom: 7,
  },
  input: {
    marginBottom: 7,
    paddingHorizontal: 20,
    height: 66,
    width: '100%',
    borderRadius: 0,
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
