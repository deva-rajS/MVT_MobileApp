import React from 'react';
import {View, StyleSheet} from 'react-native';

import PlaylistCreation from '../../../commonLayouts/PlaylistCreation';

const PodcastPlaylistCreation = () => {
  return (
    <View style={styles.container}>
      <PlaylistCreation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default PodcastPlaylistCreation;
