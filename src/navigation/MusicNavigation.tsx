import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from '../common/colorConstants';
import constants, {wp} from '../common/constants';
import MusicList from '../layouts/music/component/MusicList';
import Music from '../layouts/music/Music';
import MusicBrowseList from '../layouts/music/component/MusicBrowseList';
import MusicDetailPage from '../layouts/music/component/MusicDetailPage';
import MusicDescriptionPage from '../layouts/music/component/MusicDescriptionPage';
import MusicCategorieList from '../layouts/music/lists/MusicCategorieList';
import MusicArtistList from '../layouts/music/lists/MusicArtistList';
import MusicAlbumList from '../layouts/music/lists/MusicAlbumList';
import MusicLanguageList from '../layouts/music/lists/MusicLanguageList';
import MusicPlaylistList from '../layouts/music/lists/MusicPlaylistList';

const Stack = createNativeStackNavigator();

const MusicNavigation = ({route, navigation}) => {
  const backArrow = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: wp(15),
          backgroundColor: colors.appBackground,
        }}
      >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <MaterialCommunityIcons
            name="chevron-left"
            color={colors.appTheme}
            size={35}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Stack.Navigator
      initialRouteName={constants.rootNames.MUSIC}
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {backgroundColor: colors.white},
      }}
    >
      <Stack.Screen
        name={constants.rootNames.MUSIC_DETAIL}
        component={MusicDetailPage}
        options={{
          header: backArrow,
          // title: '',
          // headerTintColor: colors.whiteColor,
          // headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={constants.rootNames.MUSIC_DESCRIPTION}
        component={MusicDescriptionPage}
        options={{
          header: backArrow,
        }}
      />

      <Stack.Screen
        name={constants.rootNames.MUSIC_LIST}
        component={MusicList}
        options={{
          header: backArrow,
        }}
      />
      <Stack.Screen
        name={constants.rootNames.MUSIC}
        component={Music}
        options={{
          title: constants.appName,
          headerTintColor: colors.primaryText,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <MaterialCommunityIcons
              name="menu"
              color={colors.appTheme}
              size={30}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="magnify"
              color={colors.appTheme}
              size={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name={constants.rootNames.MUSIC_BROWSE_LIST}
        component={MusicBrowseList}
        options={{
          header: backArrow,
        }}
      />
      <Stack.Screen
        name={constants.rootNames.MUSIC_CATEGORIE_LIST}
        component={MusicCategorieList}
        options={{
          header: backArrow,
        }}
      />
      <Stack.Screen
        name={constants.rootNames.MUSIC_ARTIST_LIST}
        component={MusicArtistList}
        options={{
          header: backArrow,
        }}
      />
      <Stack.Screen
        name={constants.rootNames.MUSIC_ALBUM_LIST}
        component={MusicAlbumList}
        options={{
          header: backArrow,
        }}
      />
      <Stack.Screen
        name={constants.rootNames.MUSIC_LANGUAGE_LIST}
        component={MusicLanguageList}
        options={{
          header: backArrow,
        }}
      />
      <Stack.Screen
        name={constants.rootNames.MUSIC_PLAYLIST_LIST}
        component={MusicPlaylistList}
        options={{
          header: backArrow,
        }}
      />
    </Stack.Navigator>
  );
};

export default MusicNavigation;
