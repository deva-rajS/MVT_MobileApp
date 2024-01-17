import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View,  StyleSheet} from 'react-native';

import constants from '../../../common/constants';
import PlaylistSelection from '../../../commonLayouts/PlaylistSelection';

const PodcastPlaylistSelection = () => {
  const navigation = useNavigation();
  const getDummyData = () => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        id: i,
        title: 'Podcast' + i,
      });
    }
    return arr;
  };
  const [dummyData, SetDummyData] = useState(getDummyData());

  const onClickPlaylist = (item, index) => {
    let renderData = [...dummyData];
    for (let data of renderData) {
      if (data.id == item.id) {
        data.selected = data.selected ? false : true;
        break;
      }
    }
    SetDummyData([...renderData]);
  };

  const onFloatingButtonClicked = () => {
    navigation.navigate(constants.rootNames.PODCAST_PLAYLIST_CREATION);
    console.log('floating button clicked');
  };

  return (
    <View style={styles.container}>
      <PlaylistSelection
        playlistData={dummyData}
        onClickPlaylist={onClickPlaylist}
        onFloatingButtonClicked={onFloatingButtonClicked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default PodcastPlaylistSelection;
