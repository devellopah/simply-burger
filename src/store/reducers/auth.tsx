import * as types from '../actions/types';

const initialState: types.AuthState = {
  idToken: null,
  localId: null,
  error: null,
  isLoading: false,
}

export default (state = initialState, action: types.AuthAction): types.AuthState => {
  switch(action.type) {
    case types.AUTH_STARTED:
      return {...state, isLoading: true}
    case types.AUTH_SUCCESSED:
      return { idToken: action.idToken, localId: action.localId, error: null, isLoading: false }
    case types.AUTH_FAILED:
      return { ...state, error: action.error, isLoading: false }
    case types.AUTH_LOGOUT:
      return { ...state, idToken: null, localId: null }
    default:
      return state
  }
}
