import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../common/colorConstants';
import constants from '../../common/constants';
import GridView from '../../commonLayouts/GridView';
import {actions, playlistsSelector} from '../../reducers/podcast';

const PodcastFavourite = ({route, navigation}) => {
  const dispatch = useDispatch();
  const podcastersPlaylistsData = useSelector(playlistsSelector);
  console.log('inside', podcastersPlaylistsData);
  useEffect(() => {
    dispatch(actions.playlistsRequest({page: 1}));
  }, []);

  const goToPodcastDetailPage = (item, index) => {
    dispatch(actions.singlePlaylistRequest({...item, page: 1}));
    navigation.navigate(constants.rootNames.PODCAST_FAVORITE_DETAIL_SCREEN, {
      currentIndex: index,
    });
  };

  return (
    <View style={styles.container}>
      <GridView
        gridViewData={podcastersPlaylistsData?.podcasts?.filter(
          (item, index) => item.thumbnail != '',
        )}
        onGridItemPress={goToPodcastDetailPage}
        loadMore={() => console.log('load')}
        headerName={'header'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
});
export default PodcastFavourite;
