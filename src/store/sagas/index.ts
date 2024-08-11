import { all } from 'redux-saga/effects';
import productSagas from './productSaga';

export default function* rootSaga() {
  yield all([
    productSagas(),
  ]);
}
