// export interface Podcast {
//   id: number;
//   name: string;
//   description: string;
//   thumbnail: string;
//   podcast_artists: Artist[];
// }

export interface Podcasts {
  podcasts: Podcast[];
  total_pages: number;
  current_page: number;
}

export interface Podcast {
  id: number;
  name: string;
  description: string;
  audio: string;
  episode_number: number;
  languageId: number;
  languageName: string;
  categoryId: number;
  categoryName: string;
  playlistId: number;
  playlistName: string;
  playlistThumbnail: string;
  artistId: number;
  artistName: string;
}

export interface CurrentPlaylist extends PodcastPlaylist {
  details: Podcast;
}

export interface PodcastPlaylist {
  podcasts: Podcast[];
  total_pages: number;
  current_page: number;
}
export interface Dashboard {
  id: number;
  name: string;
  description: string;
  home_show: boolean;
  playlists: Episode[];
  type?: string;
}

export interface Episode {
  audio: string;
  description: string;
  duration: number;
  id: number;
  name: string;
}

export interface podcastDetail {
  podcastTitle: string;
  description: string;
  duration: number;
  audioUrl: string;
  id: string;
  episode: string;
  time: string;
}

export interface Language {
  id: number;
  name: string;
  thumbnail: string;
}
export interface PodcastLanguages {
  languages: Language[];
  total_pages: number;
  current_page: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  home_show: boolean;
}

export interface CategoryResp {
  categories: Category[];
  total_pages: number;
  current_page: number;
}

export interface Artist {
  id: number;
  name: string;
  description: string;
}

export interface ArtistResp {
  podcasters: Artist[];
  total_pages: number;
  current_page: number;
}

export interface PodcastActionsModel {
  podcastDashboardRequest: () => {
    type: string;
  };
  podcastDashboardSuccess: (payload: Dashboard[]) => {
    type: string;
    payload: Dashboard[];
  };
  podcastDashboardFailure: (payload: any) => {
    type: string;
    payload: any;
  };
  singlePlaylistRequest: (payload: {id: number; page: number}) => {
    payload: {id: number; page: number};
    type: string;
  };
  singlePlaylistSuccess: (payload: PodcastPlaylist) => {
    type: string;
    payload: PodcastPlaylist;
  };
  singlePlaylistFailure: (payload: any) => {
    type: string;
    payload: any;
  };
  categoryPlaylistRequest: (payload: {id: number; page: number}) => {
    payload: {id: number; page: number};
    type: string;
  };
  categoryPlaylistSuccess: (payload: PodcastPlaylist) => {
    type: string;
    payload: PodcastPlaylist;
  };
  categoryPlaylistFailure: (payload: any) => {
    type: string;
    payload: any;
  };
  clearCategoryPlaylist: {
    type: string;
  };
  podcastDetailRequest: () => {
    type: string;
  };
  podcastDetailSuccess: (payload: podcastDetail[]) => {
    type: string;
    payload: podcastDetail[];
  };
  podcastDetailFailure: (payload: any) => {
    type: string;
    payload: any;
  };
  podcastLanguageRequest: (payload: {page: number}) => {
    type: string;
    payload: {page: number};
  };
  podcastLanguageSuccess: (payload: PodcastLanguages) => {
    type: string;
    payload: PodcastLanguages;
  };
  listFailure: (payload: any) => {
    type: string;
    payload: any;
  };
  categoriesRequest: (payload: {page: number}) => {
    type: string;
    payload: {page: number};
  };
  categoriesSuccess: (payload: CategoryResp) => {
    type: string;
    payload: CategoryResp;
  };
  artistsRequest: (payload: {page: number}) => {
    type: string;
    payload: {page: number};
  };
  artistsSuccess: (payload: ArtistResp) => {
    type: string;
    payload: ArtistResp;
  };
  playlistsRequest: (payload: {page: number}) => {
    type: string;
    payload: {page: number};
  };
  playlistsSuccess: (payload: Podcasts) => {
    type: string;
    payload: Podcasts;
  };
  artistPlaylistsRequest: (payload: {id: number; page: number}) => {
    type: string;
    payload: {id: number; page: number};
  };
  artistPlaylistsSuccess: (payload: any) => {
    type: string;
    payload: any;
  };
  artistPlaylistsFailure: (payload: any) => {
    type: string;
    payload: any;
  };
  LanguageCategoriesRequest: (payload: {id: number; page: number}) => {
    type: string;
    payload: {id: number; page: number};
  };
  LanguageCategoriesSuccess: (payload: any) => {
    type: string;
    payload: any;
  };
  LanguageCategoriesFailure: (payload: any) => {
    type: string;
    payload: any;
  };
  currentSongIndex: (payload: number) => {
    type: string;
    payload: number;
  };
  clearPodcasts: {
    type: string;
  };
}
