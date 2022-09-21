import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  ImageBackground
} from 'react-native';
import { getCombinedNavigation } from '../../../hooks/useUpdateNavigationHeaderOptions';
import {getTerms}                from '../../../api/CreateAccount/CreateAccount';
import {COLORS}                  from '../../../styles/Constants';
import {Loader}                  from '../../../components/Loader/Loader';
import background                from '../../../assets/backOrigin.png';

export const TermsConditions = ({navigation}) => {
  const [content, setContent]             = useState('');
  const [loaderContent, setLoaderContent] = useState(true);

  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'terms & conditions',
        headerLeftMethod: () => {
          navigation.goBack();
        },
      })
    )
  }, [navigation]);

  useEffect(() => {
    setLoaderContent(true);

    getTerms().then(({data}) => {
      console.log('[TERMS CONDITIONS] Terms Conditions response', data);

      setContent(data.content);

      setLoaderContent(false);
    })
    .catch(rej => {
      console.error('[TERMS CONDITIONS] Terms Conditions request failed', rej);

      setLoaderContent(false);

      Alert.alert(rej?.response?.data?.message ? rej?.response?.data?.message : 'Server Error')
    });
  }, []);
  return (
    <ImageBackground source={background} style={{flex: 1, backgroundColor: COLORS.backGround}}>
      <View style={{height: '100%'}}>
        <ScrollView>
          <View style={{paddingHorizontal: 20}}>
            <Text style={{color: COLORS.text, paddingTop: 15, fontFamily: 'AntagometricaBT-Regular'}}>
              {content}
            </Text>
          </View>
        </ScrollView>

        {loaderContent && <Loader text={'retrieving the content...'} />}
      </View>
    </ImageBackground>
  );
};