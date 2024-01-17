import {fork, takeLatest, all} from 'redux-saga/effects';
import {
  userSignupService,
  userLoginService,
  userLogoutService,
  userForgotPasswordService,
  addDeviceToken,
  googleSignin,
  clearSessions,
} from '../service/authAPI';
import {constants, actions as AuthActions} from '../reducers/authentication';
import {apiRequest} from './apiRequests';
import {GoogleLoginParams} from '../modal/authentication';

function* userSignup(action: {type: string; payload: any}): Generator {
  yield apiRequest({
    callService: userSignupService,
    params: action.payload,
    success: AuthActions.userSignupSuccess,
    failure: AuthActions.userSignupFailure,
  });
}

function* userLogin(action: {type: string; payload: any}): Generator {
  yield apiRequest({
    callService: userLoginService,
    params: action.payload,
    success: AuthActions.userLoginSuccess,
    failure: AuthActions.userLoginFailure,
  });
}

function* userLogout(action: {type: string; payload: any}): Generator {
  yield apiRequest({
    callService: userLogoutService,
    params: action.payload,
    success: AuthActions.userLogoutSuccess,
    failure: AuthActions.userLogoutFailure,
  });
}

function* userPwdReset(action: {
  type: string;
  payload: {email: string};
}): Generator {
  yield apiRequest({
    callService: userForgotPasswordService,
    params: action.payload,
    success: AuthActions.userpasswordResetSuccess,
    failure: AuthActions.userpasswordResetFailure,
  });
}

function* updateToken(action: {
  type: string;
  payload: {
    newToken: string;
    oldToken: string;
  };
}): Generator {
  yield apiRequest({
    callService: addDeviceToken,
    params: action.payload,
    success: AuthActions.setDeviceSuccess,
    failure: AuthActions.setDeviceFailure,
  });
}

function* googleLogin(action: {
  type: string;
  payload: GoogleLoginParams;
}): Generator {
  yield apiRequest({
    callService: googleSignin,
    params: action.payload,
    success: AuthActions.userLoginSuccess,
    failure: AuthActions.userLoginFailure,
  });
}

function* logoutAllSessions(action: {
  type: string;
  payload: GoogleLoginParams;
}): Generator {
  yield apiRequest({
    callService: clearSessions,
    params: action.payload,
    success: AuthActions.allSessionLogout,
    failure: AuthActions.allSessonLogoutFailure,
  });
}

function* watchUserSignup(): Generator {
  yield takeLatest(constants.SIGNUP_REQUEST, userSignup);
}

function* watchUserLogin(): Generator {
  yield takeLatest(constants.LOGIN_REQUEST, userLogin);
}

function* watchUserLogout(): Generator {
  yield takeLatest(constants.LOGOUT_REQUEST, userLogout);
}

function* watchUserPwdReset(): Generator {
  yield takeLatest(constants.PASSWORD_RESET_REQUEST, userPwdReset);
}

function* watchDeviceToken(): Generator {
  yield takeLatest(constants.SET_DEVICE_TOKEN, updateToken);
}

function* watchGoogleLogin(): Generator {
  yield takeLatest(constants.GOOGLE_LOGIN_REQUEST, googleLogin);
}

function* watchClearingSessions(): Generator {
  yield takeLatest(constants.FORCE_LOGOUT_ALL_SESSIONS, logoutAllSessions);
}

export default all([
  fork(watchUserSignup),
  // fork(watchUserLogin),
  fork(watchUserLogout),
  fork(watchUserPwdReset),
  fork(watchDeviceToken),
  fork(watchGoogleLogin),
  fork(watchClearingSessions),
]);
