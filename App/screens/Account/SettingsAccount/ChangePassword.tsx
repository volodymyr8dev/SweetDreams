import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {COLORS} from '../../../styles/Constants';

import arrowRight from '../../../assets/images/settings/arrowRight.png';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native';
import {InputUnit} from '../../../components/InputUnit/InputUnit';
import {ChangePasswordApi} from '../../../api/ForgotPassword/forgotPassword';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/configureStore';
import {AccountSelector} from '../../../redux/selectors/AccountSelector';
import {UpdateProfile} from '../../../api/Profile/ProfileApi';

interface PropsBox {
  nameOfBox: string;
  title: string;
  nameField?: string;
  rightEl?: string;
  placeholder?: string;
}
type Nav = {
  getState();
  setParams(arg0: {onSave: () => void});
  navigate: (value: string) => void;
};

export const ChangePassword = ({route}) => {
  const navigation = useNavigation<Nav>();
  const [code, setCode] = useState('');
  const [passwordOld, setPasswordOld] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const global = useSelector(AccountSelector);
  console.log('global state', global);
  const handleGoToScreen = title => {
    console.log(title);
    navigation.navigate(title);
  };
  console.log('vvvvv', route.params);
  const HandleChangePassword = async () => {
    if (route.params.email) {
      ChangePasswordApi(route.params.email, code, password, passwordConf)
        .then(({data}) => {
          console.log('change password successfully', data.message);
          Alert.alert(data.message);
          navigation.navigate('Login');
        })
        .catch(err => {
          console.log('err change password', err.response.data.error);
          Alert.alert(err.response.data.error);
          err.response.data.message && Alert.alert(err.response.data.message);
          console.log('err change password', err.response.data.message);
          err.response.data.errors && Alert.alert(err.response.data.errors);
        });
    } else {
      const user = {
        password_old: passwordOld,
        password: password,
        password_confirmation: passwordConf,
      };
      const {data} = await UpdateProfile(user).catch(err => {
        console.log('errnewpassword', err);
        Alert.alert(err.response.data.message);
      });
      console.log(data);
    }
  };
  useEffect(() => {
    navigation.setParams({
      onSave: HandleChangePassword,
    });
  }, [password, passwordConf]);
  const Box = ({
    nameOfBox,
    title,
    nameField,
    rightEl,
    placeholder,
  }: PropsBox) => {
    return nameOfBox == 'touch' ? (
      <TouchableOpacity
        onPress={() => handleGoToScreen(title)}
        style={styles.box}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{color: COLORS.text, fontSize: 18}}>{title}</Text>
          </View>
          {!rightEl ? (
            <View>
              <Image style={{height: 15, width: 15}} source={arrowRight} />
            </View>
          ) : (
            <Text style={{color: '#fff', fontSize: 17}}>{rightEl}</Text>
          )}
        </View>
      </TouchableOpacity>
    ) : (
      <View style={styles.input}>
        <View>
          <Text style={{color: COLORS.text, fontSize: 18}}>{placeholder}:</Text>
        </View>

        <TextInput
          style={{
            width: '100%',
            paddingLeft: 10,
            color: COLORS.text,
          }}>
          <Text>{nameField}</Text>
        </TextInput>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20, marginVertical: 15}}>
        <Text style={{color: COLORS.text, fontFamily: 'AntagometricaBT-Regular'}}>
          Please enter the reset code we recently sent to your email address
          supplied
        </Text>
      </View>
      <InputUnit
        title={'Reset Code'}
        nameOfBox={'input'}
        placeholder={'Reset Code'}
        nameField={'************'}
        security={true}
        value={code}
        setValueName={value => {
          setCode(value);
        }}
      />
      <View style={{paddingHorizontal: 20, marginVertical: 15}}>
        <Text style={{color: COLORS.text}}>Please enter the old password</Text>
      </View>
      <InputUnit
        title={'old Password'}
        nameOfBox={'input'}
        placeholder={'old password'}
        nameField={'************'}
        security={true}
        value={passwordOld}
        setValueName={value => {
          setPasswordOld(value);
        }}
      />
      <View style={{paddingHorizontal: 20, marginVertical: 15}}>
        <Text style={{color: COLORS.text, fontFamily: 'AntagometricaBT-Regular'}}>
          Please enter the new password 8-64 charapters (letters, numbers AND
          special characters)
        </Text>
      </View>
      <InputUnit
        title={'New Password'}
        nameOfBox={'input'}
        placeholder={'New Password'}
        nameField={'************'}
        security={true}
        value={password}
        setValueName={value => {
          setPassword(value);
        }}
      />

      <InputUnit
        title={'Confirtm New Password'}
        nameOfBox={'input'}
        placeholder={'Confirtm New Password'}
        nameField={'************'}
        security={true}
        value={passwordConf}
        setValueName={value => {
          setPasswordConf(value);
        }}
      />
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
    height: 66,
    width: '100%',
    borderRadius: 0,
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
