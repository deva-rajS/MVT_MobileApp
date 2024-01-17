import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {rootNames} from '../../../common/constants';
import Playlist from '../../../commonLayouts/Playlist';

const MusicAlbumList = () => {
  const navigation = useNavigation();
  const getDummyData = () => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        title: 'Podcast' + i,
      });
    }

    return arr;
  };

  const onItemClick = () => {
    navigation.navigate(rootNames.MUSIC_LIST);
  };

  return (
    <View style={styles.container}>
      <Playlist
        playlistData={getDummyData()}
        onItemClick={(item, index) => onItemClick()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MusicAlbumList;
