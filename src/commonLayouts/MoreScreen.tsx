import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";

import colors from "../common/colorConstants";
import { hp, size, wp } from "../common/constants";
import AuthButton from "../commonLayouts/AuthButtton";
import { onUserLogout, tokenSelector, userSelector } from "../reducers/auth";

const MoreScreen = () => {
  const dispatch = useDispatch();
  const { authToken, deviceToken } = useSelector(tokenSelector);
  const AuthState = useSelector((state) => state.auth);
  const user = useSelector(userSelector);
  const profileData = [
    {
      id: 1,
      leftText: "FirstName",
      rightText: user?.firstName,
    },
    // {
    //   id: 2,
    //   leftText: 'LastName',
    //   rightText: 'Green',
    // },
    {
      id: 3,
      leftText: "Email",
      rightText: user?.email,
    },
    // {
    //   id: 4,
    //   leftText: 'Gender',
    //   rightText: 'Female',
    // },
    // {
    //   id: 5,
    //   leftText: 'Age',
    //   rightText: '24',
    // },
  ];

  const moreData = [
    {
      id: 1,
      heading: "About Us",
    },
    {
      id: 2,
      heading: "Privacy Policy",
    },
    {
      id: 3,
      heading: "Terms of Use",
    },
    {
      id: 4,
      heading: "Connect with Us",
    },
    {
      id: 5,
      heading: "Support",
    },
  ];

  const action = () => {
    dispatch(onUserLogout({ authToken, deviceToken }));
  };
  console.log("Auth :", AuthState);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/68/e0/c0/68e0c0dedbe91da254e2fd235d54abf6.jpg",
            }}
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.descTextCon}>
          <Text style={styles.descText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            neque, vitae magni voluptatibus quam officia saepe impedit ad
            architecto vero cum reiciendis molestias eveniet nobis ullam vel
            commodi velit praesentium.
          </Text>
        </View>
        {profileData.map((item, index) => (
          <View key={item.id.toString()} style={styles.profileCon}>
            <Text style={styles.leftText}>{item.leftText}</Text>
            <Text style={styles.rightText}>{item.rightText}</Text>
          </View>
        ))}
        <View style={styles.moreCon}>
          <Text style={styles.moreHeaderTxt}>More</Text>
        </View>
        {moreData.map((item, index) => {
          return (
            <View style={styles.moreItemCon} key={item.id.toString()}>
              <Text style={styles.moreItemTxt}>{item.heading}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                style={styles.iconStyle}
                color={colors.appTheme}
                size={35}
              />
            </View>
          );
        })}
        <AuthButton {...{ requesting: false, action }}>
          <Text style={styles.logoutText}>Logout</Text>
        </AuthButton>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.moreScreenBackground,
    // paddingHorizontal: 15
  },
  scrollViewContainer: {},
  imageStyle: {
    width: "80%",
    height: "100%",
    borderRadius: 20,
  },
  imageContainer: {
    width: "100%",
    height: hp(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  descText: {
    paddingVertical: wp(4),
    color: colors.black,
  },
  descTextCon: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(6),
    marginTop: wp(3),
  },
  profileCon: {
    paddingVertical: wp(5),

    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  leftText: {
    paddingLeft: wp(4),
    color: colors.black,
  },
  rightText: {
    paddingRight: wp(4),
    color: colors.black,
  },
  moreCon: {
    paddingLeft: wp(3),
    marginTop: wp(4),
  },
  moreHeaderTxt: {
    fontWeight: "bold",
    color: colors.black,
    fontSize: size.large,
  },
  moreItemTxt: {
    paddingLeft: wp(4),
    color: colors.black,
  },
  moreItemCon: {
    paddingVertical: wp(3),

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  iconStyle: {
    paddingRight: wp(4),
  },
  logoutText: {
    color: colors.white,
  },
});
export default MoreScreen;
