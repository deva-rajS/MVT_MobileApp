import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import constants from '../../../common/constants';
import DetailPage from '../../../commonLayouts/DetailPage';
import {PodcastContext} from '../../../context/PodcastContext';
import {
  actions as podcastActions,
  currentPlaylistSelector,
} from '../../../reducers/podcast';

const PodcastDetailPage = () => {
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

  const dummyData = () => {
    const data = [];
    for (let i = 1; i <= 20; i++) {
      if (i % 2 == 0) {
        data.push({
          podcastTitle: `podcast${i}`,
          description: `An essay is, generally, a piece of writing that gives the author's own argument, but the definition is vague, overlapping with those of a letter, a paper, an article, a pamphlet, and a short story. Essays have traditionally been sub-classified as formal and informal. Formal essays are characterized by "serious purpose, dignity, logical organization, length," whereas the informal essay is characterized by "the personal element (self-revelation, individual tastes and experiences, confidential manner), humor, graceful style, rambling structure, unconventionality or novelty of theme${i}`,
          duration: '30 Min',
          audio:
            'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          id: i,
          thumbnail:
            'https://media.istockphoto.com/vectors/podcast-concept-thin-line-icon-abstract-icon-abstract-gradient-vector-id1283532997?k=20&m=1283532997&s=612x612&w=0&h=SPHa5xP_fZmU9tOw-6dTR8lDm04sTRgupK6jn_COKus=',
        });
      } else {
        data.push({
          podcastTitle: `podcast${i}`,
          description: `An essay is, generally, a piece of writing that gives the author's own argument, but the definition is vague, overlapping with those of a letter, a paper, an article, a pamphlet, and a short story. Essays have traditionally been sub-classified as formal and informal. Formal essays are characterized by "serious purpose, dignity, logical organization, length," whereas the informal essay is characterized by "the personal element (self-revelation, individual tastes and experiences, confidential manner), humor, graceful style, rambling structure, unconventionality or novelty of theme${i}`,
          duration: '30 Min',
          audio:
            'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
          id: i,
          thumbnail:
            'https://media.istockphoto.com/vectors/podcast-concept-thin-line-icon-abstract-icon-abstract-gradient-vector-id1283532997?k=20&m=1283532997&s=612x612&w=0&h=SPHa5xP_fZmU9tOw-6dTR8lDm04sTRgupK6jn_COKus=',
        });
      }
    }

    return data;
  };
  const onPodcastClick = (item, index) => {
    console.log('on podcast click', item, index);

    navigation.navigate(constants.rootNames.PODCASTS_DESCRIPTION, {
      currentIndex: index,
    });
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
    if (podcastDetail?.current_page < podcastDetail?.total_pages) {
      dispatch(
        podcastActions.singlePlaylistRequest({
          ...podcastDetail?.details,
          page: podcastDetail?.current_page + 1,
        }),
      );
    }
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

export default PodcastDetailPage;
