import React, { ReactNode } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../common/colorConstants";
import { wp } from "../common/constants";

interface Props {
  children: ReactNode;
  requesting: boolean;
  action: () => any;
  style?: any;
}

const AuthButton = ({ children, requesting, action, style = {} }: Props) => {
  return (
    <TouchableOpacity
      disabled={requesting}
      style={[styles.buttonContainer, style]}
      onPress={action}
    >
      {children}
      {requesting && (
        <ActivityIndicator
          size="large"
          color={colors.white}
          style={styles.spinner}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.appTheme,
    borderRadius: 50,
    flexDirection: "row",
    width: wp(80),
    height: wp(13),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: wp(2),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  spinner: {
    position: "absolute",
  },
});

export default AuthButton;
