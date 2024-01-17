import React, {useContext, useRef, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from 'react-native-slider';
import RBSheet from 'react-native-raw-bottom-sheet';
import {hp, size} from '../common/constants';
import {useNavigation} from '@react-navigation/native';
import colors from '../common/colorConstants';
import {PodcastContext} from '../context/PodcastContext';
import {secondsToString} from '../common/utils';

const AudioMiniPlayer = () => {
  const BSRef = useRef();
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [favourite, setFavourite] = useState(false);

  const navigation = useNavigation();

  const {
    isPlaying,
    currentSong,
    pausePlayer,
    onResumeAudio,
    currentDuration,
    currentTime,
    onSeek,
    resumePlayer,
    previousSong,
    nextSong,
    loading,
    currentSongIndex,
    totalSongs,
  } = useContext(PodcastContext);
  const getIcon = () => {
    if (!isPlaying) {
      return 'play-circle';
    } else {
      return 'pause-circle';
    }
  };

  const playerToggle = () => {
    if (isPlaying) {
      pausePlayer();
    } else {
      onResumeAudio(currentSong);
    }
  };

  const sliderValue =
    currentDuration > 0 && currentTime > 0 ? currentTime / currentDuration : 0;

  const playsHolder =
    'https://media.istockphoto.com/vectors/podcast-concept-thin-line-icon-abstract-icon-abstract-gradient-vector-id1283532997?k=20&m=1283532997&s=612x612&w=0&h=SPHa5xP_fZmU9tOw-6dTR8lDm04sTRgupK6jn_COKus=';
  return (
    <>
      <View style={styles.audioMiniPlayerContainer}>
        <View style={styles.leftImageContainer}>
          <Image
            style={styles.leftImageStyle}
            source={{
              uri: currentSong?.thumbnail || playsHolder,
            }}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          style={styles.infoContainer}
          onPress={() => BSRef.current.open()}>
          <Text style={styles.title} numberOfLines={1}>
            {currentSong?.name || ''}
          </Text>
          <Text style={styles.timer}>
            {`${secondsToString(currentTime)}/${secondsToString(
              currentDuration,
            )}`}{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playImageContainer}
          onPress={playerToggle}>
          <MaterialCommunityIcons
            name={getIcon()}
            color={colors.appTheme}
            size={40}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.seekBarContainer}>
        <View style={styles.seekBarStyle} />
      </View>

      <RBSheet
        ref={BSRef}
        height={hp(70)}
        openDuration={250}
        closeOnDragDown={true}
        // customStyles={{
        //   container: {
        //     justifyContent: "center",
        //     alignItems: "center"
        //   }
        // }}
      >
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 0.7,
              // backgroundColor: 'grey',
              alignItems: 'center',
              // justifyContent: 'center',
            }}>
            <View style={{width: '80%', height: '40%', alignItems: 'center'}}>
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 10,
                  marginTop: 10,
                }}
                source={{
                  uri: currentSong?.thumbnail || playsHolder,
                }}
              />
            </View>
            <View
              style={{
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'red',
                height: '60%',
              }}>
              <Text
                style={{
                  fontSize: size.lg,
                  fontWeight: 'bold',
                  color: colors.primaryText,
                  marginTop: 15,
                }}>
                {currentSong?.podcastTitle || ''}
              </Text>
              <ScrollView style={{width: '100%', height: '80%', marginTop: 10}}>
                <Text style={{color: colors.secondaryText}}>
                  {currentSong?.description || ''}
                </Text>
              </ScrollView>
            </View>
          </View>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Slider
                value={sliderValue}
                onValueChange={onSeek}
                style={{width: '80%'}}
                thumbStyle={{backgroundColor: colors.appTheme}}
                // trackStyle = {{backgroundColor: colors.appTheme}}
                minimumTrackTintColor={colors.appTheme}
              />
              <View
                style={{
                  width: '80%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>{secondsToString(currentTime)}</Text>
                <Text>{secondsToString(currentDuration)}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: 10,
              }}>
              {/* <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      constants.rootNames.PODCAST_PLAYLIST_SELECTION,
                    )
                  }>
                  <MaterialCommunityIcons
                    name="expand-all"
                    color={colors.appTheme}
                    size={30}
                  />
                </TouchableOpacity> */}
              <TouchableOpacity onPress={previousSong}>
                <MaterialCommunityIcons
                  name="skip-previous"
                  color={colors.appTheme}
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={playerToggle}>
                <MaterialCommunityIcons
                  name={getIcon()}
                  color={colors.appTheme}
                  size={50}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={nextSong}>
                <MaterialCommunityIcons
                  name="skip-next"
                  color={colors.appTheme}
                  size={40}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => setFavourite(!favourite)}>
                <MaterialCommunityIcons name="bookmark" color={favourite ? colors.appTheme : colors.secondaryTextColor} size={30} />
                </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    // height: 60,
    flexDirection: 'column',
  },
  audioMiniPlayerContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  leftImageContainer: {
    width: '22%',
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
  leftImageStyle: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
  title: {
    color: colors.primaryText,
  },
  timer: {
    color: colors.secondaryText,
  },
  infoContainer: {
    width: '58%',
    justifyContent: 'center',
    paddingRight: 20,
    // backgroundColor: 'green'
  },
  playImageContainer: {
    width: '20%',
    // backgroundColor: 'blue',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 15,
    paddingTop: 5,
  },
  playImageStyle: {
    width: '50%',
    height: '50%',
    // backgroundColor: 'red',

    // backgroundColor: 'red'
  },
  seekBarContainer: {
    width: '100%',
    height: 5,
    flexDirection: 'row',
  },
  seekBarStyle: {
    height: 5,
  },
  modalStyle: {margin: 0, justifyContent: 'flex-end'},
  modalContainer: {
    backgroundColor: 'white',
    height: '90%',
    marginBottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  modalScrollViewContainer: {flex: 1, width: '100%', height: '100%'},
  scrollViewStyle: {
    alignItems: 'center',
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  bottomSheetLine: {
    width: 70,
    height: 5,
    backgroundColor: 'grey',
    borderRadius: 20,
    marginTop: 20,
  },
  playerImageStyle: {width: 200, height: 200, alignItems: 'center'},
  subTitle: {},
  playerTitle: {},
  playerDescription: {},
});

export default AudioMiniPlayer;
