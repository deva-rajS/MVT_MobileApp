import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rootNames} from '../../../common/constants';
import GridView from '../../../commonLayouts/GridView';
import {playlistsSelector} from '../../../reducers/podcast';
import {actions as podcastActions} from '../../../reducers/podcast';

const PodcastersPlaylist = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const podcastersPlaylistsData = useSelector(playlistsSelector);
  const dummyData = () => {
    let data = [];
    for (let i = 1; i < 20; i++) {
      if (i % 2 == 0) {
        data.push({
          id: i,
          image:
            'https://st2.depositphotos.com/1105977/5461/i/950/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg',
          title: 'Title' + i,
          subTitle: 'subTitle' + i,
        });
      } else {
        data.push({
          id: i,
          image:
            'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
          title: 'Title' + i,
          subTitle: 'subTitle' + i,
        });
      }
    }

    return data;
  };

  const loadMore = () => {};

  const goToPodcastDetailPage = (item, index) => {
    dispatch(podcastActions.singlePlaylistRequest({...item, page: 1}));
    navigation.navigate(rootNames.PODCASTS_DETAIL);
  };

  return (
    <View style={styles.container}>
      <GridView
        gridViewData={podcastersPlaylistsData?.podcasts}
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

export default PodcastersPlaylist;
