import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../common/colorConstants';
import {hp, size, wp} from '../common/constants';

const PlaylistSelection = ({
  playlistData,
  onClickPlaylist,
  onFloatingButtonClicked,
}) => {
  //   const getDummyData = () => {
  //     let arr = [];
  //     for (let i = 0; i < 20; i++) {
  //       arr.push({
  //         title: 'Podcast' + i,
  //       });
  //     }

  //     return arr;
  //   };

  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.browseByItemCon}
        onPress={() => onClickPlaylist(item, index)}
      >
        <View style={styles.browseByLeftCon}>
          <Text style={styles.browseByItemText}>{item.title}</Text>
        </View>
        <View style={styles.browseByRightCon}>
          {item.selected && (
            <MaterialCommunityIcons
              name={'check'} // minus-circle
              color={colors.appTheme}
              size={hp(4)}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: wp(15),
          backgroundColor: colors.appBackgroundColor,
          flexDirection: 'row',
          paddingHorizontal: 13,

          //   marginTop: 10
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{color: colors.appTheme}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{color: colors.appTheme}}>Okey</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          data={playlistData}
          keyExtractor={item => item.title}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.floatingButtonContainer}
          onPress={onFloatingButtonClicked}
        >
          <MaterialCommunityIcons
            name={'plus'} // minus-circle
            color={colors.whiteColor}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
    paddingHorizontal: 15,
  },
  browseByItemCon: {
    // marginTop: 15,
    // paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    height: hp(6),
  },
  browseByLeftCon: {width: '80%'},
  browseByItemText: {fontSize: size.medium, color: colors.primaryTextColor},
  browseByRightCon: {
    width: '20%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 13,
    right: 13,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appTheme,
    borderRadius: 30,
  },
});
export default PlaylistSelection;
