import _ from "lodash";
import { AnyAction } from "redux";
import { AuthActions, User } from "../modal/authentication";
import { RootState } from "./rootReducer";

const ROOT = "AUTH/";

export const constants = {
  SIGNUP_REQUEST: `${ROOT}SIGNUP_REQUEST`,
  SIGNUP_SUCCESS: `${ROOT}SIGNUP_SUCCESS`,
  SIGNUP_FAILURE: `${ROOT}SIGNUP_FAILURE`,
  CLEAR_SIGNUP: `${ROOT}CLEAR_SIGNUP`,
  LOGIN_REQUEST: `${ROOT}LOGIN_REQUEST`,
  LOGIN_SUCCESS: `${ROOT}LOGIN_SUCCESS`,
  LOGIN_FAILURE: `${ROOT}LOGIN_FAILURE`,
  CLEAR_LOGIN_FAILURE: `${ROOT}CLEAR_LOGIN_FAILURE`,
  LOGOUT_REQUEST: `${ROOT}LOGOUT_REQUEST`,
  LOGOUT_SUCCESS: `${ROOT}LOGOUT_SUCCESS`,
  LOGOUT_FAILURE: `${ROOT}LOGOUT_FAILURE`,
  PASSWORD_RESET_REQUEST: `${ROOT}PASSWORD_RESET_REQUEST`,
  PASSWORD_RESET_SUCCESS: `${ROOT}PASSWORD_RESET_SUCCESS`,
  PASSWORD_RESET_FAILURE: `${ROOT}PASSWORD_RESET_FAILURE`,
  CLEAR_PWD_MSG: `${ROOT}CLEAR_PWD_MSG`,
  SET_LOCALE: `${ROOT}SET_LOCALE`,
  SET_DEVICE_TOKEN: `${ROOT}SET_DEVICE_TOKEN`,
  SET_DEVICE_SUCCESS: `${ROOT}SET_DEVICE_SUCCESS`,
  SET_DEVICE_FAILURE: `${ROOT}SET_DEVICE_FAILURE`,
  GOOGLE_LOGIN_REQUEST: `${ROOT}GOOGLE_LOGIN_REQUEST`,
  GOOGLE_LOGIN_SUCCESS: `${ROOT}GOOGLE_LOGIN_SUCCESS`,
  GOOGLE_LOGIN_FAILURE: `${ROOT}GOOGLE_LOGIN_FAILURE`,
  FB_LOGIN_REQUEST: `${ROOT}FB_LOGIN_REQUEST`,
  FB_LOGIN_SUCCESS: `${ROOT}FB_LOGIN_SUCCESS`,
  FB_LOGIN_FAILURE: `${ROOT}FB_LOGIN_FAILURE`,
  FORCE_LOGOUT_ALL_SESSIONS: `${ROOT}FORCE_LOGOUT_ALL_SESSIONS`,
  ALL_SESSION_LOGOUT: `${ROOT}ALL_SESSION_LOGOUT`,
  ALL_SEESION_LOGOUT_FAILURE: `${ROOT}ALL_SEESION_LOGOUT_FAILURE`,
  CLEAR_SESSION_MSG: `${ROOT}CLEAR_SESSION_MSG`,
};

export const actions: AuthActions = {
  userpasswordResetRequest: (payload) => ({
    type: constants.PASSWORD_RESET_REQUEST,
    payload,
  }),
  userpasswordResetSuccess: (payload) => ({
    type: constants.PASSWORD_RESET_SUCCESS,
    payload,
  }),
  userpasswordResetFailure: (payload) => ({
    type: constants.PASSWORD_RESET_FAILURE,
    payload,
  }),
  clearPwdMsg: () => ({
    type: constants.CLEAR_PWD_MSG,
  }),
  userSignupRequest: (payload) => ({
    type: constants.SIGNUP_REQUEST,
    payload,
  }),
  userSignupSuccess: (payload) => ({
    type: constants.SIGNUP_SUCCESS,
    payload,
  }),
  userSignupFailure: (payload) => ({
    type: constants.SIGNUP_FAILURE,
    payload,
  }),
  clearSignup: () => ({
    type: constants.CLEAR_SIGNUP,
  }),
  userLoginRequest: (payload) => ({
    type: constants.LOGIN_REQUEST,
    payload,
  }),
  userLoginSuccess: (payload) => ({
    type: constants.LOGIN_SUCCESS,
    payload,
  }),
  userLoginFailure: (payload) => ({
    type: constants.LOGIN_FAILURE,
    payload,
  }),
  clearLoginFailure: () => ({
    type: constants.CLEAR_LOGIN_FAILURE,
  }),
  userLogoutRequest: (payload) => ({
    type: constants.LOGOUT_REQUEST,
    payload,
  }),
  userLogoutSuccess: (payload) => ({
    type: constants.LOGOUT_SUCCESS,
    payload,
  }),
  userLogoutFailure: (payload) => ({
    type: constants.LOGOUT_FAILURE,
    payload,
  }),
  setLocale: (payload) => ({
    type: constants.SET_LOCALE,
    payload,
  }),
  setDeviceToken: (payload) => ({
    type: constants.SET_DEVICE_TOKEN,
    payload,
  }),
  setDeviceSuccess: (payload) => ({
    type: constants.SET_DEVICE_SUCCESS,
    payload,
  }),
  setDeviceFailure: (payload) => ({
    type: constants.SET_DEVICE_SUCCESS,
    payload,
  }),
  googleLoginRequest: (payload) => ({
    type: constants.GOOGLE_LOGIN_REQUEST,
    payload,
  }),
  forceLogoutAllSessions: (payload) => ({
    type: constants.FORCE_LOGOUT_ALL_SESSIONS,
    payload,
  }),
  allSessionLogout: (payload) => ({
    type: constants.ALL_SESSION_LOGOUT,
    payload,
  }),
  allSessonLogoutFailure: () => ({
    type: constants.ALL_SEESION_LOGOUT_FAILURE,
  }),
  clearSessionMsg: { type: constants.CLEAR_SESSION_MSG },
};

interface ActionState {
  requesting: boolean;
  failure: boolean;
  errMsg: string;
}

const actionState = {
  requesting: false,
  failure: false,
  errMsg: "",
};

const googleLoginState = { ...actionState, googleRequesting: false };

export interface AuthState {
  user: User;
  isLogin: boolean;
  loginType: "email" | "gmail" | "";
  signupState: ActionState & { message: string };
  loginState: ActionState & { googleRequesting: boolean };
  logoutState: ActionState;
  pwdResetState: ActionState & { message: string };
  locale: string;
  isActive: boolean;
  role: "Admin" | "Teacher" | "Student" | "Other" | "";
  deviceToken: string;
  forceLogout: boolean;
  clearingAllSession: boolean;
  sessionLogoutMsg: string;
}

const initialState: AuthState = {
  user: null,
  isLogin: false,
  loginType: "",
  signupState: { ...actionState, message: "" },
  loginState: googleLoginState,
  logoutState: actionState,
  pwdResetState: { ...actionState, message: "" },
  locale: "en",
  isActive: false,
  role: "",
  deviceToken: "",
  forceLogout: false,
  sessionLogoutMsg: "",
  clearingAllSession: false,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AnyAction
): AuthState => {
  switch (action.type) {
    case constants.PASSWORD_RESET_REQUEST:
      return {
        ...state,
        pwdResetState: { ...state.pwdResetState, requesting: true },
      };
    case constants.PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        pwdResetState: {
          ...state.pwdResetState,
          requesting: false,
          message: action.payload.message,
        },
      };
    case constants.PASSWORD_RESET_FAILURE:
      const { error: pwdError } = action.payload;
      return {
        ...state,
        pwdResetState: {
          ...state.pwdResetState,
          requesting: false,
          failure: true,
          errMsg: pwdError,
        },
      };
    case constants.CLEAR_PWD_MSG:
      return {
        ...state,
        pwdResetState: { ...actionState, message: "" },
      };
    case constants.SIGNUP_REQUEST:
      return {
        ...state,
        signupState: { ...state.signupState, requesting: true },
      };
    case constants.SIGNUP_SUCCESS:
      const { message } = action.payload;
      return {
        ...state,
        isLogin: false,
        signupState: {
          ...state.signupState,
          message,
          requesting: false,
        },
      };
    case constants.SIGNUP_FAILURE:
      const error = _.get(action.payload, "error") || "";
      return {
        ...state,
        signupState: {
          ...state.signupState,
          requesting: false,
          failure: true,
          errMsg: error,
        },
      };
    case constants.CLEAR_SIGNUP:
      return {
        ...state,
        signupState: { ...actionState, message: "" },
      };
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          requesting: true,
        },
        loginType: "email",
        isLogin: true,
      };

    case constants.GOOGLE_LOGIN_REQUEST:
      return {
        ...state,
        loginState: {
          ...state.loginState,
          googleRequesting: true,
        },
        loginType: "gmail",
      };
    case constants.LOGIN_SUCCESS:
      // console.log('login state....', action.payload);
      // const user = _.get(action.payload, 'user');
      const { user, role, isActive, device_token } = action.payload;
      return {
        ...state,
        user,
        role,
        isActive: isActive ? true : false,
        isLogin: true,
        deviceToken: device_token,
        loginState: {
          ...state.loginState,
          requesting: false,
          googleRequesting: false,
        },
      };
    case constants.LOGIN_FAILURE:
      const msg = _.get(action.payload, "error") || "";
      const forceLogout = _.get(action.payload, "forceLogout") || false;
      return {
        ...state,
        loginState: {
          ...state.loginState,
          requesting: false,
          failure: true,
          errMsg: msg,
        },
        deviceToken: "",
        loginType: "",
        forceLogout,
      };
    case constants.CLEAR_LOGIN_FAILURE:
      return {
        ...state,
        loginState: googleLoginState,
        loginType: "",
        forceLogout: false,
      };
    case constants.LOGOUT_REQUEST:
      return {
        ...state,
        logoutState: { ...state.logoutState, requesting: true },
        deviceToken: "",
        isLogin: false,
      };
    case constants.LOGOUT_SUCCESS:
      return {
        ...state,
        isLogin: false,
        user: null,
        signupState: { ...actionState, message: "" },
        loginState: googleLoginState,
        logoutState: actionState,
        pwdResetState: { ...actionState, message: "" },
        loginType: "",
      };
    case constants.LOGOUT_FAILURE:
      const logoutError = _.get(action.payload, "error");
      return {
        ...state,
        logoutState: {
          ...state.logoutState,
          requesting: false,
          failure: true,
          errMsg: logoutError,
        },
      };
    case constants.SET_LOCALE:
      return { ...state, locale: action.payload };
    case constants.SET_DEVICE_SUCCESS: {
      const { device_token: deviceToken } = action.payload;
      return { ...state, deviceToken };
    }
    case constants.SET_DEVICE_FAILURE: {
      return { ...state, deviceToken: "" };
    }
    case constants.FORCE_LOGOUT_ALL_SESSIONS:
      return {
        ...state,
        clearingAllSession: true,
        loginState: googleLoginState,
        loginType: "",
        forceLogout: false,
      };
    case constants.ALL_SESSION_LOGOUT:
      return {
        ...state,
        clearingAllSession: false,
        sessionLogoutMsg: action.payload?.msg || "",
      };
    case constants.ALL_SEESION_LOGOUT_FAILURE:
      return {
        ...state,
        clearingAllSession: false,
        sessionLogoutMsg: action.payload?.error || "",
      };
    case constants.CLEAR_SESSION_MSG:
      return { ...state, sessionLogoutMsg: "" };
    default:
      return state;
  }
};
export const loginStatusSelector = (state: RootState) =>
  state.auth.isLogin || false;
export const authToken = (state: RootState) => state.auth?.user?.api_token;
export const currentRole = (state: RootState) => state.auth?.role;
export const currentUser = (state: RootState) => state.auth?.user;
export const googleRequesting = (state: RootState) =>
  state.auth?.loginState?.googleRequesting;
export const userLogin = (state: RootState) => state.auth.isLogin;
export const loginTypeSelector = (state: RootState) => state.auth.loginType;
