import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../../styles/Constants';
import arrowRight from '../../../assets/images/settings/arrowRight.png';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import background from '../../../assets/backOrigin.png';
import checkButton from '../../../assets/images/checkButton.png';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/configureStore';
import {
  DeleteRecording,
  GetRecord,
  PlayRecordSound,
} from '../../../api/Recording/Recording';
import {useIsFocused} from '@react-navigation/native';

export const SettingsRecording = ({route}) => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  // const {user} = useSelector(({account}: RootState) => account.userInformation);
  const handleGoToNewVideo = () => {
    navigation.navigate('new Recording', {
      title: 'new custom recording',
      record: true,
    });
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    // GetRecord(user.accounts[0].id)
    //   .then(res => {
    //     console.log(res);
    //     setData(res.data.recordings);
    //   })
    //   .catch(res => {
    //     console.log(res);
    //   });
  }, [isFocused]);

  const deleteRecording = id => {
    // DeleteRecording(user.accounts[0].id, id).then(() => {
    //   GetRecord(user.accounts[0].id).then(res => {
    //     console.log(res);
    //     setData(res.data.recordings);
    //   });
    // });
  };

  const playSoundRecording = path => {
    // PlayRecordSound(path)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(rej => {
    //     console.log(rej);
    //   });
  };

  return (
    <ImageBackground source={background}>
      <View style={styles.container}>
        <View>
          {data?.map(e => {
            return (
              <View key={e.id} style={styles.viewMap}>
                <Text
                  style={{
                    color: COLORS.text,
                    fontSize: 18,
                    fontFamily: 'AntagometricaBT-Regular',
                  }}>
                  {e.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      deleteRecording(e.id);
                    }}>
                    <Text
                      style={{
                        color: '#CE9B51',
                        fontSize: 18,
                        fontFamily: 'AntagometricaBT-Regular',
                        marginRight: 20,
                      }}>
                      delete
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      playSoundRecording(e.path);
                    }}>
                    <View
                      style={{
                        borderWidth: 3,
                        width: 45,
                        height: 45,
                        borderRadius: 50,
                        borderColor: '#707070',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
        <TouchableOpacity onPress={handleGoToNewVideo} style={styles.blog}>
          <Text
            style={{
              color: COLORS.text,
              fontSize: 18,
              fontFamily: 'AntagometricaBT-Regular',
            }}>
            New Custom Recording
          </Text>
          <View>
            <Image style={{width: 12.3, height: 18.86}} source={arrowRight} />
          </View>
        </TouchableOpacity>
        <View style={styles.smallText}>
          <Text style={{color: COLORS.text}}>
            Record up to 3 custom 5 minutes sounds
          </Text>
        </View>
        <View style={styles.smallText}>
          <Text style={{color: COLORS.text}}>
            <Text style={{fontWeight: 'bold'}}>NOTE:</Text> Only one recording
            can be stored on misty at any given time.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.backGround,
    height: '100%',
  },
  viewMap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    height: 76,
    backgroundColor: '#1A172D',
    alignItems: 'center',
  },
  item: {
    height: 76,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blog: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    height: 76,
    backgroundColor: '#1A172D',
    alignItems: 'center',
  },
  smallText: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});
