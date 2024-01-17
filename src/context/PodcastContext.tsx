import React, {useState, createContext, useRef, useEffect} from 'react';
import {Platform} from 'react-native';
import MusicControl, {Command} from 'react-native-music-control';
import RNTimer from 'react-native-timer';
import {PodcastPlayer} from '../player/Player';
// import { useDispatch } from 'react-redux';
// import { Podcast } from '../model/podcast';
// import { actions } from '../reducers/podcast';
// import images from '../v2/src/common/images';
// import { PodcastPlayer } from '../v2/src/screens/podcast/player/Player';

interface Song {
  audioUrl: string;
  description: string;
  duration: string;
  id: number;
  podcastTitle: string;
}

interface InitialProps {
  songs: any[]; //Podcast[];
  index: number;
}

interface Props {
  onPlayAudio: (props: InitialProps) => void;
  pausePlayer: () => void;
  currentSong: any;
  isPlaying: boolean;
  onResumeAudio: (song?) => void;
  currentSongIndex: number;
  currentDuration: number;
  currentTime: number;
  onSeek: (value: number) => void;
  resumePlayer: (value: number) => void;
  previousSong: () => void;
  nextSong: () => void;
  loading: boolean;
  totalSongs: number | undefined;
}

export const PodcastContext = createContext<Props>(null);

export const PodcastProvider = ({children}) => {
  const timer = useRef(null);
  // const dispatch = useDispatch();
  const playerRef = useRef(new PodcastPlayer());
  const playerStateRef = useRef(null);
  const player = playerRef.current;
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    currentTime: 0,
    playlist: [],
    currentSong: null,
    currentSongIndex: null,
    currentDuration: 0,
    loading: false,
  });

  playerStateRef.current = playerState;
  const {
    isPlaying,
    currentTime,
    playlist,
    currentSong,
    currentSongIndex,
    currentDuration,
    loading,
  } = playerStateRef.current;

  useEffect(() => {
    if (player) {
      player.updateMouteState(true);
    }
    return () => {
      player.releaseSound();
      player.updateMouteState(false);
    };
  }, []);

  // useEffect(() => {
  //   dispatch(actions.currentSongIndex(currentSongIndex));
  // }, [currentSongIndex]);

  const getCurrentTime = (duration: number) => {
    timer.current = RNTimer.setInterval(
      'currentTime',
      () => {
        if (player && player.checkLoaded()) {
          player.getCurrentTime().then(async seconds => {
            const isEnd = player.audioEnd();
            if (seconds === 0 && isEnd) {
              if (
                playlist.length > 1 &&
                currentSongIndex < playlist.length - 1
              ) {
                const index = currentSongIndex + 1;
                setPlayerState(s => ({...s, currentTime: duration}));
                await playSong({selectedSong: playlist[index], index});
              } else {
                setTimeout(() => {
                  pauseMC();
                  setPlayerState(s => ({
                    ...s,
                    currentTime: 0,
                    isPlaying: false,
                  }));
                }, 1000);
              }
            } else {
              // setCurrentTime(seconds);
              setPlayerState(s => ({
                ...s,
                currentTime: seconds,
              }));
            }
          });
        }
      },
      1000,
    );
  };

  useEffect(() => {
    if (isPlaying) {
      getCurrentTime(currentDuration);
    }
    return () => {
      if (RNTimer.intervalExists('currentTime')) {
        RNTimer.clearInterval('currentTime');
      }
    };
  }, [isPlaying, playlist, currentDuration, currentSongIndex]);

  const onResumeAudio = (song?) => {
    player.onResume(song?.audio);
    setPlayerState(s => ({
      ...s,
      isPlaying: true,
    }));
  };

  const playMC = () => {
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING,
    });
  };

  const pauseMC = () => {
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED,
    });
  };

  const playRemoteControl = () => {
    if (!playerStateRef.current.loading) {
      onResumeAudio();
      playMC();
    }
  };
  const pauseRemoteControl = () => {
    if (!playerStateRef.current.loading) {
      pausePlayer();
      pauseMC();
    }
  };
  const nextRemoteControl = () => {
    nextSong();
  };
  const previousRemoteControl = () => {
    previousSong();
  };

  useEffect(() => {
    if (player) {
      // console.log('player loadeed for cmd');
      if (Platform.OS === 'ios') {
        MusicControl.handleAudioInterruptions(true);
      }
      MusicControl.enableBackgroundMode(true);
      MusicControl.on(Command.play, () => {
        playRemoteControl();
      });
      MusicControl.on(Command.pause, () => {
        pauseRemoteControl();
      });

      MusicControl.on(Command.nextTrack, () => {
        nextRemoteControl();
      });

      MusicControl.on(Command.previousTrack, () => {
        previousRemoteControl();
      });
    }
  }, []);

  const playSong = async ({selectedSong, index}) => {
    // console.log('song', selectedSong, index);
    const url = selectedSong.audio;
    const artwork =
      selectedSong.playlistThumbnail?.length > 0
        ? selectedSong.playlistThumbnail
        : 'https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80';
    MusicControl.setNowPlaying({
      title: selectedSong?.name || '',
      artwork, // URL or RN's image require()
      artist: `Episode ${selectedSong?.episode_number || ''}`,
      album: selectedSong?.categoryName || '',
    });
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('previousTrack', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('closeNotification', true, {when: 'paused'});
    pauseMC();
    setPlayerState(s => ({
      ...s,
      currentSong: selectedSong,
      currentSongIndex: index,
      isPlaying: false,
      loading: true,
      currentTime: 0,
      currentDuration: 0,
    }));
    const {playing, duration} = await player.onPlayPress(url, '');
    getCurrentTime(duration);
    setPlayerState(s => ({
      ...s,
      currentDuration: duration,
      currentTime: 0,
      isPlaying: playing,
      loading: false,
    }));
    playMC();
  };

  const onPlayAudio = async ({songs, index}: InitialProps) => {
    // console.log('onplay', songs, index);
    const selectedSong = songs[index];
    setPlayerState(s => ({
      ...s,
      playlist: songs,
      currentTime: 0,
      currentDuration: 0,
    }));
    await playSong({selectedSong, index});
  };

  const pausePlayer = () => {
    player.onPlayingPausePress();
    setPlayerState(s => ({
      ...s,
      isPlaying: false,
    }));
  };

  const onSeek = (value: number) => {
    const seconds = value * currentDuration;
    setPlayerState(s => ({
      ...s,
      currentTime: seconds,
    }));
  };

  const resumePlayer = (v: number) => {
    onResumeAudio();
    player.seekTo(v * currentDuration);
  };

  const clearPlayer = () => {
    setPlayerState(s => ({
      ...s,
      currentDuration: 0,
      currentTime: 0,
    }));
  };

  const previousSong = async () => {
    const index = playerStateRef.current.currentSongIndex;
    const pl = playerStateRef.current.playlist;
    if (index > 0) {
      clearPlayer();
      const pindex = index - 1;
      await playSong({selectedSong: pl[pindex], index: pindex});
    }
  };

  const nextSong = async () => {
    const index = playerStateRef.current.currentSongIndex;
    const plLength = playerStateRef.current.playlist.length - 1;
    if (index < plLength) {
      clearPlayer();
      const nindex = index + 1;
      await playSong({
        selectedSong: playerStateRef.current.playlist[nindex],
        index: nindex,
      });
    }
  };

  return (
    <PodcastContext.Provider
      value={{
        onPlayAudio,
        pausePlayer: pauseRemoteControl,
        onResumeAudio: playRemoteControl,
        currentSong,
        isPlaying,
        currentSongIndex,
        currentTime,
        currentDuration,
        onSeek,
        resumePlayer,
        previousSong,
        nextSong,
        loading,
        totalSongs: playlist?.length,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};
