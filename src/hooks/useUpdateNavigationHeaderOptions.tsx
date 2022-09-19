import React, {useEffect}           from 'react';
import { useDispatch }              from 'react-redux';
import { setOptions, resetOptions } from '../redux/slices/navigationHeader';
import backButton                   from '../assets/images/backButton.png';

import {
  TouchableOpacity,
  Image,
  Text
} from 'react-native';

export const useSetNavigationHeaderOptions: (options) => void = (options) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOptions(options));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useResetNavigationHeaderOptions: () => void = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetOptions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const getCombinedNavigation: (navigationHeader) => void = (navigationHeader) => {
  let defaultScreenOptions = {
    headerTintColor: '#2371AB',
    headerTitleStyle: {
      fontFamily: 'AntagometricaBT-Bold',
      fontSize:   20,
    },
    headerStyle: {
      backgroundColor: '#2A305A',
    },
    gestureEnabled: false,
    headerLeft: typeof navigationHeader.headerLeftMethod != 'undefined' ? () => {
      if (typeof navigationHeader.headerLeftMethod != 'undefined') {
        if (navigationHeader.headerRightText) {
          return (
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingRight: 30}} onPress={() => navigationHeader.headerLeftMethod() }>
              <Image style={{width: 12.3, height: 18.86}} source={backButton} />
              <Text style={{color:"#fff", fontSize: 19, fontFamily: 'AntagometricaBT-Regular', marginLeft:7.69, marginBottom:3}}> 
                { navigationHeader.headerLeftText ? navigationHeader.headerLeftText : '' }
              </Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity onPress={() => navigationHeader.headerLeftMethod() }>
              <Image  style={{width: 12.3, height: 18.86}} source={backButton} />
            </TouchableOpacity>
          );
        }
      }
    } : null,
    headerRight: typeof navigationHeader.headerRightMethod != 'undefined' ? () => {
      if (typeof navigationHeader.headerRightMethod != 'undefined') {
        return (
          <TouchableOpacity onPress={() => { navigationHeader.headerRightMethod() }}>
            <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'AntagometricaBT-Regular' }}>
              { navigationHeader.headerRightText ? navigationHeader.headerRightText : 'Next' }
            </Text>
          </TouchableOpacity>
        );
      }
    } : null,
  };

  return Object.assign(
    defaultScreenOptions,
    navigationHeader ? navigationHeader : {}
  );
};