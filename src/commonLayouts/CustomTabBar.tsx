import React, {useContext} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../common/colorConstants';
import {rootNames, rw} from '../common/constants';
import {PodcastContext} from '../context/PodcastContext';
import AudioMiniPlayer from './AudioMiniPlayer';

const CustomTarBar = ({state, descriptors, navigation}) => {
  const {currentSong} = useContext(PodcastContext);

  const getImageName = currentRootName => {
    switch (currentRootName) {
      case rootNames.PODCASTS_STACK:
        return 'podcast';
      case rootNames.MUSIC_STACK:
        return 'playlist-music-outline';
      case rootNames.FAVOURITE:
        return 'heart';
      case rootNames.READERS:
        return 'menu-book';
    }
  };
  // console.log('currenSong', currentSong);

  return (
    <View>
      {currentSong ? <AudioMiniPlayer /> : null}

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.appBackground,
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, margin: 5, alignItems: 'center'}}>
              {React.createElement(
                route.name === rootNames.READERS
                  ? MaterialIcons
                  : MaterialCommunityIcons,
                {
                  name: getImageName(route.name),
                  color: isFocused ? colors.appTheme : colors.secondaryText,
                  size: rw(30),
                },
              )}
              <Text
                style={{
                  color: isFocused ? colors.menuHighlight : colors.menuNormal,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTarBar;
