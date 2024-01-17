export interface SignInProps {
  user: {
    login: string;
    password: string;
    token: string;
    remember_me: number;
  };
}

export interface SignUpProps {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
  };
}

export interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  role_id: number;
  first_name: string;
  last_name: string;
  login_id: string;
  is_deleted: boolean;
  api_token: string;
  rtc_id: number | null;
  profile_image: string;
  phoneNo: string;
  dob: string;
  gender: string;
  country: string;
  timeZone: string;
  subjects: string[];
}

export interface SignInRespose {
  user: User;
}

export interface SignUpResponse {
  message: string;
  user: User;
}

interface ErrorProps {
  error: string;
}

export interface GoogleLoginParams {
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
  deviceToken: string;
}

export interface AuthActions {
  userpasswordResetRequest: (payload: {user: {email: string}}) => {
    type: string;
    payload: {user: {email: string}};
  };
  userpasswordResetSuccess: (payload: any) => {
    type: string;
    payload: any;
  };
  userpasswordResetFailure: (payload: ErrorProps) => {
    type: string;
    payload: ErrorProps;
  };
  clearPwdMsg: () => {
    type: string;
  };
  userSignupRequest: (payload: SignUpProps) => {
    type: string;
    payload: SignUpProps;
  };
  userSignupSuccess: (payload: SignUpResponse) => {
    type: string;
    payload: SignUpResponse;
  };
  userSignupFailure: (payload: ErrorProps) => {
    type: string;
    payload: ErrorProps;
  };
  clearSignup: () => {
    type: string;
  };
  userLoginRequest: (payload: SignInProps) => {
    type: string;
    payload: SignInProps;
  };
  userLoginSuccess: (payload: SignInRespose) => {
    type: string;
    payload: SignInRespose;
  };
  userLoginFailure: (payload: ErrorProps) => {
    type: string;
    payload: ErrorProps;
  };
  clearLoginFailure: () => {
    type: string;
  };
  userLogoutRequest: (payload: {auth_token: string; token: string}) => {
    type: string;
    payload: {auth_token: string};
  };
  userLogoutSuccess: (payload: {logout: boolean}) => {
    type: string;
    payload: {
      logout: boolean;
    };
  };
  userLogoutFailure: (payload: ErrorProps) => {
    type: string;
    payload: ErrorProps;
  };
  setLocale: (payload: string) => {
    type: string;
    payload: string;
  };
  setDeviceToken: (payload: {
    authToken: string;
    newToken: string;
    oldToken: string;
  }) => {
    type: string;
    payload: {
      authToken: string;
      newToken: string;
      oldToken: string;
    };
  };
  setDeviceSuccess: (payload: any) => {type: string; payload: any};
  setDeviceFailure: (payload: any) => {type: string; payload: any};
  googleLoginRequest: (payload: GoogleLoginParams) => {
    type: string;
    payload: GoogleLoginParams;
  };
  forceLogoutAllSessions: (payload: {id: string}) => {
    type: string;
    payload: {id: string};
  };
  allSessionLogout: (payload: any) => {type: string; payload: any};
  allSessonLogoutFailure: () => {type: string};
  clearSessionMsg: {type: string};
}
