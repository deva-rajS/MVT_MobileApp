import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Podcasts from '../layouts/podcast/Podcasts';
import {TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from '../common/colorConstants';
import constants, {wp} from '../common/constants';
import PodcastDetailPage from '../layouts/podcast/component/PodcastDetailPage';
import podcastDescriptionPage from '../layouts/podcast/component/podcastDescriptionPage';
import PodcastList from '../layouts/podcast/component/PodcastList';
import BrowseList from '../layouts/BrowseList';
import Podcasters from '../layouts/podcast/lists/Podcasters';
import PodcastPlaylist from '../layouts/podcast/component/PodcastPlaylist';
import PodcastersPlaylist from '../layouts/podcast/component/PodcastersPlaylist';
import PodcastCategoriesPlaylist from '../layouts/podcast/component/PodcastCategoriesPlaylist';
import PodcastsPlaylist from '../layouts/podcast/component/PodcastsPlaylist';
import PodcastLanguagePlaylist from '../layouts/podcast/component/PodcastLanguagePlaylist';
import PodcastCategorieList from '../layouts/podcast/lists/Categories';
import PodcastLanguageList from '../layouts/podcast/lists/Languages';
import PodcastBookmarkList from '../layouts/podcast/lists/BookmarkList';
import HomeHeader from '../commonLayouts/HomepageHeader';
import Episodes from '../layouts/podcast/lists/Episodes';

const Stack = createNativeStackNavigator();

const PodcastNavigation = () => {
  const backArrow = (route, nav) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: wp(15),
          backgroundColor: colors.appBackground,
        }}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            color={colors.appTheme}
            size={35}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const routes = [
    {name: constants.rootNames.PODCASTS, component: Podcasts, header: 'home'},
    {
      name: constants.rootNames.PODCASTS_DETAIL,
      component: PodcastDetailPage,
      header: 'back',
    },
    {
      name: constants.rootNames.PODCASTS_DESCRIPTION,
      component: podcastDescriptionPage,
      header: 'back',
    },
    {
      name: constants.rootNames.PODCAST_LIST,
      component: PodcastList,
      header: 'back',
    },
    {
      name: constants.rootNames.BROWSE_LIST,
      component: BrowseList,
      header: 'back',
    },
    {
      name: constants.rootNames.PODCASTERS,
      component: Podcasters,
      header: 'back',
    },
    {
      name: constants.rootNames.PODCAST_PLAYLIST,
      component: PodcastPlaylist,
      header: 'back',
    },
    {
      name: constants.rootNames.PODCASTER_PLAYLIST,
      component: PodcastersPlaylist,
      header: 'back',
    },
    {
      name: constants.rootNames.PODCAST_CATEGORIES_PLAYLIST,
      component: PodcastCategoriesPlaylist,
      header: 'back',
    },
    {
      name: constants.rootNames.PODCASTS_PLAYLIST,
      component: PodcastsPlaylist,
      header: 'back',
    },
    {
      name: constants.rootNames.PODCAST_LANGUAGE_PLAYLIST,
      component: PodcastLanguagePlaylist,
      header: 'back',
    },
    {
      name: constants.rootNames.PODCAST_CATEGORIES_LIST,
      component: PodcastCategorieList,
      header: 'back',
    },
    {
      name: constants.rootNames.PODCAST_LANGUAGE_LIST,
      component: PodcastLanguageList,
      header: 'back',
    },
    {
      name: constants.rootNames.PODCAST_BOOKMARK_LIST,
      component: PodcastBookmarkList,
      header: 'back',
    },
    {
      name: constants.rootNames.EPISODES_LIST,
      component: Episodes,
      header: 'back',
    },
  ];

  const getHeader = ({navigation, route, header}) => {
    if (header === 'back') {
      return {
        header: () => backArrow(route, navigation),
      };
    } else if (header === 'home') {
      return {
        header: () => HomeHeader(route, navigation),
      };
    } else {
      return {
        headerShown: false,
      };
    }
  };

  return (
    <Stack.Navigator
      initialRouteName={constants.rootNames.PODCASTS}
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {backgroundColor: colors.white},
      }}>
      {routes.map(path => {
        return (
          <Stack.Screen
            key={path.name}
            name={path.name}
            component={path.component}
            options={({route, navigation}) =>
              getHeader({route, navigation, header: path.header})
            }
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default PodcastNavigation;
