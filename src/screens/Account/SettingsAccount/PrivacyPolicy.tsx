import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert
} from 'react-native';
import { getCombinedNavigation } from '../../../hooks/useUpdateNavigationHeaderOptions';
import {getPrivacyPolicy}        from '../../../api/CreateAccount/CreateAccount';
import {COLORS}                  from '../../../styles/Constants';
import {Loader}                  from '../../../components/Loader/Loader';

export const PrivacyPolicy = ({navigation}) => {
  const [content, setContent]             = useState('');
  const [loaderContent, setLoaderContent] = useState(true);

  useEffect(() => {
    navigation.setOptions(
      getCombinedNavigation({
        title: 'privacy policy',
        headerLeftMethod: () => {
          navigation.goBack();
        },
      })
    )
  }, [navigation]);

  useEffect(() => {
    setLoaderContent(true);
    
    getPrivacyPolicy().then(({data}) => {
      console.log('[PRIVACY POLICY] Privacy Policy response', data);

      setContent(data.content);

      setLoaderContent(false);
    })
    .catch(rej => {
      console.error('[PRIVACY POLICY] Privacy Policy request failed', rej);

      setLoaderContent(false);

      Alert.alert(rej?.response?.data?.message ? rej?.response?.data?.message : 'Server Error');
    });
  }, []);

  return (
    <View style={{paddingTop: 8, backgroundColor: '#221B36', height: '100%'}}>
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <Text style={{color: COLORS.text, paddingTop: 15}}>
            {content}
          </Text>
        </View>
      </ScrollView>

      {loaderContent && <Loader text={'Retrieving the content...'} />}
    </View>
  );
};