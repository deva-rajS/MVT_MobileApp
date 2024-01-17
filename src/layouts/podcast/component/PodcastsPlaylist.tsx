import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rootNames} from '../../../common/constants';
import GridView from '../../../commonLayouts/GridView';
import {PlaylistItem} from '../../../modal/podcast';
import {actions, playlistsSelector} from '../../../reducers/podcast';

const PodcastsPlaylist = () => {
  const dispatch = useDispatch();
  const PlaylistsData = useSelector(playlistsSelector);
  // const fetching = useSelector(listFetchingSelector);
  const navigation = useNavigation();
  const [data, setData] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    console.log('PlaylistsData', PlaylistsData);

    if (PlaylistsData) {
      setData(PlaylistsData.playlists);
    }
  }, [PlaylistsData]);

  const loadMore = () => {
    // if (PlaylistsData?.current_page < PlaylistsData?.total_pages) {
    //   dispatch(
    //     actions.playlistsRequest({
    //       page: PlaylistsData?.current_page + 1,
    //     }),
    //   );
    // }
  };

  const filterData = () => {
    const finalData = data.filter((value, index) => {
      return value.thumbnail;
    });
    return finalData;
  };
  const goToPodcastDetailPage = (item, index) => {
    dispatch(actions.singlePlaylistRequest({...item, page: 1}));
    navigation.navigate(rootNames.PODCASTS_DETAIL);
  };

  return (
    <View style={styles.container}>
      <GridView
        gridViewData={filterData()}
        onGridItemPress={goToPodcastDetailPage}
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

export default PodcastsPlaylist;
