import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { hp } from "../common/constants";
import colors from "../common/colorConstants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { onUserLogout } from "../reducers/auth";
import { useDispatch } from "react-redux";

const CustomDrawer = (props) => {
  const ABOUT = "About Us";
  const PRIVACY_AND_POLICY = "Privacy and Policy";
  const EXIT = "Exit";
  const drawers = [ABOUT, PRIVACY_AND_POLICY];
  // <DrawerItem label={item} onPress={() => setCurrentDrawer(index)} focused ={isFocused(index)} />
  const [currentDrawer, setCurrentDrawer] = useState(0);
  const dispatch = useDispatch();

  const isFocused = (index: number) => {
    if (drawers[index] === drawers[currentDrawer]) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogout = async () => {
    // Add Google Sign-Out logic here
    console.log("clicked");
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.log("Error during Google Sign-Out:", error);
    }

    // Dispatch the onUserLogout action
    dispatch(onUserLogout());
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {/* <Image
                style = {styles.userImageStyle}
                source = {{uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'}}
                /> */}
        <Text style={styles.nameStyle}>Hello</Text>
        <Text style={styles.emailStyle}>johnson@gmail.com</Text>
      </View>

      <ScrollView style={styles.middleContainer}>
        {drawers.map((item, index) => {
          return (
            <TouchableOpacity key={item} style={styles.drawerItemContainer}>
              <Text style={styles.drawerItems}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.bottomContainer} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    minHeight: hp(10),
    width: "100%",
    backgroundColor: colors.appTheme,
    paddingLeft: "5%",
    justifyContent: "center",
    // alignItems: 'center'
  },
  middleContainer: {
    // backgroundColor: 'green'
  },
  drawerItemContainer: {
    paddingVertical: 20,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  drawerItems: {
    color: colors.black,
    fontWeight: "600",
  },
  userImageStyle: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginTop: 5,
  },
  nameStyle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  emailStyle: {
    color: colors.white,
    paddingBottom: 20,
  },
  bottomContainer: {
    backgroundColor: colors.appTheme,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: colors.white,
    fontSize: 20,
    paddingVertical: 15,
    fontWeight: "bold",
  },
});

export default CustomDrawer;
