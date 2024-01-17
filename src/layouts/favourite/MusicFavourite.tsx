import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../common/colorConstants';
import Playlist from '../../commonLayouts/Playlist';
import PodcastEpisodeListitem from '../../commonLayouts/PodcastEpisodeListItem';

const MusicFavourite = () => {
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

  const onClickEpisode = () => {
    console.log('clicked');
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
export default MusicFavourite;
