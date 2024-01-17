import _ from "lodash";
import {
  PodcastActionsModel,
  PodcastLanguages,
  Dashboard,
  CurrentPlaylist,
  Playlists,
  ArtistResp,
  CategoryResp,
  Episode,
  Podcasts,
} from "../modal/podcast";
import { RootState } from "./rootReducer";
import { View } from "react-native";

const ROOT = "PODCAST/";

export const constants = {
  PODCAST_DASHBOARD_REQUEST: `${ROOT}PODCASTS_REQUEST`,
  PODCAST_DASHBOARD_SUCCESS: `${ROOT}PODCASTS_SUCCESS`,
  PODCAST_DASHBOARD_FAILURE: `${ROOT}PODCASTS_FAILURE`,
  SINGLE_PLAYLIST_REQUEST: `${ROOT}SINGLE_PLAYLIST_REQUEST`,
  SINGLE_PLAYLIST_SUCCESS: `${ROOT}SINGLE_PLAYLIST_SUCCESS`,
  SINGLE_PLAYLIST_FAILURE: `${ROOT}SINGLE_PLAYLIST_FAILURE`,
  CATEGORY_PLAYLIST_REQUEST: `${ROOT}CATEGORY_PLAYLIST_REQUEST`,
  CATEGORY_PLAYLIST_SUCCESS: `${ROOT}CATEGORY_PLAYLIST_SUCCESS`,
  CATEGORY_PLAYLIST_FAILURE: `${ROOT}CATEGORY_PLAYLIST_FAILURE`,
  CLEAR_CATEGORY_PLAYLIST: `${ROOT}CLEAR_CATEGORY_PLAYLIST`,

  PODCAST_DETAIL_REQUEST: `${ROOT}PODCAST_DETAIL_REQUEST`,
  PODCAST_DETAIL_SUCCESS: `${ROOT}PODCAST_DETAIL_SUCCESS`,
  PODCAST_DETAIL_FAILURE: `${ROOT}PODCAST_DETAIL_FAILURE`,

  LISTING_FAILURE: `${ROOT}LISTING_FAILURE`,
  PODCAST_LANGUAGE_REQUEST: `${ROOT}PODCAST_LANGUAGE_REQUEST`,
  PODCAST_LANGUAGE_SUCCESS: `${ROOT}PODCAST_LANGUAGE_SUCCESS`,
  PODCAST_CATEGORIES_REQUEST: `${ROOT}PODCAST_CATEGORIES_REQUEST`,
  PODCAST_CATEGORIES_SUCCESS: `${ROOT}PODCAST_CATEGORIES_SUCCESS`,
  PODCAST_ARTISTS_REQUEST: `${ROOT}PODCAST_ARTISTS_REQUEST`,
  PODCAST_ARTISTS_SUCCESS: `${ROOT}PODCAST_ARTISTS_SUCCESS`,
  PODCAST_PLAYLISTS_REQUEST: `${ROOT}PODCAST_PLAYLISTS_REQUEST`,
  PODCAST_PLAYLISTS_SUCCESS: `${ROOT}PODCAST_PLAYLISTS_SUCCESS`,
  LANGUAGE_CATEGORIES_REQUEST: `${ROOT}LANGUAGE_CATEGORIES_REQUEST`,
  LANGUAGE_CATEGORIES_SUCCESS: `${ROOT}LANGUAGE_CATEGORIES_SUCCESS`,
  // SUBJECT_CATEGORIES_FAILURE: `${ROOT}SUBJECT_CATEGORIES_FAILURE`,
  ARTIST_PLAYLISTS_REQUEST: `${ROOT}ARTIST_PLAYLISTS_REQUEST`,
  ARTIST_PLAYLISTS_SUCCESS: `${ROOT}ARTIST_PLAYLISTS_SUCCESS`,
  // ARTIST_PLAYLISTS_FAILURE: `${ROOT}ARTIST_PLAYLISTS_FAILURE`,
  CURRENT_SONG_INDEX: `${ROOT}CURRENT_SONG_INDEX`,
  CLEAR_PODCASTS: `${ROOT}CLEAR_PODCASTS`,
};

export const actions: PodcastActionsModel = {
  podcastDashboardRequest: () => ({
    type: constants.PODCAST_DASHBOARD_REQUEST,
  }),
  podcastDashboardSuccess: (payload) => ({
    type: constants.PODCAST_DASHBOARD_SUCCESS,
    payload,
  }),
  podcastDashboardFailure: (payload) => ({
    type: constants.PODCAST_DASHBOARD_FAILURE,
    payload,
  }),
  singlePlaylistRequest: (payload) => {
    return {
      type: constants.SINGLE_PLAYLIST_REQUEST,
      payload,
    };
  },
  singlePlaylistSuccess: (payload) => ({
    type: constants.SINGLE_PLAYLIST_SUCCESS,
    payload,
  }),
  singlePlaylistFailure: (payload) => ({
    type: constants.SINGLE_PLAYLIST_FAILURE,
    payload,
  }),
  categoryPlaylistRequest: (payload) => {
    return {
      type: constants.CATEGORY_PLAYLIST_REQUEST,
      payload,
    };
  },
  categoryPlaylistSuccess: (payload) => ({
    type: constants.CATEGORY_PLAYLIST_SUCCESS,
    payload,
  }),
  categoryPlaylistFailure: (payload) => ({
    type: constants.CATEGORY_PLAYLIST_FAILURE,
    payload,
  }),
  clearCategoryPlaylist: {
    type: constants.CLEAR_CATEGORY_PLAYLIST,
  },
  podcastDetailRequest: () => ({
    type: constants.PODCAST_DETAIL_REQUEST,
  }),
  podcastDetailSuccess: (payload) => ({
    type: constants.PODCAST_DETAIL_SUCCESS,
    payload,
  }),
  podcastDetailFailure: (payload) => ({
    type: constants.PODCAST_DETAIL_FAILURE,
    payload,
  }),
  podcastLanguageRequest: (payload) => ({
    type: constants.PODCAST_LANGUAGE_REQUEST,
    payload,
  }),
  podcastLanguageSuccess: (payload) => ({
    type: constants.PODCAST_LANGUAGE_SUCCESS,
    payload,
  }),
  listFailure: (payload) => ({
    type: constants.LISTING_FAILURE,
    payload,
  }),
  categoriesRequest: (payload) => ({
    type: constants.PODCAST_CATEGORIES_REQUEST,
    payload,
  }),
  categoriesSuccess: (payload) => ({
    type: constants.PODCAST_CATEGORIES_SUCCESS,
    payload,
  }),
  artistsRequest: (payload) => ({
    type: constants.PODCAST_ARTISTS_REQUEST,
    payload,
  }),
  artistsSuccess: (payload) => ({
    type: constants.PODCAST_ARTISTS_SUCCESS,
    payload,
  }),
  playlistsRequest: (payload) => ({
    type: constants.PODCAST_PLAYLISTS_REQUEST,
    payload,
  }),
  playlistsSuccess: (payload) => ({
    type: constants.PODCAST_PLAYLISTS_SUCCESS,
    payload,
  }),
  artistPlaylistsRequest: (payload) => ({
    type: constants.ARTIST_PLAYLISTS_REQUEST,
    payload,
  }),
  artistPlaylistsSuccess: (payload) => ({
    type: constants.ARTIST_PLAYLISTS_SUCCESS,
    payload,
  }),
  artistPlaylistsFailure: (payload) => ({
    type: constants.LISTING_FAILURE,
    payload,
  }),
  LanguageCategoriesRequest: (payload) => ({
    type: constants.LANGUAGE_CATEGORIES_REQUEST,
    payload,
  }),
  LanguageCategoriesSuccess: (payload) => ({
    type: constants.LANGUAGE_CATEGORIES_SUCCESS,
    payload,
  }),
  LanguageCategoriesFailure: (payload) => ({
    type: constants.LISTING_FAILURE,
    payload,
  }),
  currentSongIndex: (payload) => ({
    type: constants.CURRENT_SONG_INDEX,
    payload,
  }),
  clearPodcasts: {
    type: constants.CLEAR_PODCASTS,
  },
};

export interface PodcastPlayerState {
  dashboard: Dashboard[];
  latestEpisodes: Episode[];
  categoryPodcasts: Podcasts | null;
  currentPlaylist: CurrentPlaylist | null;
  // podcastDetail: podcastDetail[];
  languages: PodcastLanguages | null;
  categories: CategoryResp | null;
  podcasters: ArtistResp | null;
  podcasts: Podcasts | null;
  requesting: boolean;
  error: any;
  listFetching: boolean;
  currentIndex: number;
}

const initialState: PodcastPlayerState = {
  dashboard: [],
  categoryPodcasts: null,
  currentPlaylist: null,
  latestEpisodes: [],
  languages: null,
  categories: null,
  podcasters: null,
  podcasts: null,
  error: "",
  requesting: false,
  listFetching: false,
  currentIndex: 0,
};

export const podcastPlayerReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case constants.PODCAST_DASHBOARD_REQUEST: {
      return {
        ...state,
        requesting: true,
      };
    }

    case constants.PODCAST_DASHBOARD_SUCCESS: {
      const { categories = [], latestEpisodes = [] } = action.payload;
      return {
        ...state,
        requesting: false,
        dashboard: action.payload,
        latestEpisodes,
      };
    }
    case constants.PODCAST_DASHBOARD_FAILURE: {
      return {
        ...state,
        requesting: false,
        error: action.payload,
      };
    }
    case constants.SINGLE_PLAYLIST_REQUEST: {
      const { page, ...details } = action.payload;
      let currentPlaylist = { ...state.currentPlaylist };
      if (currentPlaylist !== null) {
        Object.assign(currentPlaylist, { details });
      } else {
        currentPlaylist = {
          details,
          current_page: page,
          total_pages: page,
          podcasts: [],
        };
      }
      return {
        ...state,
        requesting: page === 1,
        currentPlaylist,
      };
    }

    case constants.SINGLE_PLAYLIST_SUCCESS: {
      const oldData = state.currentPlaylist;
      const currentPlaylist = action.payload;
      if (currentPlaylist?.current_page > 1) {
        Object.assign(currentPlaylist, {
          episodes: [...oldData.podcasts, ...currentPlaylist.episodes],
        });
      }
      return {
        ...state,
        requesting: false,
        currentPlaylist: {
          ...state.currentPlaylist,
          ...currentPlaylist,
        },
      };
    }
    case constants.SINGLE_PLAYLIST_FAILURE: {
      return {
        ...state,
        requesting: false,
        error: action.payload,
      };
    }

    case constants.CATEGORY_PLAYLIST_REQUEST: {
      const { page } = action.payload;
      console.log("action.payloadCATEGORY_PLAYLIST_REQUEST ", action.payload);

      return {
        ...state,
        requesting: page == 1,
        categoryPlaylist: page == 1 ? null : state.categoryPodcasts,
      };
    }

    case constants.CATEGORY_PLAYLIST_SUCCESS: {
      const oldData = state.categoryPodcasts;
      const categoryPodcasts = action.payload;
      if (categoryPodcasts.current_page > 1) {
        Object.assign(categoryPodcasts, {
          podcasts: _.uniqBy(
            [...oldData.episodes, ...categoryPodcasts.episodes],
            "id"
          ),
        });
      }
      return {
        ...state,
        requesting: false,
        categoryPodcasts,
      };
    }
    case constants.CATEGORY_PLAYLIST_FAILURE: {
      return {
        ...state,
        requesting: false,
        error: action.payload,
      };
    }
    case constants.CLEAR_CATEGORY_PLAYLIST: {
      return {
        ...state,
        categoryPlaylist: null,
      };
    }
    case constants.PODCAST_DETAIL_REQUEST: {
      return {
        ...state,
        requesting: true,
      };
    }

    case constants.PODCAST_DETAIL_SUCCESS: {
      return {
        ...state,
        podcastDetail: action.payload,
      };
    }

    case constants.PODCAST_DETAIL_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case constants.PODCAST_LANGUAGE_REQUEST:
    case constants.PODCAST_CATEGORIES_REQUEST:
    case constants.PODCAST_ARTISTS_REQUEST:
    case constants.PODCAST_PLAYLISTS_REQUEST:
    case constants.LANGUAGE_CATEGORIES_REQUEST:
    case constants.ARTIST_PLAYLISTS_REQUEST: {
      const { page } = action.payload;
      return {
        ...state,
        listFetching: page === 1,
      };
    }

    case constants.PODCAST_LANGUAGE_SUCCESS: {
      const oldLanguages = state.languages;
      const languages = action.payload;
      if (languages.current_page > 1) {
        Object.assign(languages, {
          languages: _.uniqBy(
            [...oldLanguages.languages, ...languages.languages],
            "id"
          ),
        });
      }
      return {
        ...state,
        listFetching: false,
        languages,
      };
    }

    case constants.PODCAST_CATEGORIES_SUCCESS: {
      return {
        ...state,
        listFetching: false,
        categories: action.payload,
      };
    }
    case constants.LANGUAGE_CATEGORIES_SUCCESS: {
      const oldCategories = state.categories;
      const categories = action.payload;
      if (categories.current_page > 1) {
        Object.assign(categories, {
          categories: _.uniqBy(
            [...oldCategories.categories, ...categories.categories],
            "id"
          ),
        });
      }
      return {
        ...state,
        listFetching: false,
        categories,
      };
    }

    case constants.PODCAST_ARTISTS_SUCCESS: {
      const Artist = [
        {
          id: 1,
          name: "Artist 1",
          description: "HipHop",
        },
        {
          id: 2,
          name: "Artist 2",
          description: "Carnatical Voice",
        },
      ];
      const ArtistResp = {
        podcasters: action.payload,
        total_pages: 1,
        current_page: 1,
      };

      // const oldArtists = state.podcasters;
      // console.log("Artist :", oldArtists);
      // const podcastersObj = action.payload;
      // console.log("podObj :", podcastersObj);

      // if (podcastersObj.current_page > 1) {
      //   Object.assign(podcastersObj, {
      //     podcasters: _.uniqBy(
      //       [...oldArtists.podcasters, ...podcastersObj.podcasters],
      //       "id"
      //     ),
      //   });
      // }
      return {
        ...state,
        listFetching: false,
        podcasters: action.payload,
      };
    }

    case constants.PODCAST_PLAYLISTS_SUCCESS:
    case constants.ARTIST_PLAYLISTS_SUCCESS: {
      const oldPlaylists = state.podcasts;
      const podcastsObj = action.payload;
      if (podcastsObj.current_page > 1) {
        Object.assign(podcastsObj, {
          podcasts: _.uniqBy(
            [...oldPlaylists.episodes, ...podcastsObj.episodes],
            "id"
          ),
        });
      }
      console.log("podcastobj...", podcastsObj);
      return {
        ...state,
        listFetching: false,
        podcasts: podcastsObj,
      };
    }

    case constants.LISTING_FAILURE: {
      return {
        ...state,
        listFetching: false,
        error: action.payload,
      };
    }
    case constants.CURRENT_SONG_INDEX:
      return { ...state, currentIndex: action.payload };

    case constants.CLEAR_PODCASTS:
      return { ...state, currentPlaylist: null };

    default:
      return state;
  }
};

export const podcastDashboardSelector = ({ podcast }: RootState) =>
  podcast.dashboard;
export const latestEpisodesSelector = ({ podcast }: RootState) =>
  podcast.latestEpisodes || [];
export const currentPlaylistSelector = ({ podcast }: RootState) =>
  podcast.currentPlaylist;

export const categoryPlaylistSelector = ({ podcast }: RootState) =>
  podcast.categoryPodcasts;

export const languageSelector = ({ podcast }: RootState) => podcast.languages;

export const categoriesSelector = ({ podcast }: RootState) =>
  podcast.categories;

export const artistsSelector = ({ podcast }: RootState) => podcast.podcasters;

export const playlistsSelector = ({ podcast }: RootState) => podcast.podcasts;

export const listFetchingSelector = ({ podcast }: RootState) =>
  podcast.listFetching;
export const pocastFetchingSelector = ({ podcast }: RootState) =>
  podcast.requesting;
export const songIndexSelector = ({ podcast }: RootState) =>
  podcast.currentIndex;
