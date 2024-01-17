import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  actions as authActions,
  AuthState,
} from "../../reducers/authentication";
import Inputbox from "../../commonLayouts/InputBox";
import Buttonstyle from "../../commonLayouts/ButtonStyle";

// import Header from '../../components/Header';
import colors from "../../common/colorConstants";
import { hp, size } from "../../common/constants";
import Logo from "../../commonLayouts/Logo";
import AuthButton from "../../commonLayouts/AuthButtton";

const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: { auth: AuthState }) => state.auth);
  const {
    pwdResetState: { requesting, errMsg, message },
  } = authState;
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resetpwd = () => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = pattern.test(email);
    setIsSubmitted(true);
    setIsValidEmail(validEmail);
    if (validEmail) {
      dispatch(authActions.userpasswordResetRequest({ user: { email } }));
    }
  };

  const showAlert = () => {
    const isError = errMsg?.length > 0;
    Alert.alert(isError ? "Alert" : "Message", isError ? errMsg : message, [
      {
        text: "Ok",
        onPress: () => dispatch(authActions.clearPwdMsg()),
      },
    ]);
  };

  useEffect(() => {
    if (message?.length > 0 || errMsg?.length > 0) {
      showAlert();
    }
  }, [message, errMsg]);

  return (
    <View style={styles.maincontainer}>
      {/* <Header btnclr={colors.white} iconclr={colors.black} /> */}

      <View style={styles.container}>
        <Text style={styles.title}>Forget Password</Text>

        <Text style={styles.subTitle}>
          Enter you email address to reset your password
        </Text>
        <Inputbox
          placeholder="Email"
          data={email}
          sendData={setEmail}
          onSubmitEditing={resetpwd}
        />
        {isSubmitted && !isValidEmail && (
          <Text style={styles.errorMsg}>* Please enter valid email</Text>
        )}
        <View style={styles.authbtnContainer}>
          <AuthButton {...{ action: resetpwd, requesting }}>
            <Text style={styles.resetText}>VALIDATE</Text>
          </AuthButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  backbuttonContainer: {
    margin: 20,
    position: "absolute",
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'red'
  },
  title: {
    fontSize: size.fontSize8, //32,
    fontWeight: "500",
    color: colors.black,
    textAlign: "center",
    width: size.middleCal,
    marginBottom: 40,
  },
  subTitle: {
    width: "80%",
    fontSize: size.lg,
    color: colors.black,
    // fontFamily: font.medium,
    margin: 10,
  },
  errorMsg: {
    color: colors.black,
    fontSize: size.sm,
  },
  resetText: {
    fontSize: size.xl,
    fontWeight: "700",
    color: "#ffffff",
  },
  authbtnContainer: {
    marginTop: 10,
  },
});

export default ForgotPassword;
