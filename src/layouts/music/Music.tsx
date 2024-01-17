import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import constants, {rootNames} from '../../common/constants';
import Dashboard from '../../commonLayouts/Dashboard';

const Music = () => {
  const navigation = useNavigation();

  const browseByData = [
    {
      name: 'Playlists',
      route: rootNames.MUSIC_PLAYLIST_LIST,
    },
    {
      name: 'Artist',
      route: rootNames.MUSIC_ARTIST_LIST,
    },
    {
      name: 'Categories',
      route: constants.rootNames.MUSIC_CATEGORIE_LIST,
    },
    {
      name: 'Album',
      route: constants.rootNames.MUSIC_ALBUM_LIST,
    },
    {
      name: 'Languages',
      route: constants.rootNames.MUSIC_LANGUAGE_LIST,
    },
  ];

  const getDummyData = () => {
    let dummyData = [
      {
        id: 1,
        name: 'General Category',
        description: 'General desc',
        home_show: true,
        playlists: [
          {
            id: 1,
            name: 'Podcast Fav Playlist',
            description: 'Fav playlist desc',
            thumbnail:
              'https://farm7.staticflickr.com/6089/6115759179_86316c08ff_z_d.jpg',
          },
          {
            id: 1,
            name: 'Podcast Fav Playlist',
            description: 'Fav playlist desc',
            thumbnail:
              'https://farm2.staticflickr.com/1449/24800673529_64272a66ec_z_d.jpg',
          },
        ],
      },
      {
        id: 3,
        name: 'rock',
        description: 'hello world',
        home_show: true,
        playlists: [
          {
            id: 1,
            name: 'Podcast Fav Playlist',
            description: 'Fav playlist desc',
            thumbnail:
              'https://farm7.staticflickr.com/6089/6115759179_86316c08ff_z_d.jpg',
          },
          {
            id: 1,
            name: 'Podcast Fav Playlist',
            description: 'Fav playlist desc',
            thumbnail:
              'https://farm2.staticflickr.com/1449/24800673529_64272a66ec_z_d.jpg',
          },
        ],
      },
    ];
  };

  return (
    <View style={{flex: 1}}>
      <Dashboard
        browseByData={browseByData}
        dashboardData={getDummyData()}
        onSeeAllPress={(item, index) =>
          navigation.navigate(constants.rootNames.MUSIC_LIST)
        }
        onPodcastClick={(item, index) =>
          navigation.navigate(constants.rootNames.MUSIC_DETAIL)
        }
        onBrowseByClick={root => navigation.navigate(root)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Music;
