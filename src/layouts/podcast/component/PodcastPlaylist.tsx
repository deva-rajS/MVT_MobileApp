import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import colors from '../../../common/colorConstants';
import PodcastEpisodeListitem from '../../../commonLayouts/PodcastEpisodeListItem';

const PodcastPlaylist = () => {
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

  const onClickEpisode = () => {
    console.log('clicked john');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData()}
        keyExtractor={item => item.podcastTitle}
        renderItem={({item, index}) => (
          <PodcastEpisodeListitem
            item={item}
            index={index}
            onPodcastClick={onClickEpisode}
            fullData={dummyData()}
          />
        )}
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={headerComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
    paddingHorizontal: 15,
  },
});
export default PodcastPlaylist;
