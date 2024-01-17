import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import { rootNames } from "../../../common/constants";
import GridView from "../../../commonLayouts/GridView";

const MusicList = () => {
  const navigation = useNavigation();
  const dummyData = {
    playlists: [
      {
        id: 1,
        name: "Podcast Fav Playlist",
        description: "Fav playlist desc",
        thumbnail:
          "https://s3-us-west-2.amazonaws.com/redfox-media-dev/audios/podcasts/2/audios/original/absence-vr.mp3?1637236840",
      },
      {
        id: 1,
        name: "Podcast Fav Playlist",
        description: "Fav playlist desc",
        thumbnail:
          "https://s3-us-west-2.amazonaws.com/redfox-media-dev/images/podcast_playlists/2/original/c-aaryan-450x450.png?1637236552",
      },
      {
        id: 1,
        name: "Podcast Fav Playlist",
        description: "Fav playlist desc",
        thumbnail:
          "https://s3-us-west-2.amazonaws.com/redfox-media-dev/audios/podcasts/2/audios/original/absence-vr.mp3?1637236840",
      },
      {
        id: 1,
        name: "Podcast Fav Playlist",
        description: "Fav playlist desc",
        thumbnail:
          "https://s3-us-west-2.amazonaws.com/redfox-media-dev/images/podcast_playlists/2/original/c-aaryan-450x450.png?1637236552",
      },
      {
        id: 1,
        name: "Podcast Fav Playlist",
        description: "Fav playlist desc",
        thumbnail:
          "https://s3-us-west-2.amazonaws.com/redfox-media-dev/audios/podcasts/2/audios/original/absence-vr.mp3?1637236840",
      },
      {
        id: 1,
        name: "Podcast Fav Playlist",
        description: "Fav playlist desc",
        thumbnail:
          "https://s3-us-west-2.amazonaws.com/redfox-media-dev/images/podcast_playlists/2/original/c-aaryan-450x450.png?1637236552",
      },
    ],
    total_pages: 1,
    current_page: 1,
  };

  return (
    <View style={styles.container}>
      <GridView
        gridViewData={dummyData}
        onGridItemPress={(item, index) =>
          navigation.navigate(rootNames.MUSIC_DETAIL)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MusicList;
