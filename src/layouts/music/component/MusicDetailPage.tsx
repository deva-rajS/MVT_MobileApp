import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import constants from '../../../common/constants';
import DetailPage from '../../../commonLayouts/DetailPage';

const MusicDetailPage = () => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [isMoreText, setIsMoreText] = useState(false);
  const navigation = useNavigation();
  const playIcon = 'arrow-right-drop-circle';
  const pauseIcon = 'pause-circle';

  const dummyData = () => {
    const data = [];
    for (let i = 0; i <= 20; i++) {
      data.push({
        podcastTitle: `podcast${i}`,
        description: `An essay is, generally, a piece of writing that gives the author's own argument, but the definition is vague, overlapping with those of a letter, a paper, an article, a pamphlet, and a short story. Essays have traditionally been sub-classified as formal and informal. Formal essays are characterized by "serious purpose, dignity, logical organization, length," whereas the informal essay is characterized by "the personal element (self-revelation, individual tastes and experiences, confidential manner), humor, graceful style, rambling structure, unconventionality or novelty of theme${i}`,
        duration: '30 Min',
      });
    }

    return data;
  };

  const onPodcastClick = () => {
    console.log('on podcast click');

    navigation.navigate(constants.rootNames.MUSIC_DESCRIPTION);
  };

  return (
    <View style={style.container}>
      <DetailPage
        DetailPageData={dummyData()}
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

export default MusicDetailPage;
