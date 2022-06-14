import produce from 'immer';

import {getData} from './actions';

export const initialState = {
  offerData: {},
};
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case getData.TRIGGER: {
        draft.offerData = {};
        break;
      }

      case getData.SUCCESS: {
        const {data} = action.payload;
        draft.offerData = data;
        break;
      }
      default: {
        break;
      }
    }
  });
