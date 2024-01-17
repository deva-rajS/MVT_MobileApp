import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../../common/colorConstants';
import {size} from '../../../common/constants';
import PodcastEpisodeListitem from '../../../commonLayouts/PodcastEpisodeListItem';
import { episodesSelector } from '../../../reducers/latestPodcast';

const PodcastLatestSeeAll = () => {
  const episodesData = useSelector(episodesSelector);
  const onPodcastItemClick = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.latestTxtCon}>
        <Text style={styles.latestTxt}>All</Text>
      </View>
      <View style={styles.latestItemCon}>
        <FlatList
          data={episodesData?.episodes || []}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <PodcastEpisodeListitem
              item={item}
              index={index}
              onPodcastClick={onPodcastItemClick}
              fullData={episodesData?.episodes || []}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingHorizontal: 15,
  },
  latestItemCon: {},
  latestTxtCon: {},
  latestTxt: {
    fontSize: size.lg,
    fontWeight: 'bold',
    color: colors.primaryText,
  },
});
export default PodcastLatestSeeAll;
