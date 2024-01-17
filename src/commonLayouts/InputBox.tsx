import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import colors from "../common/colorConstants";
import { rw, wp } from "../common/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface Props extends TextInputProps {
  data: string;
  placeholderColor?: string;
  style?: object | undefined;
  sendData: (input: string) => void;
  icon: string;
}

const InputBox = forwardRef<TextInput, Props>(
  ({ data, sendData, ...props }, ref) => {
    const { icon } = props;
    return icon ? (
      <View style={styles.container}>
        <MaterialCommunityIcons name={icon} color={colors.grey} size={28} />
        <TextInput
          ref={ref}
          underlineColorAndroid="transparent"
          style={styles.inputtext}
          placeholderTextColor={colors.secondaryText}
          autoCapitalize="none"
          onChangeText={(text) => sendData(text)}
          defaultValue={data}
          {...props}
        />
      </View>
    ) : (
      <TextInput
        ref={ref}
        underlineColorAndroid="transparent"
        style={styles.inputtextwoicon}
        placeholderTextColor={colors.secondaryText}
        autoCapitalize="none"
        onChangeText={(text) => sendData(text)}
        defaultValue={data}
        {...props}
      />
    );
  }
);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightSlate,
    marginVertical: 10,
    borderRadius: 10,
    width: wp(80),
    paddingVertical: 3,
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  inputtext: {
    paddingLeft: 10,
    width: wp(70),
    paddingTop: 15,
    fontSize: rw(16),
    color: colors.black,
  },
  inputtextwoicon: {
    backgroundColor: colors.lightSlate,
    marginVertical: 10,
    borderRadius: 10,
    width: wp(80),
    paddingVertical: 15,
    paddingLeft: 15,
    fontSize: rw(16),
    color: colors.black,
  },
});
export default InputBox;
