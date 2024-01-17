import React from 'react';
import {View, StyleSheet} from 'react-native';

import Playlist from '../../../commonLayouts/Playlist';

const MusicBrowseList = () => {
  const getDummyData = () => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        title: 'Podcast' + i,
      });
    }

    return arr;
  };

  return (
    <View style={styles.container}>
      <Playlist playlistData={getDummyData()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MusicBrowseList;
