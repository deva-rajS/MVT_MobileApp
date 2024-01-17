import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {rootNames} from '../common/constants';
import MusicFavourite from '../layouts/favourite/MusicFavourite';
import PodcastFavourite from '../layouts/favourite/PodcastFavourite';
import PodcastFavouriteDetailScreen from '../layouts/favourite/podcastFavouriteDetailScreen';
import PodcastFavoriteDescriptionScreen from '../layouts/favourite/PodcastFavoriteDescriptionScreen';

const TopBar = createMaterialTopTabNavigator();

const FavouriteTopBarNavigator = () => {
  return (
    <TopBar.Navigator>
      <TopBar.Screen
        name={rootNames.FAVOURITE_PODCAST}
        component={PodcastFavourite}
        options={{title: 'Podcast'}}
      />
      <TopBar.Screen
        name={rootNames.MUSIC}
        component={MusicFavourite}
        options={{title: 'Music'}}
      />
      {/* <TopBar.Screen name= {rootNames.PODCAST_FAVORITE_DETAIL_SCREEN} component={PodcastFavouriteDetailScreen} options={{title: 'Favourite'}} />
      <TopBar.Screen name= {rootNames.PODCAST_FAVORITE_DESCRIPTION_SCREEN} component={PodcastFavoriteDescriptionScreen} options={{title: 'Favourite'}} /> */}
    </TopBar.Navigator>
  );
};

export default FavouriteTopBarNavigator;
