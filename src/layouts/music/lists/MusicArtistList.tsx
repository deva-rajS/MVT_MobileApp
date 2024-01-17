import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {rootNames} from '../../../common/constants';
import AuthorList from '../../../commonLayouts/AuthorList';

const MusicArtistList = () => {
  const navigation = useNavigation();
  const getDummyData = () => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        title: 'Podcast' + i,
        image:
          (i + 1) % 2 == 0
            ? 'https://farm2.staticflickr.com/1090/4595137268_0e3f2b9aa7_z_d.jpg'
            : 'https://i.imgur.com/OnwEDW3.jpg',
      });
    }
    return arr;
  };

  return (
    <View style={styles.container}>
      <AuthorList
        AuthorListData={getDummyData()}
        onItemClick={(item, index) => navigation.navigate(rootNames.MUSIC_LIST)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MusicArtistList;
