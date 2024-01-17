import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {rootNames} from '../../../common/constants';
import AuthorList from '../../../commonLayouts/AuthorList';
import {Artist} from '../../../modal/podcast';
import {
  actions as podcastActions,
  artistsSelector,
} from '../../../reducers/podcast';

const Podcasters = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const artistsData = useSelector(artistsSelector);
  // const fetching = useSelector(listFetchingSelector);

  const [data, setData] = useState<Artist[]>([]);

  useEffect(() => {
    console.log('artistsData', artistsData);

    if (artistsData) {
      setData(artistsData.podcasters);
    }
  }, [artistsData]);

  const loadMore = () => {
    if (artistsData.current_page < artistsData.total_pages) {
      dispatch(
        podcastActions.artistsRequest({page: artistsData.current_page + 1}),
      );
    }
  };

  const goToPodcastersPlaylist = (item, index) => {
    dispatch(podcastActions.artistPlaylistsRequest({id: item?.id, page: 1}));
    navigation.navigate(rootNames.PODCASTER_PLAYLIST);
  };

  return (
    <View style={styles.container}>
      <AuthorList
        AuthorListData={data}
        onItemClick={goToPodcastersPlaylist}
        loadMore={loadMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Podcasters;
