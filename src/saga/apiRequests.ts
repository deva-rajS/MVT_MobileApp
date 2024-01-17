import {call, cancelled, put, select} from 'redux-saga/effects';
import {tokenSelector} from '../reducers/auth';

export function* apiRequest({
  callService,
  params,
  success,
  failure,
}): Generator {
  try {
    const {authToken: token} = (yield select(tokenSelector)) as {
      authToken: string;
    };
    const response: any = yield call(callService, {...params, token});

    // const response: any = yield call(callService);
    // console.log('response', response);

    if (!response?.error) {
      yield put(success(response));
    } else {
      yield put(failure(response));
    }
  } catch (err) {
    console.log('error', err);
    yield put(failure(err));
  } finally {
    if (yield cancelled()) {
      console.log('Api call cancelled...');
    }
  }
}
