import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../common/colorConstants";
import constants, { wp } from "../common/constants";
import MoreScreen from "../commonLayouts/MoreScreen";
import { PodcastProvider } from "../context/PodcastContext";
import PodcastPlaylistCreation from "../layouts/podcast/component/PodcastPlaylistCreation";
import PodcastPlaylistSelection from "../layouts/podcast/component/PodcastPlaylistSelection";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

export const backArrow = (route, nav) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "flex-start",
        height: wp(15),
        backgroundColor: colors.appBackground,
      }}
    >
      <TouchableOpacity onPress={() => nav.goBack()}>
        <MaterialCommunityIcons
          name="chevron-left"
          color={colors.appTheme}
          size={35}
        />
      </TouchableOpacity>
    </View>
  );
};
export const closeBtn = (route, nav) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "flex-end",
        height: wp(15),
        width: wp(90),
        backgroundColor: colors.appBackground,
      }}
    >
      <TouchableOpacity onPress={() => nav.goBack()}>
        <MaterialCommunityIcons name="close" color={colors.black} size={35} />
      </TouchableOpacity>
    </View>
  );
};

const NavigationWithProvider = () => {
  return (
    <PodcastProvider>
      <DrawerNavigator />
    </PodcastProvider>
  );
};

const AppNavigation = () => {
  const routes = [
    {
      name: constants.rootNames.DRAWER,
      component: NavigationWithProvider,
      header: false,
    },
    {
      name: constants.rootNames.PODCAST_PLAYLIST_SELECTION,
      component: PodcastPlaylistSelection,
      header: false,
    },
    {
      name: constants.rootNames.PODCAST_PLAYLIST_CREATION,
      component: PodcastPlaylistCreation,
      header: false,
    },
    {
      name: constants.rootNames.MORE_SCREEN,
      component: MoreScreen,
      header: true,
    },
  ];
  return (
    <Stack.Navigator initialRouteName={constants.rootNames.DRAWER}>
      {routes.map((route) => {
        return (
          <Stack.Screen
            name={route.name}
            key={route.name}
            component={route.component}
            options={
              route.header
                ? ({ route, navigation }) => ({
                    header: () => backArrow(route, navigation),
                  })
                : {
                    headerShown: route.header,
                  }
            }
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default AppNavigation;
