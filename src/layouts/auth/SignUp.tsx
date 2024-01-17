import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { hp, rootNames, rw, size, wp } from "../../common/constants";
import colors from "../../common/colorConstants";
import InputBox from "../../commonLayouts/InputBox";
import Buttonstyle from "../../commonLayouts/ButtonStyle";
import Logo from "../../commonLayouts/Logo";
import { clearSignup, onUserSignup } from "../../reducers/auth";
import { RootState } from "../../reducers/rootReducer";
import AuthButton from "../../commonLayouts/AuthButtton";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const onFocus = useIsFocused();
  const emailRef = useRef();
  const pwdRef = useRef();
  const cPwdRef = useRef();
  const authState = useSelector((state: RootState) => state.auth);
  const initialSignupState = {
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const [signupval, setSignupval] = useState(initialSignupState);
  const initialValidationState = {
    isFirstNameEmpty: true,
    isLastNameEmpty: true,
    isEmailEmpty: true,
    isPwdEmpty: true,
    isCPwdEmpty: true,
    isFirstNameValid: false,
    isLastNameValid: false,
    isEmailValid: false,
    isPwdValid: false,
    isCPwdValid: false,
    isSubmitted: false,
  };
  const [validation, setValidation] = useState(initialValidationState);
  const { signupState } = authState;

  useEffect(() => {
    if (!onFocus) {
      setSignupval(initialSignupState);
      setValidation(initialValidationState);
    }
  }, [onFocus]);

  const messageConfirmation = (): void => {
    navigation.navigate(rootNames.SIGN_IN);
    dispatch(clearSignup());
  };

  const signupChecking = (): void => {
    const { message = "", error = "" } = signupState;
    if (message?.length > 0) {
      Alert.alert("Message", message, [
        {
          text: "Ok",
          onPress: messageConfirmation,
        },
      ]);
    }
    if (error?.length > 0) {
      Alert.alert("Error", error, [
        {
          text: "Ok",
          onPress: () => dispatch(clearSignup()),
        },
      ]);
    }
  };

  useEffect(() => {
    signupChecking();
  }, [signupState]);

  const signUp = () => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isFirstNameEmpty = signupval.FirstName?.length === 0;
    const isLastNameEmpty = signupval.LastName?.length === 0;
    const isEmailEmpty = signupval.email?.length === 0;
    const isPwdEmpty = signupval.password?.length === 0;
    const isCPwdEmpty = signupval.passwordConfirmation?.length === 0;
    const isFirstNameValid = signupval.FirstName?.length > 1;
    const isLastNameValid = signupval.LastName?.length > 1;
    const isEmailValid = pattern.test(signupval.email);
    const isPwdValid = signupval.password?.length > 5;
    const isCPwdValid = signupval.password === signupval.passwordConfirmation;
    setValidation({
      isFirstNameEmpty,
      isLastNameEmpty,
      isEmailEmpty,
      isPwdEmpty,
      isCPwdEmpty,
      isFirstNameValid,
      isLastNameValid,
      isEmailValid,
      isPwdValid,
      isCPwdValid,
      isSubmitted: true,
    });
    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPwdValid &&
      isCPwdValid
    ) {
      const { FirstName, LastName, email, password, passwordConfirmation } =
        signupval;
      dispatch(
        onUserSignup({
          user: {
            FirstName,
            LastName,
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        })
      );
    }
  };

  const textRenderer = (txt: string) => {
    return <Text style={styles.errorMsg}>{txt}</Text>;
  };

  const renderErrorMsg = (
    type: "fName" | "lName" | "email" | "pwd" | "cpwd"
  ) => {
    const {
      isFirstNameEmpty,
      isLastNameEmpty,
      isEmailEmpty,
      isPwdEmpty,
      isCPwdEmpty,
      isFirstNameValid,
      isLastNameValid,
      isEmailValid,
      isPwdValid,
      isCPwdValid,
      isSubmitted,
    } = validation;
    if (isSubmitted) {
      switch (type) {
        case "fName":
          if (isFirstNameEmpty && !isFirstNameValid) {
            return textRenderer("* Required (min 2 chars)");
          } else if (!isFirstNameEmpty && !isFirstNameValid) {
            return textRenderer("* Please enter your first name");
          }
          return null;
        case "lName":
          if (isLastNameEmpty && !isLastNameValid) {
            return textRenderer("* Required (min 2 chars)");
          } else if (!isLastNameEmpty && !isLastNameValid) {
            return textRenderer("* Please enter your last name");
          }
          return null;
        case "email":
          if (isEmailEmpty && !isEmailValid) {
            return textRenderer("* Required");
          } else if (!isEmailEmpty && !isEmailValid)
            return textRenderer("* Please enter valid email");
          return null;
        case "pwd":
          if (isPwdEmpty && !isPwdValid) {
            return (
              <Text style={styles.errorMsg}>* Required (min 6 chars)</Text>
            );
          } else if (!isPwdEmpty && !isPwdValid)
            return (
              <Text style={styles.errorMsg}>
                * Enter valid password (min 6 chars)
              </Text>
            );
          return null;
        case "cpwd":
          if (isCPwdEmpty && !isCPwdValid) {
            return <Text style={styles.errorMsg}>* Required</Text>;
          } else if (!isCPwdEmpty && !isCPwdValid)
            return <Text style={styles.errorMsg}>* Password not match</Text>;
          return null;
        default:
          return null;
      }
    }
    return null;
  };

  const moveToPassword = (ref: any): void => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headingText}>Sign Up</Text>
        <InputBox
          placeholder="First Name"
          onSubmitEditing={() => moveToPassword(emailRef)}
          blurOnSubmit={false}
          returnKeyType="next"
          returnKeyLabel="Next"
          data={signupval.FirstName}
          sendData={(e) => setSignupval({ ...signupval, FirstName: e })}
        />
        {renderErrorMsg("fName")}
        <InputBox
          placeholder="Last Name"
          onSubmitEditing={() => moveToPassword(emailRef)}
          blurOnSubmit={false}
          returnKeyType="next"
          returnKeyLabel="Next"
          data={signupval.LastName}
          sendData={(e) => setSignupval({ ...signupval, LastName: e })}
        />
        {renderErrorMsg("lName")}
        <InputBox
          ref={emailRef}
          placeholder="Email"
          blurOnSubmit={false}
          onSubmitEditing={() => moveToPassword(pwdRef)}
          returnKeyType="next"
          returnKeyLabel="Next"
          keyboardType="email-address"
          data={signupval.email}
          sendData={(e) => setSignupval({ ...signupval, email: e })}
        />
        {renderErrorMsg("email")}
        <InputBox
          ref={pwdRef}
          placeholder="Password"
          onSubmitEditing={() => moveToPassword(cPwdRef)}
          returnKeyType="next"
          returnKeyLabel="Next"
          blurOnSubmit={false}
          secureTextEntry
          data={signupval.password}
          sendData={(e) => setSignupval({ ...signupval, password: e })}
        />
        {renderErrorMsg("pwd")}
        <InputBox
          ref={cPwdRef}
          placeholder="Confirm Password"
          secureTextEntry
          returnKeyType="done"
          returnKeyLabel="Done"
          blurOnSubmit
          onSubmitEditing={signUp}
          data={signupval.passwordConfirmation}
          sendData={(e) =>
            setSignupval({ ...signupval, passwordConfirmation: e })
          }
        />
        {renderErrorMsg("cpwd")}
        <View style={styles.authbtnContainer}>
          <AuthButton
            {...{ action: signUp, requesting: signupState?.requesting }}
          >
            <Text style={styles.signupText}>VALIDATE</Text>
          </AuthButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: size.middleCal,
    height: hp(100) / 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    fontSize: size.fontSize8, //32,
    fontWeight: "500",
    color: colors.black,
    textAlign: "center",
    width: size.middleCal,
    marginBottom: 30,
  },
  containerText: {
    width: size.middleCal,
    color: colors.black,
    textAlign: "center",
    marginVertical: hp(1),
  },
  centerAlign: {
    textAlign: "center",
  },
  errorMsg: {
    color: colors.red,
  },
  txtBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnTop: {
    marginTop: wp(5),
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    fontSize: rw(14),
    marginTop: wp(6),
  },
  signupText: {
    fontSize: size.xl,
    fontWeight: "700",
    color: "#ffffff",
  },
  authbtnContainer: {
    marginTop: 10,
  },
});
export default SignUp;
