import {AnyAction, combineReducers} from 'redux';
import { authReducer, onUserLogout } from './auth';
import storage from 'redux-persist/es/storage';

import {podcastPlayerReducer, PodcastPlayerState} from './podcast';
import { latestPodcastReducer } from './latestPodcast';

export interface RootState {
  podcast: PodcastPlayerState;
  auth: any;
}

const appReducer = combineReducers({
  podcast: podcastPlayerReducer,
  auth: authReducer,
  latestPodcast: latestPodcastReducer
});

const rootReducer = (state: RootState, action: AnyAction) => {
  const clearState = () => {
    state = undefined;
    storage.removeItem('persist:root');
  }
  if (action.type === onUserLogout.fulfilled.toString()) {
    clearState();
  }
  return appReducer(state, action);
};

export default rootReducer;
