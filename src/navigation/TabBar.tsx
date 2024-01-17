import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import constants from '../common/constants';
import colors from '../common/colorConstants';
import PodcastNavigation from './PodcastNavigation';
import CustomTarBar from '../commonLayouts/CustomTabBar';
import FavouritePodcastNavigator from './FavouritePodcastNavigator';
import RecordPodcast from '../commonLayouts/RecordPodcast';
import ReaderPage from '../layouts/reader/ReaderPage';

const Tab = createBottomTabNavigator();

const TabBar = ({route, navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName={constants.rootNames.PODCASTS_STACK}
      screenOptions={{
        tabBarActiveTintColor: colors.appTheme,
      }}
      tabBar={props => <CustomTarBar {...props} />}>
      <Tab.Screen
        name={constants.rootNames.PODCASTS_STACK}
        component={PodcastNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Podcast',
        }}
      />
      <Tab.Screen
        name={constants.rootNames.READERS}
        component={ReaderPage}
        options={{
          tabBarLabel: 'Reader',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name={constants.rootNames.FAVOURITE}
        component={FavouritePodcastNavigator}
        options={{
          tabBarLabel: 'Favorite',
          // tabBarIcon: props => (
          //   <MaterialCommunityIcons name="heart" {...props} />
          // ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
