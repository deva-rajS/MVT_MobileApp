import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rootNames} from '../../../common/constants';
import Playlist from '../../../commonLayouts/Playlist';
import {Category} from '../../../modal/podcast';
import {categoriesSelector} from '../../../reducers/podcast';

const PodcastCategorieList = () => {
  const categoryData = useSelector(categoriesSelector);
  const dispatch = useDispatch();
  const [data, setData] = useState<Category[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    if (categoryData) {
      setData(categoryData.categories);
    }
  }, [categoryData]);

  const onItemClick = (item, index) => {
    console.log('podcast categorieList', item);

    // dispatch(actions.categoryPlaylistRequest({ id: item.id, page: 1 }));
    navigation.navigate(rootNames.PODCAST_LIST, {...item});
  };

  return (
    <View style={styles.container}>
      <Playlist playlistData={data} onItemClick={onItemClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default PodcastCategorieList;
