import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../common/colorConstants';
import {size} from '../common/constants';
import {PodcastContext} from '../context/PodcastContext';

const PodcastEpisodeListitem = ({
  item,
  index,
  onPodcastClick,
  fullData,
  playOrPauseClick,
}) => {
  const playIcon = 'arrow-right-drop-circle';
  const pauseIcon = 'pause-circle';
  const {onPlayAudio, pausePlayer, onResumeAudio, currentSong, isPlaying} =
    useContext(PodcastContext);
  const getIcon = () => {
    if (item?.id == currentSong?.id && isPlaying) {
      return pauseIcon;
    } else {
      return playIcon;
    }
  };

  const onPlayClick = (item, index) => {
    const songs = fullData;
    if (songs) {
      onPlayAudio({songs, index});
    }
  };

  const onPauseClick = (item, index) => {
    pausePlayer();
  };

  const onResumeClick = (item, index) => {
    onResumeAudio(item);
  };

  const togglePlayer = () => {
    console.log('toggleplayer');

    if (item?.id == currentSong?.id && isPlaying) {
      onPauseClick(item, index);
    } else if (item?.id == currentSong?.id && !isPlaying) {
      onResumeClick(item, index);
    } else {
      console.log('onplayclick');

      onPlayClick(item, index);
    }

    if (playOrPauseClick) {
      playOrPauseClick(item, index);
    }
  };
  return (
    <View style={style.flatListContainer}>
      <View style={style.leftSideContainer}>
        <TouchableOpacity onPress={() => onPodcastClick(item, index)}>
          {/* <Text style={style.episodeAndTime}>{`Episode ${index}`}</Text> */}

          <Text style={style.podcastTitleText}>{item?.name}</Text>
          <Text style={style.podcastDescriptionText} numberOfLines={3}>
            {item?.description}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={style.rightSideContainer}>
        <TouchableOpacity
          style={style.iconStyle}
          onPress={() => togglePlayer()}>
          <MaterialCommunityIcons
            name={getIcon()}
            size={40}
            color={colors.appTheme}
          />
        </TouchableOpacity>
        <Text style={style.durationText}>{item.duration} min</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  flatListContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.secondaryText,
    marginVertical: 10,
    borderRadius: 10,
    // backgroundColor:'yellow'
  },
  leftSideContainer: {
    width: '85%',
    flexDirection: 'column',
    paddingVertical: 10,
    // backgroundColor: 'red'
  },
  rightSideContainer: {
    width: '15%',
    alignSelf: 'center',
    // backgroundColor: 'green'
  },
  podcastTitleText: {
    fontSize: size.md,
    color: colors.primaryText,
    fontWeight: '700',
  },
  podcastDescriptionText: {
    color: colors.primaryText,
    textAlign: 'justify',
    fontSize: size.sm,
  },
  durationText: {
    fontSize: size.sm,
    alignSelf: 'center',
  },
  iconStyle: {
    alignSelf: 'center',
  },
  episodeAndTime: {
    // flexDirection: 'row'
    color: colors.secondaryText,
    fontSize: size.sm,
  },
});
export default PodcastEpisodeListitem;
