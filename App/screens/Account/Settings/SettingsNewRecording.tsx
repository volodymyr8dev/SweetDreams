import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
interface PropsBox {
  title: string;
  nameField: string;
  placeholder: string;
}
import {COLORS} from '../../../styles/Constants';
import play from '../../../assets/images/player/Group_7506.png';
import paused from '../../../assets/images/player/Paused.png';
import record from '../../../assets/images/player/Component.png';
import stop from '../../../assets/images/player/stop_recording.png';
import playOn from '../../../assets/images/player/PlayOn.png';
import {TextInput} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {useDispatch, useSelector} from 'react-redux';
import {setRecording} from '../../../redux/slice/SettingsSlice';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../../redux/configureStore';
import {GetRecord, NewRecording} from '../../../api/Recording/Recording';
import {CustomInput} from '../../../components/CustomInput/CustomInput';

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.09);


export const SettingsNewRecording = () => {
  const {user} = useSelector(({account}: RootState) => account.userInformation);
  const recordingFile = useSelector(
    ({settings}: RootState) => settings.recordingFile,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [audioo, setAudioo] = useState(false);
  const [pausedd, setPausedd] = useState(false);

  const [startRecording, setStartRecording] = useState(false);
  const [nameFile, setNameFile] = useState('');
  const [stating, setStating] = useState({
    recordSecs: 0,
    recordTime: '00:00:00',
  });
  useEffect(() => {
    navigation.setParams({
      sendRecord: sendRecordingOnBack,
    });
  }, [startRecording, nameFile]);

  const onStartRecord = async () => {
    await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      console.log('Recording . . . ', e.currentPosition);
      setStating({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
    });
    handleStartRecord();
  };

  const onStopRecord = async () => {
    const audio = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    console.log(audio);
    setStating({recordSecs: 0, recordTime: stating.recordTime});

    dispatch(setRecording(audio));
    handleStartRecord();
    setAudioo(true);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    setPausedd(true);
    audioRecorderPlayer.addPlayBackListener(e => {
      // return;
    });
  };

  const onPausedPlay = async e => {
    console.log('onPausedPlay');
    setPausedd(false);
    await audioRecorderPlayer.pausePlayer();
  };

  const handleStartRecord = () => {
    setStartRecording(!startRecording);
  };

  const sendRecordingOnBack = () => {
    console.log(user.accounts[0].id, recordingFile, 'DAAA');
    NewRecording(user.accounts[0].id, recordingFile, nameFile)
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  return (
    <View style={styles.container}>
      <CustomInput
        styling={styles.input}
        text={'Recording name'}
        value={nameFile}
        onChangeText={text => setNameFile(text)}
      />
      {/*<Player />*/}
      <View style={styles.input}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{width: 80}}>
            {!pausedd ? (
              <TouchableOpacity
                style={{justifyContent: 'center'}}
                onPress={audioo ? onStartPlay : () => {}}>
                <Image
                  style={{width: 35, height: 35}}
                  source={audioo ? playOn : play}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{justifyContent: 'center'}}
                onPress={onPausedPlay}>
                <Image
                  style={{width: 46, height: 41, top: 3}}
                  source={paused}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            {startRecording ? (
              <TouchableOpacity onPress={() => onStopRecord()}>
                <Image style={{width: 45, height: 45}} source={stop} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => onStartRecord()}>
                <Image style={{width: 45, height: 45}} source={record} />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: '#707070',
                width: 85,
              }}>
              {stating.recordTime}
            </Text>
          </View>
        </View>
      </View>
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
