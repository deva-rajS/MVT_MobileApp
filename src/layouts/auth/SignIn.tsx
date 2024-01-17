import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { wp, hp, size, rootNames, rw } from "../../common/constants";
import colors from "../../common/colorConstants";
import InputBox from "../../commonLayouts/InputBox";
import AuthButton from "../../commonLayouts/AuthButtton";
import Logo from "../../commonLayouts/Logo";
import { clearLoginFailure, onUserLogin } from "../../reducers/auth";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SignIn = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const authState = useSelector((state) => state.auth);
  const pwdRef = useRef<TextInput>(null);
  const { loading: requesting, error, message } = authState;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const initialValidationState = {
    isEmailEmpty: true,
    isPwdEmpty: true,
    isEmailValid: false,
    isPwdValid: false,
    isSubmitted: false,
  };
  const [validation, setValidation] = useState(initialValidationState);

  const callAlert = ({ title, msg }) => {
    Alert.alert(title, msg, [
      {
        text: "Ok",
        onPress: () => dispatch(clearLoginFailure()),
      },
    ]);
  };

  const updateNotification = (): void => {
    if (error?.length > 0 && isFocus) {
      callAlert({ title: "Alert", msg: error });
    }
    if (message?.length > 0 && isFocus) {
      callAlert({ title: "Message", msg: message });
    }
  };

  useEffect(() => {
    updateNotification();
  }, [error, message]);

  const signIn = (): void => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmailEmpty = email?.length === 0;
    const isPwdEmpty = password?.length === 0;
    const isEmailValid = pattern.test(email);
    const isPwdValid = password?.length > 5;
    setValidation({
      isEmailEmpty,
      isPwdEmpty,
      isPwdValid,
      isEmailValid,
      isSubmitted: true,
    });
    const isValidField = isEmailValid && isPwdValid;
    const userParams = {
      user: {
        email,
        password,
        token: "",
      },
    };
    if (isValidField) {
      dispatch(onUserLogin(userParams));
    }
  };

  const moveToPassword = (): void => {
    if (pwdRef.current) {
      pwdRef.current.focus();
    }
  };

  const renderErrorMsg = (type: "email" | "pwd") => {
    const { isSubmitted, isEmailValid, isEmailEmpty, isPwdEmpty, isPwdValid } =
      validation;
    if (isSubmitted) {
      switch (type) {
        case "email":
          if (isEmailEmpty && !isEmailValid) {
            return <Text style={styles.errorMsg}>* Required</Text>;
          } else if (!isEmailEmpty && !isEmailValid)
            return (
              <Text style={styles.errorMsg}>
                * Please enter valid User ID/email
              </Text>
            );
          return null;
        case "pwd":
          if (isPwdEmpty && !isPwdValid) {
            return <Text style={styles.errorMsg}>* Required</Text>;
          } else if (!isPwdEmpty && !isPwdValid)
            return (
              <Text style={styles.errorMsg}>* Please enter valid password</Text>
            );
          return null;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Logo />
      <InputBox
        placeholder={"Enter Your Email"}
        secureTextEntry={false}
        data={email}
        // data={loginType === 'gmail' ? '' : email}
        sendData={setEmail}
        returnKeyType="next"
        returnKeyLabel="Next"
        onSubmitEditing={moveToPassword}
        blurOnSubmit={false}
        icon="email"
      />
      {renderErrorMsg("email")}
      <InputBox
        ref={pwdRef}
        placeholder="Enter Your Password"
        secureTextEntry
        data={password}
        sendData={setPassword}
        returnKeyType="go"
        returnKeyLabel="Go"
        blurOnSubmit
        onSubmitEditing={signIn}
        icon="lock"
      />
      {renderErrorMsg("pwd")}
      <Text
        style={styles.containerText}
        onPress={() => navigation.navigate(rootNames.FORGOT_PASSWORD)}
      >
        Forgot Password?
      </Text>
      {/* {clearingAllSession && <ActivityIndicator size="small" color="white" />} */}
      <AuthButton {...{ action: signIn, requesting }}>
        <Text style={styles.loginText}>LOGIN</Text>
      </AuthButton>
      <TouchableOpacity
        style={styles.txtBtn}
        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        onPress={() => navigation.navigate(rootNames.SIGN_UP)}
      >
        <Text style={styles.signupTxt}>
          Don't have an Account? <Text style={styles.singText}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    color: colors.black,
    fontSize: rw(18),
    margin: hp(1),
  },
  containerText: {
    width: "80%",
    color: colors.black,
    textAlign: "right",
    fontSize: rw(14),
    margin: hp(2),
    fontWeight: "500",
  },
  centerAlign: { textAlign: "center" },
  errorMsg: {
    color: colors.red,
    fontSize: size.sm,
  },
  oauthBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  orBlock: {},
  or: {
    color: colors.grey,
  },
  txtBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: rw(5),
  },
  top: {
    fontSize: size.md,
    marginTop: wp(6),
  },
  loginText: {
    fontSize: size.xl,
    fontWeight: "500",
    color: colors.white,
  },
  img: {
    width: wp(5),
    height: wp(5),
  },
  txt: {
    color: "white",
    fontSize: wp(4),
    marginLeft: wp(2),
  },
  signupTxt: {
    textAlign: "center",
    fontSize: size.xl,
    fontWeight: "700",
    color: colors.black,
  },
  singText: {
    color: colors.appTheme,
  },
});
export default SignIn;
