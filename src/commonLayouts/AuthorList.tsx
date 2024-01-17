import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../common/colorConstants";
import { size } from "../common/constants";
import { images } from "../assets";

const AuthorList = ({ AuthorListData, onItemClick, loadMore }) => {
  const renderItem = ({ item, index }) => {
    console.log(AuthorListData);
    return (
      <TouchableOpacity
        style={styles.podcastersItemCon}
        onPress={() => onItemClick(item, index)}
      >
        <View style={styles.podcasterImageCon}>
          <Image
            style={styles.podcasterImage}
            // source={{ uri: item.thumbnail }}
            source={images.sampleArtist}
            // resizeMode= 'stretch'
          />
        </View>
        <View style={styles.podcastersLeftCon}>
          <Text style={styles.podcastersItemText}>{item.name}</Text>
        </View>
        <View style={styles.podcastersRightCon}>
          <MaterialCommunityIcons
            name={"chevron-right"}
            color={colors.secondaryText}
            size={30}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={AuthorListData}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingHorizontal: 15,
  },
  podcastersItemCon: {
    marginTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  podcastersLeftCon: { width: "60%" },
  podcastersItemText: { fontSize: size.md, color: colors.primaryText },
  podcastersRightCon: {
    width: "20%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  podcasterImage: { width: 40, height: 40, borderRadius: 20 },
  podcasterImageCon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    // borderRadius: 15,

    // height: '100%'
  },
});
export default AuthorList;
