import {all, call} from 'redux-saga/effects';
import {takeLatestAsync} from 'saga-toolkit';
import {onUserLogin} from '../reducers/auth';
import {userLoginService} from '../service/authAPI';

function* userLogin(data) {
  console.log('data...', data);
  const { meta } = data;
  const result = yield call(userLoginService, meta.arg);
  console.log('result..', result);
  return result;
}

export default all([takeLatestAsync(onUserLogin, userLogin)]);
