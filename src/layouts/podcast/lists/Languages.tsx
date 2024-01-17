import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rootNames} from '../../../common/constants';
import Playlist from '../../../commonLayouts/Playlist';
import {Language} from '../../../modal/podcast';
import {actions, languageSelector} from '../../../reducers/podcast';

const PodcastLanguageList = () => {
  const dispatch = useDispatch();
  const podcastLanguageData = useSelector(languageSelector);
  // const fetching = useSelector(listFetchingSelector);

  const [podcastLanguage, setPodcastLanguage] = useState<Language[]>([]);
  // const { loading } = useLoader({ requesting: fetching });
  const navigation = useNavigation();

  useEffect(() => {
    console.log('podcastLanguageData.languages', podcastLanguageData);

    if (podcastLanguageData) {
      setPodcastLanguage(podcastLanguageData.languages);
    }
  }, [podcastLanguageData]);

  const onItemClick = (item, index) => {
    dispatch(actions.LanguageCategoriesRequest({id: item?.id, page: 1}));
    navigation.navigate(rootNames.PODCAST_CATEGORIES_LIST);
  };

  return (
    <View style={styles.container}>
      <Playlist playlistData={podcastLanguage} onItemClick={onItemClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default PodcastLanguageList;
