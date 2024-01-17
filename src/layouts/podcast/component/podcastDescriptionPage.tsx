import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';
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
import {useSelector} from 'react-redux';
import colors from '../../../common/colorConstants';
import constants, {size} from '../../../common/constants';
import DescriptionPage from '../../../commonLayouts/DescriptionPage';
import DetailPage from '../../../commonLayouts/DetailPage';
import PodcastEpisodeListitem from '../../../commonLayouts/PodcastEpisodeListItem';
import {currentPlaylistSelector} from '../../../reducers/podcast';

const PodcastDescriptionPage = () => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [isMoreText, setIsMoreText] = useState(false);
  const navigation = useNavigation();
  const playIcon = 'arrow-right-drop-circle';
  const pauseIcon = 'pause-circle';
  const podcastDetail = useSelector(currentPlaylistSelector);

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

  const onPodcastClick = () => {
    console.log('on podcast click description podcast');

    // navigation.navigate(constants.rootNames.PODCASTS_DESCRIPTION)
  };

  return (
    <View style={style.container}>
      <DescriptionPage
        descriptionPageData={podcastDetail}
        onPodcastClick={onPodcastClick}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PodcastDescriptionPage;
