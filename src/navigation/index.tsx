import React              from 'react';
import {useSelector}      from 'react-redux';
import {RootReducerState} from '../redux';
import {useCheckLogin}    from '../hooks/useCheckLogin';
import {useResetEmail}    from '../hooks/useForgotPassword';
import GuestStackRoutes   from './routes/GuestStackRoutes';
import AuthStackRoutes    from './routes/AuthStackRoutes';

import {
  View,
  Text,
} from 'react-native';

const Stacks = () => {
  const { loadingCheckLogin, user, verified } = useSelector((state: RootReducerState) => state.auth);

  useResetEmail();
  useCheckLogin();

  console.log('[INIT] User', user);
  console.log('[INIT] Verified', verified);
  console.log('[INIT] Accounts', JSON.stringify(user.accounts));
  console.log('[INIT] Devices', JSON.stringify(user.accounts[0]?.devices));

  if (loadingCheckLogin) {
    return <View><Text>LOADING..</Text></View>
  } else {
    return user && user.email ? <AuthStackRoutes /> : <GuestStackRoutes/>
  }
};

export default Stacks