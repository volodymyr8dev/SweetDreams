import React, {FC, useEffect}        from 'react';
import {StatusBar, StyleSheet}       from 'react-native';
import SplashScreen                  from 'react-native-splash-screen';
import {store}                       from './src/redux';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore }              from 'redux-persist';
import { PersistGate }               from 'redux-persist/integration/react';
import { NavigationContainer }       from '@react-navigation/native';

import Stacks                        from './src/navigation';

const persistor = persistStore(store);

const App: FC = () => {
  const navRef = React.createRef<any>();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer ref={navRef}>
            <Stacks />
            <StatusBar barStyle={'light-content'} />
          </NavigationContainer>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
