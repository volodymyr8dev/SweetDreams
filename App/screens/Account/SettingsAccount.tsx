import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import arrowRight from '../../assets/images/settings/arrowRight.png';
import connection from '../../assets/images/settings/connection.png';
import lock from '../../assets/images/settings/lock.png';
import clock from '../../assets/images/settings/clock.png';
import {Switch} from 'react-native-switch';
export const SettingsAccount = () => {
  const Blog = ({title, rightEl, source}) => {
    return (
      <View style={styles.blog}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{width: 15, height: 15, marginRight: 10}}
            source={source}
          />
          <Text style={{color: '#2371AB', fontSize: 16}}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#2371AB', fontSize: 15}}>{rightEl}</Text>
            {/* {rightEl} */}
          <Image
            style={{width: 10, height: 10, marginLeft: 10}}
            source={arrowRight}
          />
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <Blog title="Connection" rightEl="Connected" source={connection} />
      <Blog title="Child Lock" rightEl={<Switch />} source={lock} />
      <View style={{paddingLeft: 15}}>
        <Text style={{color: '#2371AB', fontSize: 17}}>Display Settings</Text>
      </View>
      <Blog title="Connection" rightEl={undefined} source={clock} />
      <Blog title="Connection" rightEl={undefined} source={clock} />
      <Blog title="Connection" rightEl={undefined} source={clock} />
      <Blog title="Connection" rightEl={undefined} source={clock} />
      <Blog title="Connection" rightEl={undefined} source={clock} />
      <Blog title="Connection" rightEl={undefined} source={clock} />
      <Blog title="Connection" rightEl={undefined} source={clock} />
      <Blog title="Connection" rightEl={undefined} source={clock} />
      <Blog title="Connection" rightEl={undefined} source={clock} />
      <Blog title="Connection" rightEl={undefined} source={clock} />
      <Blog title="Connection" rightEl={undefined} source={clock} />
      <Blog title="Connection" rightEl={undefined} source={clock} />
      <Blog title="Connection" rightEl={undefined} source={clock} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2E63',
    paddingBottom: 40,
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
