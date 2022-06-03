import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,

  View,
} from 'react-native';

import {store} from './App/redux/configureStore'
import {Provider} from 'react-redux'
import MyStack from './App/navigation/index'
const App = () => {
  return (
    <Provider store={store}>
      <MyStack />
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
