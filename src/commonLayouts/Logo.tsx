import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { images } from "../assets";
import { wp } from "../common/constants";

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={images.logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: wp(80),
    height: wp(30),
  },
});

export default Logo;
