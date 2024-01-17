import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

import AuthButton from "./AuthButtton";
import { rw, size } from "../common/constants";
import colors from "../common/colorConstants";
import { onGoogleLogin } from "../reducers/auth";
import { loginStatusSelector } from "../reducers/authentication";

GoogleSignin.configure();

const OAuthLogin = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(loginStatusSelector);
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("user infof...", userInfo);
      const { givenName, familyName, email, id } = userInfo.user;
      dispatch(
        onGoogleLogin({
          uid: id,
          email,
          firstName: givenName !== null ? givenName : "",
          lastName: familyName !== null ? familyName : "",
          deviceToken: "",
        })
      );
      // console.log("L Status :", loginStatus);
      // setEmail(email);
    } catch (error) {
      console.log("error", error, error.code);
    }
  };
  return (
    <View style={styles.oauthBlock}>
      <AuthButton {...{ action: googleSignIn, requesting: false }}>
        <Icon name="google" style={styles.icon} />
        <Text style={styles.txt}>Sign in with Google</Text>
      </AuthButton>
    </View>
  );
};

const styles = StyleSheet.create({
  oauthBlock: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: rw(20),
    color: colors.white,
    marginRight: rw(10),
  },
  txt: {
    color: colors.white,
    fontSize: size.md,
    fontWeight: "bold",
  },
});

export default OAuthLogin;
