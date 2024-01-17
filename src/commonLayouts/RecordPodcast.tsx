import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, useEffect, useRef, useState} from 'react';
import colors from '../common/colorConstants';

import Button from '../commonLayouts/Button';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

import Sound from 'react-native-sound';

// Enable playback in silence mode
Sound.setCategory('Playback', false);

interface State {
  isLoggingIn: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
  isRecording: boolean;
  isRecordingPaused: boolean;
  isPlayerPlaying: boolean;
  isPlayerPaused: boolean;
  documentPickerResponse:
    | Array<DocumentPickerResponse>
    | DirectoryPickerResponse
    | undefined
    | null;
}

const screenWidth = Dimensions.get('screen').width;

const RecordPodcast = () => {
  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: 'hello.m4a',
    android: `${dirs.CacheDir}/hello.mp3`,
  });
  const [state, setState] = useState({
    isLoggingIn: false,
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
    isRecording: false,
    isRecordingPaused: false,
    isPlayerPlaying: false,
    isPlayerPaused: false,
    documentPickerResponse: null,
  });
  const audioRecorder = useRef(new AudioRecorderPlayer());
  const audioRecorderPlayer = audioRecorder.current;
  useEffect(() => {
    audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
  }, []);

  const onClickLocalPlay = async () => {
    // const msg = await audioRecorderPlayer.startPlayer("content://com.android.providers.media.documents/document/audio%3A5008");
    // let audio = new AudioRecorderPlayer();
    // let mes = audio.startPlayer("/data/user/0/com.mvt/cache/sound.mp4",);
    // mes.then((j) => {
    //   console.log('j', j);
    // }).catch((e) => {
    //   console.log('e', e);
    // })
    // const whoosh = new Sound("com.android.providers.media.documents/document/audio%3A5008.aac", '', (error) => {
    //   if (error) {
    //     console.log('failed to load the sound', error);
    //     return;
    //   }
    //   // loaded successfully
    //   console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
    //   // Play the sound with an onEnd callback
    //   whoosh.play((success) => {
    //     if (success) {
    //       console.log('successfully finished playing');
    //     } else {
    //       console.log('playback failed due to audio decoding errors');
    //     }
    //   });
    // } )
  };

  const onUploadLocalClick = () => {
    DocumentPicker.pick({
      type: types.audio,
    })
      .then(result => {
        console.log('resule', result);
      })
      .catch(e => {
        console.log('e', e);
      });
  };

  const onStatusPress = (e: any) => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);
    const playWidth =
      (state.currentPositionSec / state.currentDurationSec) *
      (screenWidth - 56);
    console.log(`currentPlayWidth: ${playWidth}`);

    const currentPosition = Math.round(state.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      audioRecorderPlayer.seekToPlayer(addSecs);
      console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      audioRecorderPlayer.seekToPlayer(subSecs);
      console.log(`subSecs: ${subSecs}`);
    }
  };

  const onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    console.log('audioSet', audioSet);
    //? Custom path
    // const uri = await audioRecorderPlayer.startRecorder(
    //   this.path,
    //   audioSet,
    // );

    //? Default path
    const uri = await audioRecorderPlayer.startRecorder(undefined, audioSet);

    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      console.log('record-back', e);
      setState(o => ({
        ...o,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      }));
    });
    console.log(`uri: ${uri}`);
    setState(o => ({...o, isRecording: true}));
  };

  const onPauseRecord = async () => {
    try {
      await audioRecorderPlayer.pauseRecorder();
      setState(o => ({
        ...o,
        isRecordingPaused: true,
      }));
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  const onResumeRecord = async () => {
    await audioRecorderPlayer.resumeRecorder();
    setState(o => ({
      ...o,
      isRecordingPaused: false,
      isRecording: true,
    }));
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setState(o => ({
      ...o,
      recordSecs: 0,
      isRecording: false,
      isRecordingPaused: false,
    }));
    console.log(result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    //? Custom path
    // const msg = await audioRecorderPlayer.startPlayer(this.path);

    //? Default path
    const msg = await audioRecorderPlayer.startPlayer();
    const volume = await audioRecorderPlayer.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);

    audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      setState(o => ({
        ...o,
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      }));
      if (e.currentPosition == e.duration) {
        onStopPlay();
      }
    });

    setState(o => ({...o, isPlayerPlaying: true}));
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
    setState(o => ({...o, isPlayerPaused: true}));
  };

  const onResumePlay = async () => {
    await audioRecorderPlayer.resumePlayer();
    setState(o => ({...o, isPlayerPlaying: true, isPlayerPaused: false}));
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setState(o => ({
      ...o,
      isPlayerPlaying: false,
      isPlayerPaused: false,
      currentPositionSec: 0,
      playTime: '00:00:00',
    }));
  };

  let playWidth = (state.currentPositionSec / state.currentDurationSec) * 250;

  if (!playWidth) {
    playWidth = 0;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titleTxt}>Audio Recorder Player</Text>
        <Text style={styles.txtRecordCounter}>{state.recordTime}</Text>
        <View style={styles.viewRecorder}>
          <View style={styles.recordBtnWrapper}>
            <Button
              buttonStyle={buttonStyle}
              onPress={onStartRecord}
              isDisabled={state.isRecording || state.isRecordingPaused}
            >
              Record
            </Button>
            <Button
              buttonStyle={buttonStyle}
              onPress={onPauseRecord}
              isDisabled={!state.isRecording || state.isRecordingPaused}
            >
              Pause
            </Button>
            <Button
              buttonStyle={buttonStyle}
              onPress={onResumeRecord}
              isDisabled={!state.isRecording || !state.isRecordingPaused}
            >
              Resume
            </Button>
            <Button
              buttonStyle={buttonStyle}
              onPress={onStopRecord}
              isDisabled={!state.isRecording}
            >
              Stop
            </Button>
          </View>
        </View>
        <View style={styles.viewPlayer}>
          <TouchableOpacity
            style={styles.viewBarWrapper}
            onPress={onStatusPress}
          >
            <View style={styles.viewBar}>
              <View style={[styles.viewBarPlay, {width: playWidth}]} />
            </View>
          </TouchableOpacity>
          <Text style={styles.txtCounter}>
            {state.playTime} / {state.duration}
          </Text>
          <View style={styles.playBtnWrapper}>
            <Button
              buttonStyle={buttonStyle}
              onPress={onStartPlay}
              isDisabled={
                state.isPlayerPlaying ||
                state.isPlayerPaused ||
                state.isRecording
              }
            >
              Play
            </Button>
            <Button
              buttonStyle={buttonStyle}
              onPress={onPausePlay}
              isDisabled={
                !state.isPlayerPlaying ||
                state.isPlayerPaused ||
                state.isRecording
              }
            >
              Pause
            </Button>
            <Button
              buttonStyle={buttonStyle}
              onPress={onResumePlay}
              isDisabled={
                !state.isPlayerPlaying ||
                !state.isPlayerPaused ||
                state.isRecording
              }
            >
              Resume
            </Button>
            <Button
              buttonStyle={buttonStyle}
              onPress={onStopPlay}
              isDisabled={!state.isPlayerPlaying || state.isRecording}
            >
              Stop
            </Button>
          </View>
        </View>
        <View>
          <Button buttonStyle={UploadButton} onPress={() => {}}>
            Upload
          </Button>
          <View style={styles.orTextCon}>
            <Text style={styles.orText}>OR</Text>
          </View>

          <Button buttonStyle={UploadLocalButton} onPress={onUploadLocalClick}>
            Upload from local
          </Button>

          <Button buttonStyle={UploadLocalButton} onPress={onClickLocalPlay}>
            local play
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordPodcast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleTxt: {
    marginTop: 10,
    color: colors.primaryText,
    fontSize: 28,
    textAlign: 'center',
  },
  viewRecorder: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  recordBtnWrapper: {
    flexDirection: 'row',
  },
  viewPlayer: {
    marginTop: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: 20,
    marginHorizontal: 28,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: colors.lightGrey,
    height: 4,
    width: 250,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: colors.appTheme,
    height: 4,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40,
  },

  txtRecordCounter: {
    marginTop: 32,
    color: colors.primaryText,
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  txtCounter: {
    marginTop: 12,
    color: colors.primaryText,
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  orTextCon: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  orText: {},
});

const buttonStyle = StyleSheet.create({
  btn: {
    backgroundColor: colors.appTheme,
    marginLeft: 12,
  },
  txt: {
    color: colors.white,
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  disabledBtn: {
    backgroundColor: colors.secondaryText,
    marginLeft: 12,
  },
  disabledText: {
    color: colors.white,
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
});
const UploadButton = StyleSheet.create({
  btn: {
    backgroundColor: colors.appTheme,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  txt: {
    color: colors.white,
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  disabledBtn: {
    backgroundColor: colors.secondaryText,
    marginLeft: 12,
  },
  disabledText: {
    color: colors.white,
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
});
const UploadLocalButton = StyleSheet.create({
  btn: {
    backgroundColor: colors.appTheme,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  txt: {
    color: colors.white,
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  disabledBtn: {
    backgroundColor: colors.secondaryText,
    marginLeft: 12,
  },
  disabledText: {
    color: colors.white,
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
});

// import React from 'react';
// import {View, Text, TouchableOpacity, Platform, PermissionsAndroid} from 'react-native';
// import colors from '../common/colorConstants';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';

// const RecordPodcast = () => {

//     const audioRecorderPlayer = new AudioRecorderPlayer();

//    const getPermission =  async () => {
//         if (Platform.OS === 'android') {
//             try{

//             const isWritePermissionGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
//             const isReadPermissionGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
//             const isRecordPermissionGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

//               const grants = await PermissionsAndroid.requestMultiple([
//                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//                 PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//                 PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//               ]);

//               console.log('write external stroage', grants);

//               if (
//                 grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
//                   PermissionsAndroid.RESULTS.GRANTED &&
//                 grants['android.permission.READ_EXTERNAL_STORAGE'] ===
//                   PermissionsAndroid.RESULTS.GRANTED &&
//                 grants['android.permission.RECORD_AUDIO'] ===
//                   PermissionsAndroid.RESULTS.GRANTED
//               ) {
//                  console.log('Permissions granted');
//                  return true;
//               } else {
//                 console.log('All required permissions not granted');
//                 return false;
//               }

//             // console.log('isWritePermissionGranted', isWritePermissionGranted, PermissionsAndroid.RESULTS.DENIED);
//             // const writePermissionGrant = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
//             // if(!isWritePermissionGranted)
//             // {
//             //     const writePermissionGrant = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
//             //     console.log('writePermissionGrant', writePermissionGrant);

//             //     if(writePermissionGrant === PermissionsAndroid.RESULTS.DENIED)
//             //     {
//             //         console.log('writePermissionGrant needed', writePermissionGrant);
//             //         return false;

//             //     } else {
//             //         return true;
//             //     }

//             // }
//             // if(!isReadPermissionGranted)
//             // {
//             //     const isReadPermissionGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
//             //     if(isReadPermissionGranted  === PermissionsAndroid.RESULTS.DENIED)
//             //     {
//             //         console.log('isReadPermissionGranted needed', isReadPermissionGranted);
//             //         return false;

//             //     } else {
//             //         return true;
//             //     }

//             // }
//             // if(!isRecordPermissionGranted)
//             // {
//             //     const isRecordPermissionGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
//             //     if(isRecordPermissionGranted  === PermissionsAndroid.RESULTS.DENIED)
//             //     {
//             //         console.log('writePermissionGrant needed', isRecordPermissionGranted);
//             //         return false;

//             //     }else {
//             //         return true;
//             //     }

//             // }

//             }catch(e) {
//                 console.log('e', e);

//             }

//             // try {
//             //   const grants = await PermissionsAndroid.requestMultiple([
//             //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//             //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//             //     PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//             //   ]);

//             //   console.log('write external stroage', grants);

//             //   if (
//             //     grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
//             //       PermissionsAndroid.RESULTS.GRANTED &&
//             //     grants['android.permission.READ_EXTERNAL_STORAGE'] ===
//             //       PermissionsAndroid.RESULTS.GRANTED &&
//             //     grants['android.permission.RECORD_AUDIO'] ===
//             //       PermissionsAndroid.RESULTS.GRANTED
//             //   ) {
//             //     console.log('Permissions granted');
//             //   } else {
//             //     console.log('All required permissions not granted');
//             //     return;
//             //   }
//             // } catch (err) {
//             //   console.warn(err);
//             //   return;
//             // }
//           }
//     }

//     const onStartRecord = async () => {
//         const result = await audioRecorderPlayer.startRecorder();
//         audioRecorderPlayer.addRecordBackListener((e) => {
//             console.log('audio record', e);

//         //   setState(o => ({...o,
//         //     recordSecs: e.currentPosition,
//         //     recordTime: audioRecorderPlayer.mmssss(
//         //       Math.floor(e.currentPosition),
//         //     ),
//         //   });
//           return;
//         });
//         console.log('start result', result);
//       };

//       const onStartPlay = async () => {
//         console.log('onStartPlay');
//         const msg = await audioRecorderPlayer.startPlayer();
//         console.log(msg);
//         audioRecorderPlayer.addPlayBackListener((e) => {
//           console.log('onstart paly', e);

//         });
//       };

//     const  onPausePlay = async () => {
//         await audioRecorderPlayer.pausePlayer();
//       };

//       const onStopPlay = async () => {
//         console.log('onStopPlay');
//         audioRecorderPlayer.stopPlayer();
//         audioRecorderPlayer.removePlayBackListener();
//       };

//      const onStopRecord = async () => {
//         const result = await audioRecorderPlayer.stopRecorder();
//         audioRecorderPlayer.removeRecordBackListener();

//         console.log('stop result', result);
//       };

//     const onClickRecord = async () => {
//         const grants = await getPermission();
//         if(grants === true)
//         {
//             onStartRecord()
//         }
//         console.log('grants', grants);

//     }

//     const onClickStop = () => {
//         onStopRecord()
//     }

//     return(
//         <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//             <TouchableOpacity style = {{padding: 10, backgroundColor: colors.appTheme, margin: 10 }} onPress = {onClickRecord}>
//                 <Text>
//                     Record
//                 </Text>
//             </TouchableOpacity>
//             <TouchableOpacity style = {{padding: 10, backgroundColor: colors.appTheme, margin: 10 }} onPress = {onClickStop}>
//                 <Text>
//                     stop
//                 </Text>
//             </TouchableOpacity>
//             <TouchableOpacity style = {{padding: 10, backgroundColor: colors.appTheme, margin: 10 }} onPress = {onStartPlay}>
//                 <Text>
//                     play
//                 </Text>
//             </TouchableOpacity>
//             <TouchableOpacity style = {{padding: 10, backgroundColor: colors.appTheme, margin: 10 }} onPress = {onPausePlay}>
//                 <Text>
//                     pause
//                 </Text>
//             </TouchableOpacity>
//             <TouchableOpacity style = {{padding: 10, backgroundColor: colors.appTheme, margin: 10 }} onPress = {onStopPlay}>
//                 <Text>
//                     stop player
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default RecordPodcast;
