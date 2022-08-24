/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
//import { logout } from 'api/auth';
//import { resetKeychainToken, axiosRemoveAuthToken } from 'utils';

import { AnyAction } from 'redux';

export default (storeAPI: { dispatch: (action: any) => void }) =>
  (next: (act: AnyAction) => void) =>
  (action: AnyAction): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (_.endsWith(action?.type, '/rejected') && !_.startsWith(action?.type, '/logout')) {
      if (action.payload?.message === 'Unauthenticated.') {
        console.warn('NON AUTH');
        //storeAPI.dispatch(logout({}));
        //resetKeychainToken();
        //axiosRemoveAuthToken('401 from action');
      }
    }
    return next(action);
  };