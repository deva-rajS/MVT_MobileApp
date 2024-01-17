import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
// import {createSagaAction} from 'saga-toolkit';
import {
  googleSignin,
  userLoginService,
  userLogoutService,
  userSignupService,
} from "../service/authAPI";

const ROOT = "AUTH/";

const defaultState = {
  requesting: false,
  error: "",
  message: "",
};

const initialState = {
  isLogin: false,
  user: null,
  loading: false,
  error: "",
  message: "",
  role: "",
  deviceToken: "",
  signupState: { ...defaultState, user: null },
  pwdResetState: defaultState,
  loginType: "",
};

// export const onUserLogin = createSagaAction(`${ROOT}ON_USER_LOGIN`);

export const onUserSignup = createAsyncThunk(
  `${ROOT}ON_USER_SINGUP`,
  async (arg: any, thunkapi) => {
    const resp = await userSignupService(arg);
    console.log("signup resp..", resp);
    return resp;
  }
);

export const clearSignup = createAction(`${ROOT}CLEAR_SIGNUP`);
export const clearLoginFailure = createAction(`${ROOT}CLEAR_LOGIN_FAILURE`);

const logOut = async () => {
  await GoogleSignin.revokeAccess();
  await GoogleSignin.signOut();
};

export const onUserLogout = createAsyncThunk(
  `${ROOT}ON_USER_LOGOUT`,
  async (payload: any, thunkapi) => {
    try {
      const authState = thunkapi.getState()?.auth;
      const isGmail = authState?.loginType === "google";
      if (isGmail) {
        await logOut();
      }
      // console.log('user logout...')
      const resp = await userLogoutService(payload);
      // console.log('result...', !!resp?.logout);
      return !!!resp?.logout;
    } catch (err) {
      return false;
    }
  }
);

export const onUserLogin = createAsyncThunk(
  `${ROOT}ON_USER_LOGIN`,
  async (arg: any) => {
    const params = arg;
    // console.log('param...', params);
    try {
      const result = await userLoginService(params);
      // console.log("final....", result);
      return result;
    } catch (err) {
      console.log("err..", err);
      return null;
    }
  }
);

export const onGoogleLogin = createAsyncThunk(
  `${ROOT}GOOGLE_LOGIN`,
  async (params: any) => {
    try {
      const resp = await googleSignin(params);
      const tempResponse = params;
      return tempResponse;
    } catch (err) {
      return null;
    }
  }
);

export const authReducer = createReducer(initialState, {
  [onUserSignup.pending.toString()]: (state, { payload }) => ({
    ...state,
    signupState: {
      ...state.signupState,
      requesting: true,
    },
  }),
  [onUserSignup.fulfilled.toString()]: (state, { payload }) => {
    const { user = null, message = "", error = null } = payload;
    console.log("on fulfilled user signup...", payload);
    return {
      ...state,
      signupState: {
        ...state.signupState,
        requesting: false,
        user,
        message,
        error,
      },
    };
  },
  [clearSignup.toString()]: (state) => {
    return {
      ...state,
      signupState: { ...state.signupState, message: "", error: "" },
    };
  },
  [onUserLogin.pending.toString()]: (state, { payload }) => {
    // console.log("on pending user login...", payload);
    return { ...state, loading: true };
  },
  [onUserLogin.fulfilled.toString()]: (state, { payload }) => {
    // console.log("on fulfilled user login...", payload);
    const { user = null, device_token = "", role = "", error = "" } = payload;
    console.log("data...", user, error);
    return {
      ...state,
      loading: false,
      user,
      error,
      deviceToken: device_token,
      role,
      isLogin: user !== null,
      loginType: "email",
    };
  },
  [onUserLogin.rejected.toString()]: (state, { payload }) => {
    // console.log('on rejected user login...', payload);
    return {
      ...state,
      loading: false,
      error: payload,
      user: null,
      isLogin: false,
    };
  },
  [onGoogleLogin.pending.toString()]: (state, { payload }) => {
    // console.log("on pending user login...", state);
    return { ...state, loading: true };
  },
  [onGoogleLogin.fulfilled.toString()]: (state, { payload }) => {
    console.log("state :", payload);
    const {
      user = payload,
      device_token = "",
      role = "",
      error = "",
    } = payload;
    return {
      ...state,
      loading: false,
      user,
      error,
      deviceToken: device_token,
      role,
      isLogin: user !== null,
      loginType: "google",
    };
  },
  [clearLoginFailure.toString()]: (state) => ({
    ...state,
    error: "",
    message: "",
  }),
  [onUserLogout.fulfilled.toString()]: (state, { payload }) => {
    // console.log('stat...', payload);
    return { ...state, isLogin: payload };
  },
});

export const tokenSelector = (state) => {
  const auth = state.auth;
  return {
    authToken: auth?.user?.api_token || "",
    deviceToken: auth?.deviceToken || "",
  };
};
export const userSelector = (state) => {
  const auth = state.auth;
  return auth.user || null;
};
