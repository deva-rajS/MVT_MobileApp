import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../common/colorConstants';
import constants, {size} from '../../common/constants';
import DetailPage from '../../commonLayouts/DetailPage';
import PodcastEpisodeListitem from '../../commonLayouts/PodcastEpisodeListItem';
import {PodcastContext} from '../../context/PodcastContext';
import {
  actions as podcastActions,
  currentPlaylistSelector,
} from '../../reducers/podcast';

const PodcastFavouriteDetailScreen = () => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [isMoreText, setIsMoreText] = useState(false);
  const navigation = useNavigation();
  const {onPlayAudio, pausePlayer, onResumeAudio} = useContext(PodcastContext);
  const playIcon = 'arrow-right-drop-circle';
  const pauseIcon = 'pause-circle';
  const dispatch = useDispatch();

  const podcastDetail = useSelector(currentPlaylistSelector);

  useEffect(() => {
    console.log('podcastDetail', podcastDetail);
  }, [podcastDetail]);

  const dummyData = [
    {
      id: 1,
      name: 'New Podcasts',
      description: 'New One',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      episode_number: 2,
      subjectId: 2,
      subjectName: 'Ielts',
      categoryId: 2,
      categoryName: 'New podcast categoreies',
      playlistId: 2,
      playlistName: 'Favorite Playlists',
      playlistThumbnail:
        'https://s3-us-west-2.amazonaws.com/redfox-media-dev/images/podcast_playlists/2/original/c-aaryan-450x450.png?1637236552',
      artistId: 2,
      artistName: 'Jackson ',
    },
    {
      id: 1,
      name: 'New Podcasts',
      description: 'New One',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      episode_number: 2,
      subjectId: 2,
      subjectName: 'Ielts',
      categoryId: 2,
      categoryName: 'New podcast categoreies',
      playlistId: 2,
      playlistName: 'Favorite Playlists',
      playlistThumbnail:
        'https://s3-us-west-2.amazonaws.com/redfox-media-dev/images/podcast_playlists/2/original/c-aaryan-450x450.png?1637236552',
      artistId: 2,
      artistName: 'Jackson ',
    },
    {
      id: 1,
      name: 'New Podcasts',
      description: 'New One',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      episode_number: 2,
      subjectId: 2,
      subjectName: 'Ielts',
      categoryId: 2,
      categoryName: 'New podcast categoreies',
      playlistId: 2,
      playlistName: 'Favorite Playlists',
      playlistThumbnail:
        'https://s3-us-west-2.amazonaws.com/redfox-media-dev/images/podcast_playlists/2/original/c-aaryan-450x450.png?1637236552',
      artistId: 2,
      artistName: 'Jackson ',
    },
    {
      id: 1,
      name: 'New Podcasts',
      description: 'New One',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      episode_number: 2,
      subjectId: 2,
      subjectName: 'Ielts',
      categoryId: 2,
      categoryName: 'New podcast categoreies',
      playlistId: 2,
      playlistName: 'Favorite Playlists',
      playlistThumbnail:
        'https://s3-us-west-2.amazonaws.com/redfox-media-dev/images/podcast_playlists/2/original/c-aaryan-450x450.png?1637236552',
      artistId: 2,
      artistName: 'Jackson ',
    },
  ];
  const onPodcastClick = (item, index) => {
    console.log('on podcast click', item, index);

    navigation.navigate(
      constants.rootNames.PODCAST_FAVORITE_DESCRIPTION_SCREEN,
      {currentIndex: index},
    );
  };

  // const onPlayOrPauseClick = (item, index) => {
  //     console.log('item,', item, index);
  //     const songs = dummyData()
  //    onPlayAudio({songs, index})

  // }

  const onPlayClick = (item, index) => {
    // const songs = dummyData();
    // onPlayAudio({songs, index})
  };

  const onPauseClick = (item, index) => {
    pausePlayer();
  };

  const onResumeClick = (item, index) => {
    onResumeAudio(item);
  };

  const loadMore = () => {
    // done
    // if (podcastDetail?.current_page < podcastDetail?.total_pages) {
    //   dispatch(
    //     podcastActions.singlePlaylistRequest({
    //       ...podcastDetail?.details,
    //       page: podcastDetail?.current_page + 1,
    //     }),
    //   );
    // }
  };

  useEffect(() => {
    return () => {
      dispatch(podcastActions.clearPodcasts);
    };
  }, []);

  return (
    <View style={style.container}>
      <DetailPage
        detailPageData={podcastDetail}
        onPodcastClick={onPodcastClick}
        loadMore={loadMore}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PodcastFavouriteDetailScreen;
