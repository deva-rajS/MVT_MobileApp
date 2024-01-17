import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../common/colorConstants';
import {rootNames, size} from '../../../common/constants';
import Playlist from '../../../commonLayouts/Playlist';

const PodcastBookmarkList = () => {
  const navigation = useNavigation();
  const getDummyData = () => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        podcastName: 'Podcast' + i,
        episodeName: 'Episode' + i,
      });
    }

    return arr;
  };

  const onItemClick = () => {
    //  navigation.navigate(rootNames.PODCAST_PLAYLIST)
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.browseByItemCon}
        onPress={() => (onItemClick ? onItemClick() : console.log('error'))}
      >
        <View style={styles.browseByLeftCon}>
          <Text style={styles.browseByItemText}>{item.podcastName}</Text>
          <Text style={styles.episodeText}>{item.episodeName}</Text>
        </View>
        <View style={styles.browseByRightCon}>
          <MaterialCommunityIcons
            name={'chevron-right'}
            color={colors.secondaryTextColor}
            size={30}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getDummyData()}
        keyExtractor={item => item.title}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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
  browseByItemCon: {
    marginTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  browseByLeftCon: {width: '80%'},
  browseByItemText: {fontSize: size.md, color: colors.primaryText},
  browseByRightCon: {
    width: '20%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  episodeText: {
    color: colors.secondaryText,
    fontSize: size.sm,
  },
});
export default PodcastBookmarkList;
