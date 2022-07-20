import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';

import {store} from './App/redux/configureStore';
import {Provider} from 'react-redux';
import MyStack from './App/navigation/index';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <MyStack />
      <StatusBar barStyle={'light-content'}/>
    </Provider>
  );   
};
      
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
