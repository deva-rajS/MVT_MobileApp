import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TextInput, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import colors from '../common/colorConstants';
import constants, {wp} from '../common/constants';

const PlaylistCreation = () => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: wp(15),
          backgroundColor: colors.appBackground,
          flexDirection: 'row',
          paddingHorizontal: 13,

          //   marginTop: 10
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{color: colors.appTheme}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(constants.rootNames.PODCASTS)}
        >
          <Text style={{color: colors.appTheme}}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          style={{
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: colors.secondaryText,
            marginVertical: 15,
          }}
          placeholder="Playlist Name"
          placeholderTextColor={colors.secondaryText}
        />

        <TextInput
          style={{
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: colors.secondaryText,
          }}
          placeholder="Description"
          placeholderTextColor={colors.secondaryText}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingHorizontal: 15,
  },
});
export default PlaylistCreation;
