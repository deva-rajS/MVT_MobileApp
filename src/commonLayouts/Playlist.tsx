import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../common/colorConstants';
import {size} from '../common/constants';

const Playlist = ({playlistData, onItemClick}) => {
  //   const getDummyData = () => {
  //     let arr = [];
  //     for (let i = 0; i < 20; i++) {
  //       arr.push({
  //         title: 'Podcast' + i,
  //       });
  //     }

  //     return arr;
  //   };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.browseByItemCon}
        onPress={() =>
          onItemClick ? onItemClick(item, index) : console.log('error')
        }
      >
        <View style={styles.browseByLeftCon}>
          <Text style={styles.browseByItemText}>{item.name}</Text>
        </View>
        <View style={styles.browseByRightCon}>
          <MaterialCommunityIcons
            name={'chevron-right'}
            color={colors.secondaryTextColor}
            size={30}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={playlistData}
        keyExtractor={item => item.title}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
    paddingHorizontal: 15,
  },
  browseByItemCon: {
    marginTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  browseByLeftCon: {width: '80%'},
  browseByItemText: {fontSize: size.medium, color: colors.primaryTextColor},
  browseByRightCon: {
    width: '20%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
export default Playlist;
