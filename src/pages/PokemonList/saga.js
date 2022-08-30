import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { setRenamePokemon } from './action';

const fetchCatch = () => {
  return axios.post('http://localhost:3001/probability', {})
}

const fetchRename = (data) => {
  return axios.post('http://localhost:3001/rename', data)
}

const fetchRelease = () => {
  return axios.post('http://localhost:3001/release', {})
}

export function* doCatch({ payload, cbSuccess, cbFailed }) {
  try {
    const response = yield call(fetchCatch, payload);
    if (response.data.status === 200) {
      if(response.data.message.includes('success')) {
        cbSuccess();
      } else {
        cbFailed();
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export function* doRename({ data, cbSuccess, cbError }) {
  try {
    const response = yield call(fetchRename, data);
    yield put(setRenamePokemon({
      name: response.data.name,
      seq: response.data.seq
    }));
    cbSuccess();
  } catch (error) {
    cbError();
  }
}

export function* doRelease({ payload, cbSuccess, cbFailed }) {
  try {
    const response = yield call(fetchRelease, payload);
    if (response.data.status === 200) {
      if(response.data.message.includes('success')) {
        cbSuccess();
      } else {
        cbFailed();
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default function* pokemonSaga() {
  yield takeLatest('CATCH', doCatch);
  yield takeLatest('RENAME', doRename);
  yield takeLatest('RELEASE', doRelease);
}