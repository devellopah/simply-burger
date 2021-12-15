import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '..';
export interface AuthState {
  idToken: string | null,
  localId: string | null,
  error: object | null,
  isLoading: boolean,
}

const initialState: AuthState = {
  idToken: null,
  localId: null,
  error: null,
  isLoading: false,
}
export interface ReqPayload {
  email: string,
  password: string,
  isLogin: boolean
}

export interface ResPayload {
  data: {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
  }
}

export const authFulfilled = (localId: string, idToken: string) => ({ type: 'auth/authenticate/fulfilled', localId, idToken })

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (payload: ReqPayload) => {
    console.log('payload', payload)
    const API_KEY = 'AIzaSyD77mZ0A4HPCD8-heTNpvq3nWEnOvq_qNo'
    const response: ResPayload = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${payload.isLogin ? 'signInWithPassword' : 'signUp'}?key=${API_KEY}`,
      payload
    )
    const { localId, idToken, expiresIn } = response.data
    const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000))
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('localId', localId)
    localStorage.setItem('expirationDate', '' + expirationDate)

    return response.data
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('idToken')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('localId')

      state.idToken = null
      state.localId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.idToken = action.payload.idToken
        state.localId = action.payload.localId
        state.error = null
        state.isLoading = false
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.error = action.error
        state.isLoading = false
      })
  },
});

export const { logout } = authSlice.actions

const checkAuthTimeout = (expiresIn: number) : AppThunk => dispatch => {
  setTimeout(() => dispatch(logout()), expiresIn * 1000)
}

export const logInMaybe = (): AppThunk => dispatch => {
  const idToken = localStorage.getItem('idToken')
  if (!idToken) return dispatch(logout())
  const expirationDate = new Date(localStorage.getItem('expirationDate') as string)
  if (expirationDate > new Date()) {
    // dispatch(authSuccessed(localStorage.getItem('localId')!, idToken))
    // dispatch(authenticate.fulfilled())
    dispatch(authFulfilled(localStorage.getItem('localId') as string, idToken))
    checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
  } else {
    dispatch(logout())
  }
}

export default authSlice.reducer