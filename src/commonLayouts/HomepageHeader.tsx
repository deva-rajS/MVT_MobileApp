import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { images } from "../assets";
import colors from "../common/colorConstants";
import { rootNames, wp } from "../common/constants";

const HomeHeader = (route, navigation) => {
  return (
    <View
      style={{
        height: wp(15),
        backgroundColor: colors.appBackground,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate(rootNames.MORE_SCREEN)}
        style={{ position: "absolute", left: 20 }}
      >
        <Image style={{ width: 25, height: 25 }} source={images.menu} />
      </TouchableOpacity>
      <Image style={{ width: 70, height: 45 }} source={images.logo} />
    </View>
  );
};

export default HomeHeader;
