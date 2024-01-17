import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import constants from '../../../common/constants';
import GridView from '../../../commonLayouts/GridView';
import {PlaylistItem} from '../../../modal/podcast';
import {
  actions as podcastActions,
  categoryPlaylistSelector,
} from '../../../reducers/podcast';

const PodcastList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const categoryPlaylist = useSelector(categoryPlaylistSelector);
  const [categoryPlaylistData, setCategoryPlaylistData] = useState<
    PlaylistItem[]
  >([]);
  const params = useRoute().params as any;
  const {id, name, podcasts: firstPlaylists} = params;
  // const { loading } = useLoader({ requesting: fetching });

  useEffect(() => {
    setCategoryPlaylistData(
      categoryPlaylist === null ? firstPlaylists : categoryPlaylist.podcasts,
    );
    console.log('firstPlaylists', categoryPlaylist);
    // if (categoryPlaylist) {
    //   setCategoryPlaylistData(categoryPlaylist.playlists);
    // }
  }, [categoryPlaylist]);

  useEffect(() => {
    if (id) {
      dispatch(podcastActions.categoryPlaylistRequest({id, page: 1}));
    }
    return () => {
      dispatch(podcastActions.clearCategoryPlaylist);
    };
  }, []);

  const loadMore = () => {
    console.log('load more');

    if (categoryPlaylist?.current_page < categoryPlaylist?.total_pages) {
      dispatch(
        podcastActions.categoryPlaylistRequest({
          id,
          page: categoryPlaylist?.current_page + 1,
        }),
      );
    }
  };

  useEffect(() => {
    if (categoryPlaylist) {
      setCategoryPlaylistData(categoryPlaylist.podcasts);
    }
  }, [categoryPlaylist]);

  const goToPodcastDetailPage = (item, index) => {
    dispatch(podcastActions.singlePlaylistRequest({...item, page: 1}));
    navigation.navigate(constants.rootNames.PODCASTS_DETAIL);
  };

  return (
    <View style={styles.container}>
      <GridView
        gridViewData={categoryPlaylistData}
        onGridItemPress={goToPodcastDetailPage}
        loadMore={loadMore}
        headerName={name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PodcastList;
