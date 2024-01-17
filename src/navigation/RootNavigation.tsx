import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import SplashScreen from "react-native-splash-screen";
import AppNavigation from "./AppNavigation";
import { useSelector } from "react-redux";
import { loginStatusSelector } from "../reducers/authentication";

const RootNavigation = () => {
  const isLogin = useSelector(loginStatusSelector);
  console.log("Status :", isLogin);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      {!isLogin ? <AuthNavigation /> : <AppNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
