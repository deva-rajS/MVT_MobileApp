import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import constants, { rootNames } from "../../common/constants";
import Dashboard from "../../commonLayouts/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import {
  actions as podcastActions,
  latestEpisodesSelector,
  podcastDashboardSelector,
} from "../../reducers/podcast";
import { onFetchEpisodes } from "../../reducers/latestPodcast";

const Podcasts = ({ navigation }) => {
  const dispatch = useDispatch();
  const podcastCategorie = useSelector(podcastDashboardSelector);
  const latestEpisodes = useSelector(latestEpisodesSelector);
  const [dashboardData, setDashBoardData] = useState(podcastCategorie);
  const browseByData = [
    {
      name: "Podcasters",
      route: constants.rootNames.PODCASTERS,
    },
    {
      name: "Categories",
      route: constants.rootNames.PODCAST_CATEGORIES_LIST,
    },
    {
      name: "Podcasts",
      route: constants.rootNames.PODCASTS_PLAYLIST,
    },
    {
      name: "Languages",
      route: constants.rootNames.PODCAST_LANGUAGE_LIST,
    },
  ];

  const refreshData = () => {
    dispatch(podcastActions.podcastDashboardRequest());
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    // console.log('podcastCategorie', podcastCategorie);
    if (podcastCategorie) {
      setDashBoardData(podcastCategorie);
    }
  }, [podcastCategorie]);

  const goToPodcastList = (item, index) => {
    // console.log('gotopdcast', item, index);
    navigation.navigate(constants.rootNames.PODCAST_LIST, { ...item });
  };

  const goToPodcastDetailPage = (item, index) => {
    dispatch(podcastActions.singlePlaylistRequest({ ...item, page: 1 }));
    navigation.navigate(constants.rootNames.PODCASTS_DETAIL);
  };

  const onPodcastItemClick = () => {};

  const onBroweByListClick = (route) => {
    if (route) {
      navigation.navigate(route);
    }
    switch (route) {
      case constants.rootNames.PODCAST_CATEGORIES_LIST:
        dispatch(podcastActions.categoriesRequest({ page: 1 }));
        break;
      case constants.rootNames.PODCASTERS:
        dispatch(podcastActions.artistsRequest({ page: 1 }));
        break;
      case constants.rootNames.PODCAST_LANGUAGE_LIST:
        dispatch(podcastActions.podcastLanguageRequest({ page: 1 }));
        break;
      case constants.rootNames.PODCASTS_PLAYLIST:
        dispatch(podcastActions.playlistsRequest({ page: 1 }));
        break;
      default:
    }
  };
  const getFinalData = () => {
    // dashboardData
    // console.log('datshs..', dashboardData);
    let finalData = [...dashboardData];
    console.log("data :", finalData);
    if (dashboardData) {
      if (dashboardData.length >= 5) {
        finalData.splice(4, 0, { type: "browseBy", id: -1 });
      } else if (dashboardData.length < 5) {
        finalData.push({ type: "browseBy", id: -1 });
      }
    }
    finalData.splice(0, 0, { type: "latest", id: -2 });
    // console.log('finaldata', finalData);
    return finalData;
  };

  const onLatestSeeAllPress = () => {
    dispatch(onFetchEpisodes({ page: 1 }));
    navigation.navigate(rootNames.EPISODES_LIST);
  };
  return (
    <View style={{ flex: 1 }}>
      <Dashboard
        latestEpisodes={latestEpisodes}
        browseByData={browseByData}
        dashboardData={getFinalData()}
        onSeeAllPress={goToPodcastList}
        onPodcastClick={goToPodcastDetailPage}
        onBrowseByClick={onBroweByListClick}
        onPodcastItemClick={onPodcastItemClick}
        onLatestSeeAllPress={onLatestSeeAllPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Podcasts;
