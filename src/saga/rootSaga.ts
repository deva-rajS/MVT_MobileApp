import {all} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import podcast from './podcast';
// import authSaga from './authSaga';
// import AuthSaga from './authentication';
export default function* root(): SagaIterator {
  yield all([podcast]);
}
