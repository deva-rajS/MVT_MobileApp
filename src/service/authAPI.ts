import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import _ from "lodash";
import DeviceInfo from "react-native-device-info";
import { baseURL } from "./networks";

const AuthApi = (token?: string) =>
  axios.create({
    baseURL,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

const errorResponse = (error: any, from: string): any => {
  if (error?.response) {
    // console.log('error resp..', error.response.data, error.response);
    if (error.response.data?.length === 0) {
      switch (from) {
        case "Login":
          return { error: "Confirm your mail please" };
        case "Singup":
          return { error: "Details already there" };
        case "ForgotPwd":
          return { error: "Reset error" };
        case "Logout":
          return { error: "Logout error" };
        case "GoogleLogin":
          return { error: "Google Login error" };
        default:
          return { error: "error" };
      }
    }
    return error.response.data;
  } else if (error?.message) {
    return { error: error.message };
  }
  const errorMsg = error.toJSON();
  return { error: errorMsg.message };
};

const paths = {
  forceLogout: (id: string) => `api/home/forceLogout.json?id=${id}`,
  pwdChange: (id: string) => `users/${id}/updatePassword.json`,
  signIn: `users/sign_in.json`,
  googleLogin: `users/auth/google_oauth2/callback.json`,
  signUp: `users.json`,
  signOut: `users/sign_out.json`,
  password: `users/password.json`,
  addFireToken: `api/tokenUpdate.json`,
};

export const getIpAddress = async () => {
  return "";
  //   try {
  //     const ipAddress = await publicIP.v4();
  //     const isIpAddress = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ipAddress);
  //     return isIpAddress ? ipAddress : '';
  //   } catch (err) {
  //     return '';
  //   }
};

export const userSignupService = async (param: { user: any }) => {
  const url = paths.signUp;
  const ipAddress = await getIpAddress();
  const params = {
    user: { ...param.user, ip_addr: ipAddress || "" },
  };
  // console.log('parasm...', param);
  try {
    const response = await AuthApi().post(url, param);
    return response.data;
  } catch (error) {
    return errorResponse(error, "Singup");
  }
};

export const userLoginService = async (param) => {
  const { user } = param;
  const data = JSON.stringify({
    user: { ...user, token: DeviceInfo.getUniqueId() },
  });
  const url = paths.signIn;
  // console.log('Login request..', data, url);
  try {
    const response = await AuthApi().post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
    // console.log('Login Respos..', response);
    return response.data;
  } catch (error) {
    console.log("error...", error);
    return errorResponse(error, "Login");
  }
};

export const userLogoutService = async (param: {
  authToken: string;
  deviceToken: string;
}) => {
  const { authToken, deviceToken } = param;
  const url = paths.signOut;
  const data = {
    user: {
      token: deviceToken,
    },
  };
  // console.log('url', url, data);
  try {
    const response = await AuthApi(authToken).delete(url, {
      data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const result = response.data;
    // console.log('resutl..', response);
    return result;
  } catch (error) {
    // console.log('resp..', error);
    return errorResponse(error, "Logout");
  }
};

export const userForgotPasswordService = async (param: {
  user: { email: string };
}) => {
  const url = paths.password;
  try {
    const response = await AuthApi().post(url, param);
    return response.data;
  } catch (error) {
    return errorResponse(error, "ForgotPwd");
  }
};

export const addDeviceToken = async ({
  authToken,
  newToken,
  oldToken,
}: {
  authToken: string;
  newToken: string;
  oldToken: string;
}) => {
  const url = paths.addFireToken;
  try {
    const response = await AuthApi().put(
      url,
      { user: { newToken, oldToken } },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return errorResponse(error, "Token update");
  }
};

const logOut = async () => {
  await GoogleSignin.revokeAccess();
  await GoogleSignin.signOut();
};

export const googleSignin = async ({
  uid,
  firstName,
  lastName,
  email,
  deviceToken,
}: {
  uid: number;
  firstName: string;
  lastName: string;
  email: string;
  deviceToken: string;
}): Promise<any> => {
  const url = paths.googleLogin;
  // const ipAddress = await getIpAddress();
  try {
    const data = {
      omniauth: {
        uid,
        provider: "google_oauth2",
        token: DeviceInfo.getUniqueId(),
        // ip_addr: ipAddress,
        info: {
          email,
          first_name: firstName,
          last_name: lastName,
        },
      },
    };
    // console.log("Google logoin..", url, data);
    const response = await AuthApi().post(url, data);
    // console.log("response :", response);
    return response.data;
  } catch (error) {
    // console.log("Error..", error);
    logOut();
    return errorResponse(error, "GoogleLogin");
  }
};

export const clearSessions = async (params: { id: string }): Promise<any> => {
  const url = paths.forceLogout(params.id);
  return await AuthApi().post(url, {});
};

export const changePwd = async (params: {
  id: string;
  token: string;
  user: {
    password: string;
    password_confirmation: string;
    current_password: string;
  };
}) => {
  const url = paths.pwdChange(params.id);
  return await AuthApi(params.token).post(url, { user: params.user });
};
