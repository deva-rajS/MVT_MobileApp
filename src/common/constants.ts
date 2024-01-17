import { Dimensions, PixelRatio } from "react-native";

export const { width, height } = Dimensions.get("window");

const widthPercentageToDP = (elementWidth: number) => {
  return PixelRatio.roundToNearestPixel((width * elementWidth) / 100);
  // * scaleFactor
};
const heightPercentageToDP = (elemHeight) => {
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

const wp = widthPercentageToDP;
const hp = heightPercentageToDP;
export const artboardWidth = 375;
export const artboardHeight = 700;

export const responsiveWidth = (width: number) => {
  const scaleFactor = width > 500 ? 0.65 : 1;
  const value = (width / artboardWidth) * 100 * scaleFactor;
  return widthPercentageToDP(value);
};

export const responsiveHeight = (height: number) =>
  widthPercentageToDP((height / artboardHeight) * 100);

export { wp, hp, responsiveWidth as rw, responsiveHeight as rh };

export const rootNames = {
  MUSIC: "music",
  PODCASTS: "podcasts",
  DETAIL: "detail",
  SEARCH: "search",
  TAB_BAR: "tabbar",
  DRAWER: "drawer",
  PODCASTS_DETAIL: "podcastDetail",
  PODCASTS_DESCRIPTION: "podcastDescription",
  PODCAST_LIST: "podcastList",
  PODCASTS_STACK: "podcastStack",
  BROWSE_LIST: "browseList",
  PREVIEW: "signInPreview",
  SIGN_IN: "signIn",
  SIGN_UP: "signUp",
  FORGOT_PASSWORD: "forgotPassword",
  AUTH_NAVIGATOR: "authNavigator",

  PODCASTERS: "podcasters",
  PODCAST_PLAYLIST_SELECTION: "podcastPlaylistSelection",
  PODCAST_PLAYLIST_CREATION: "podcastPlaylistCreation",
  PODCAST_PLAYLIST: "podcastPlaylist",
  PODCASTER_PLAYLIST: "podcasterPlaylist",
  PODCAST_CATEGORIES_PLAYLIST: "podcastCategoriesPlaylist",
  PODCAST_LANGUAGE_PLAYLIST: "podcastLanguaePlaylist",
  PODCASTS_PLAYLIST: "podcastsPlaylist",
  PODCAST_CATEGORIES_LIST: "podcastCategoriesList",
  PODCAST_LANGUAGE_LIST: "podcastLanguageList",
  PODCAST_BOOKMARK_LIST: "podcastBookmarkList",

  MUSIC_DETAIL: "musicDetail",
  MUSIC_DESCRIPTION: "musicDescription",
  MUSIC_LIST: "musicList",
  MUSIC_BROWSE_LIST: "musicBrowseList",
  MUSIC_STACK: "musicStack",
  MUSIC_CATEGORIE_LIST: "musicCategorieList",
  MUSIC_ALBUM_LIST: "musicAlbumList",
  MUSIC_ARTIST_LIST: "musicArtistList",
  MUSIC_LANGUAGE_LIST: "musicLanguageList",
  MUSIC_PLAYLIST_LIST: "musicPlaylistList",

  FAVOURITE: "favourite",
  FAVOURITE_PODCAST: "favouritePodcast",
  FAVORITE_MUSIC: "favouriteMusic",
  PODCAST_FAVORITE_DETAIL_SCREEN: "podcastFavoriteDetailScreen",
  PODCAST_FAVORITE_DESCRIPTION_SCREEN: "podcastFavoriteDescriptionScreen",
  FAVORITE_TOPBAR_NAVIGATOR: "favoriteTopbarNavigator",

  RECORD_PODCAST: "recordPodcast",
  EPISODES_LIST: "episodesList",
  MORE_SCREEN: "moreScreen",

  READERS: "readers",
};

const appName = "MVT";

const scale = 1;
export const size = {
  xs: responsiveWidth(10),
  sm: responsiveWidth(12),
  md: responsiveWidth(14),
  lg: responsiveWidth(16),
  xl: responsiveWidth(18),
  mdweight: "300",
  lgweight: "500",
  xlweight: "700",

  middleCal: wp(100) / 1.2,
  buttonwidth: wp(100) / 1.4,
  // large: 20,
  // small: 13,
  // medium: 16,

  // onboarding1heading: 48,
  // onboarding2heading: 64,
  // // button size
  // smallbuttonwidth: wp(100) / 2.5,
  // xsbuttonwidth: wp(100) / 3,
  // backButtonContainer: wp(100) / 7,
  // //margin size
  // buttonmarginsize: wp(2),
  // // padding size
  // buttonpaddingsize: wp(4),
  // // font size
  // xSmallFS: wp(2.5) * scale,
  // smallfontsize: wp(3) * scale, //10
  // smalllineHeight: hp(1.8),
  // smallletterspace: wp(0.05),

  // mediumfontsize: wp(4) * scale, //13
  // mediumlineHeight: hp(2.5),
  // mediumletterspace: wp(0.05),

  // mlfontsize: wp(4.5) * scale, //18
  // mllineHeight: hp(3.0),
  // mlletterspace: wp(0.05),

  // largefontsize: wp(5.5) * scale, //22
  // largelineHeight: hp(4.3),
  // largeletterspace: wp(0.05),

  // slfontsize: wp(8.5) * scale, //32
  // sllineHeight: hp(5.5),
  // slletterspace: wp(0.05),

  // nextlargefontsize: wp(8) * scale, //36
  // nextlargelineHeight: hp(7.7),
  // nextlargeletterspace: wp(0.05),

  // Extralargefontsize: wp(17) * scale, //64
  // ExtralargelineHeight: hp(9.5),
  // Extralargeletterspace: wp(0.05),

  // xxlfontsize: wp(22) * scale, //96
  // xxllineHeight: hp(13.5),
  // xxlletterspace: wp(0.05),
  // fontSize5: wp(5) * scale,
  fontSize4: wp(4) * scale,
  fontSize34: wp(3.4) * scale,
  fontSize35: wp(3.5) * scale,
  fontSize6: wp(6) * scale,
  fontSize8: wp(8) * scale,
  fontSize10: wp(10) * scale,
};

export default { rootNames, appName };
