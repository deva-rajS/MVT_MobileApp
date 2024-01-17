import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import constants from "../common/constants";
import SignIn from "../layouts/auth/SignIn";
import SignUp from "../layouts/auth/SignUp";
import ForgotPassword from "../layouts/auth/ForgotPassword";
import Preview from "../layouts/auth/Preview";
import { backArrow, closeBtn } from "./AppNavigation";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={constants.rootNames.PREVIEW}
      screenOptions={{ headerShadowVisible: false }}
    >
      <Stack.Screen
        name={constants.rootNames.PREVIEW}
        component={Preview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={constants.rootNames.SIGN_IN}
        component={SignIn}
        options={({ route, navigation }) => ({
          header: () => backArrow(route, navigation),
        })}
      />
      <Stack.Screen
        name={constants.rootNames.SIGN_UP}
        component={SignUp}
        options={({ route, navigation }) => ({
          header: () => closeBtn(route, navigation),
        })}
      />
      <Stack.Screen
        name={constants.rootNames.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={({ route, navigation }) => ({
          header: () => closeBtn(route, navigation),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
