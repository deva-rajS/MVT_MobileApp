import {fork, takeLatest, all} from 'redux-saga/effects';
import {constants, actions as podcastAction} from '../reducers/podcast';
import {
  podcastDashboard,
  getPodcastEpisodes,
  podcastLanguages,
  getCategoryPodcasts,
  podcastCategories,
  podcastArtists,
  podcastPlaylists,
  artistPodcasts,
  podcastLanguagesCategories,
} from '../service/podcasts';
import {apiRequest} from './apiRequests';

function* fetchDashboard(): Generator {
  yield apiRequest({
    callService: podcastDashboard,
    params: {},
    success: podcastAction.podcastDashboardSuccess,
    failure: podcastAction.podcastDashboardFailure,
  });
}
function* fetchSinglePlaylist(action: {
  type: string;
  payload: {id: number; page: number};
}): Generator {
  yield apiRequest({
    callService: getPodcastEpisodes,
    params: action.payload,
    success: podcastAction.singlePlaylistSuccess,
    failure: podcastAction.singlePlaylistFailure,
  });
}

function* fetchCategoryPlaylist(action): Generator {
  yield apiRequest({
    callService: getCategoryPodcasts,
    params: action.payload,
    success: podcastAction.categoryPlaylistSuccess,
    failure: podcastAction.categoryPlaylistFailure,
  });
}

function* fetchPodcastLanguages(action): Generator {
  yield apiRequest({
    callService: podcastLanguages,
    params: action.payload,
    success: podcastAction.podcastLanguageSuccess,
    failure: podcastAction.listFailure,
  });
}

function* fetchPodcastCategories(action): Generator {
  yield apiRequest({
    callService: podcastCategories,
    params: action.payload,
    success: podcastAction.categoriesSuccess,
    failure: podcastAction.listFailure,
  });
}

function* fetchPodcastArtists(action): Generator {
  // const params = {page: action.payload.page};
  yield apiRequest({
    callService: podcastArtists,
    params: action.payload,
    success: podcastAction.artistsSuccess,
    failure: podcastAction.listFailure,
  });
}

function* fetchPodcastPlaylists(action): Generator {
  
  yield apiRequest({
    callService: podcastPlaylists,
    params: action.payload,
    success: podcastAction.playlistsSuccess,
    failure: podcastAction.listFailure,
  });
}

function* fetchArtistPlaylists(action): Generator {
  const {id, page} = action.payload;
  const params = {page, id};
  yield apiRequest({
    callService: artistPodcasts,
    params,
    success: podcastAction.artistPlaylistsSuccess,
    failure: podcastAction.listFailure,
  });
}

function* fetchLanguageCategories(action): Generator {
  const {id, page} = action.payload;
  const params = {page, id};
  yield apiRequest({
    callService: podcastLanguagesCategories,
    params: params,
    success: podcastAction.LanguageCategoriesSuccess,
    failure: podcastAction.LanguageCategoriesFailure,
  });
}

function* watchPodcastsRequest(): Generator {
  yield takeLatest(constants.PODCAST_DASHBOARD_REQUEST, fetchDashboard);
}

function* watchSinglePlaylistRequest(): Generator {
  yield takeLatest(constants.SINGLE_PLAYLIST_REQUEST, fetchSinglePlaylist);
}

function* watchCategoryPlaylistRequest(): Generator {
  yield takeLatest(constants.CATEGORY_PLAYLIST_REQUEST, fetchCategoryPlaylist);
}

function* watchPodcastLanguagesRequest(): Generator {
  yield takeLatest(constants.PODCAST_LANGUAGE_REQUEST, fetchPodcastLanguages);
}

function* watchPodcastCategoriesRequest(): Generator {
  yield takeLatest(
    constants.PODCAST_CATEGORIES_REQUEST,
    fetchPodcastCategories,
  );
}

function* watchPodcastArtistsRequest(): Generator {
  yield takeLatest(constants.PODCAST_ARTISTS_REQUEST, fetchPodcastArtists);
}

function* watchPodcastPlaylistsRequest(): Generator {
  yield takeLatest(constants.PODCAST_PLAYLISTS_REQUEST, fetchPodcastPlaylists);
}

function* watchArtistPlaylistsRequest(): Generator {
  yield takeLatest(constants.ARTIST_PLAYLISTS_REQUEST, fetchArtistPlaylists);
}

function* watchLanguagesCategoriesRequest(): Generator {
  yield takeLatest(
    constants.LANGUAGE_CATEGORIES_REQUEST,
    fetchLanguageCategories,
  );
}

export default all([
  fork(watchPodcastsRequest),
  fork(watchSinglePlaylistRequest),
  fork(watchCategoryPlaylistRequest),
  fork(watchPodcastLanguagesRequest),
  fork(watchPodcastCategoriesRequest),
  fork(watchPodcastArtistsRequest),
  fork(watchPodcastPlaylistsRequest),
  fork(watchArtistPlaylistsRequest),
  fork(watchLanguagesCategoriesRequest),
]);
