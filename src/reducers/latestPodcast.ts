import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {Episode} from '../modal/podcast';
import {getAllEpisosdes} from '../service/podcasts';

const ROOT = 'AUTH/';

interface AllEpisodes {
  allEpisodes: null | {
    episodes: Episode;
    current_page: number;
    total_pages: number;
  };
}

interface Props {
  allEpisodes: AllEpisodes;
  requesting: boolean;
}

const initialState: Props = {
  allEpisodes: null,
  requesting: false,
};

export const onFetchEpisodes = createAsyncThunk(
  `${ROOT}ON_USER_SINGUP`,
  async (arg: any, thunkapi) => {
    const token = thunkapi.getState()?.auth?.user?.api_token;
    const resp = await getAllEpisosdes({...arg, token});
    console.log('all episodes resp..', resp);
    return resp;
  },
);

export const latestPodcastReducer = createReducer(initialState, {
  [onFetchEpisodes.pending.toString()]: state => ({
    ...state,
    requesting: true,
  }),
  [onFetchEpisodes.fulfilled.toString()]: (state, {payload}) => ({
    ...state,
    requesting: false,
    allEpisodes: payload,
  }),
});

export const episodesSelector = state =>
  state.latestPodcast.allEpisodes || null;
